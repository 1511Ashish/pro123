const mongoose = require("mongoose");

const userData = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
        maxLength:10,
    },
    password:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("userData", userData);