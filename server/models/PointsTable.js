const mongoose = require('mongoose');

const pointsTable = new mongoose.Schema(
{
    Team_Group:{
        type:String,
        required:[true, "Team group required"]
    } ,
    Team_Name:{
        type:String,
        required:[true,"Team Name required"]
    },
    Won:{
        type:Number,
        required:[true,"Won required"]
    },
    Lost:{
        type:Number,
        required:[true,"Lost required"]
    },
    Points:{
        type:Number,
        required:[true,"Points required"]
    },
    Matches_Played:{
        type:Number,
        required:[true,"Points required"]
    }
})

module.exports = mongoose.model("pointstables",pointsTable);