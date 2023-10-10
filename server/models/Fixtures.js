const mongoose = require('mongoose');
 const Fixtures = new mongoose.Schema(
    {
        Team_1:{
            type:String,
            trim:true,
            required:[true,"Team_1 required"]
        },
        Team_2:{
            type:String,
            trim:true,
            required:[true,"Team_2 required"]
        },
        Date_of_Match:{
            type:String,
            trim:true,
            required:[true,"Date_of_Match required"]
        },
        Result:{
            type:String,
        }

    }
 )
 module.exports = mongoose.model("fixtures",Fixtures);