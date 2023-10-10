const Pointstable = require("../models/PointsTable");
const Fixtures = require("../models/Fixtures");
const Admin = require("../models/Admin");
const { hash, compare } = require("bcryptjs");
const express = require("express")
const app = express();
app.use(express.json());
var pointsTableValues;

exports.getPointsTable = async (req,res)=>{
    try{
        pointsTableValues = await Pointstable.find();
        res.json(pointsTableValues);
    }
    catch(err){
        res.status(404).send("Error" +err);
    }
}
exports.addMatchFixtures = async (req,res)=>{
    const matches = req.body;
    try {
        let result = await Fixtures.insertMany(matches)  //insert the document into the database based on the schema
        res.status(201).json(result);
   }catch(err){
       res.status(400).send(err);
   }
}
exports.getAdminDetails = async(req,res)=>{
    const { username, password } = req.body;
    try{
        const adminObj = {username};
        const hashedPwd = await hash(password, 12);
        adminObj.password = hashedPwd;
        const admin = await new Admin(adminObj).save();
        return res.status(201).json(admin);

    }catch(err){
        return res.status(500).send(err);
    }
}
exports.checkAdminCredentials =async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body)
    // console.log(username);
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) return res.status(404).send("Invalid credentials");
      const isMatch = await compare(password, admin.password);
      if (!isMatch) return res.status(400).send("Invalid credentials");
      res.status(200).send("Success");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  exports.getFixturesTable = async (req,res)=>{
    try{
        const fixturesTableValues = await Fixtures.find();
        res.status(200).json(fixturesTableValues);
    }
    catch(err){
        res.status(404).send("Error" +err);
    }
}
exports.updateMatchResult = async(req,res)=>{

    try{
        const id = await req.params.id
        var matchresult = req.body;
        var pointsTableId;
        var updatedWonTeamPointstable;
        var losingTeamPointUpdate,losingTeamId,losingTeam;
        var drawTeam1Id,drawTeam2Id,drawTeam1Obj,drawTeam2Obj;
        let specificmatchdetail = await Fixtures.findById(id);
        // console.log(id);

         console.log(matchresult);
        //  if(matchresult.Result === "Match Cancelled"){
        //     return;
        if(matchresult.Result === specificmatchdetail.Team_1 && matchresult.Result !=specificmatchdetail.Team_2){
            losingTeam=specificmatchdetail.Team_2;
           
        }else{
            losingTeam=specificmatchdetail.Team_1;
           
        }
         if(matchresult.Result === "Match Drawn" ){
            for(let obj in pointsTableValues){
                if((pointsTableValues[obj].Team_Name==specificmatchdetail.Team_1)){  
                    pointsTableValues[obj].Points+=1;
                    pointsTableValues[obj].Matches_Played+=1;
                    drawTeam1Id=pointsTableValues[obj]._id;
                    drawTeam1Obj = pointsTableValues[obj];
            }
                if((pointsTableValues[obj].Team_Name==specificmatchdetail.Team_2)){  
                    pointsTableValues[obj].Points+=1;
                    pointsTableValues[obj].Matches_Played+=1;
                    drawTeam2Id=pointsTableValues[obj]._id;
                    drawTeam2Obj = pointsTableValues[obj];
            }
        }
    } else if(matchresult.Result != "Match Cancelled" && matchresult.Result != "Match Drawn" && matchresult.Result != "Yet to be played" ){
            for(let obj in pointsTableValues){
                if(matchresult.Result === pointsTableValues[obj].Team_Name){
                    pointsTableValues[obj].Won+=1;
                    pointsTableValues[obj].Points+=2;
                    pointsTableValues[obj].Matches_Played+=1;
                    pointsTableId=pointsTableValues[obj]._id;
                    updatedWonTeamPointstable=pointsTableValues[obj];    
                } 
                if(losingTeam === pointsTableValues[obj].Team_Name){
                    console.log("pointsTableValues[obj].Lost", pointsTableValues[obj].Lost);
                    pointsTableValues[obj].Lost+=1;
                    pointsTableValues[obj].Matches_Played+=1;
                    losingTeamId=pointsTableValues[obj]._id;
                    console.log("pointsTableValues[obj]", pointsTableValues[obj]);
                    losingTeamPointUpdate = pointsTableValues[obj]
                
                }
            
            }
        }
        if(matchresult.Result === specificmatchdetail.Team_1 || matchresult.Result === specificmatchdetail.Team_2){
            matchresult.Result+=" Won"
        }
        await Fixtures.findByIdAndUpdate(id,matchresult) // Finding a specific document by its id and updating that document
        await Pointstable.findByIdAndUpdate(pointsTableId,updatedWonTeamPointstable);
        await Pointstable.findByIdAndUpdate(losingTeamId,losingTeamPointUpdate);
        await Pointstable.findByIdAndUpdate(drawTeam1Id,drawTeam1Obj);
        await Pointstable.findByIdAndUpdate(drawTeam2Id,drawTeam2Obj);
        res.status(200).send("Updated Successfully");

    }catch(error){
        res.status(400).json({message:error});
    }
}