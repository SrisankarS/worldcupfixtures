const mongoose = require('mongoose');

const admin = new mongoose.Schema(
{
    username:{
        type:String,
        required:[true, "Username required"]
    } ,
    password:{
        type:String,
        required:[true,"Password required"]
    }
})

module.exports = mongoose.model("users",admin);