const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    Section:{
        required: true,
        type: String,
    },
    StudentName:{
        required: true,
        type: String,
    },
    Enroll:{
        required:true,
        type: String,
    },
    Year:{
        required:true,
        type: Number,
    },
    Password:{
        required: true,
        type:String,
    },
    Email:{
        required: true,
        type:String,
    },



    // year:{
    //     required:true,
    //     type:Number,
    // // },
    // section:{
    //     required:true,
    //     type:Number,
    // }
})

const User = mongoose.model('User', userSchema);
module.exports = User;
