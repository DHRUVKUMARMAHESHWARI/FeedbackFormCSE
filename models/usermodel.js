const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    password:{
        required: true,
        type:String,
    },
    email:{
        required: true,
        type:String,
    },
    year:{
        required:true,
        type:Number,
    },
    section:{
        required:true,
        type:Number,
    }

})

const User = mongoose.model('User', userSchema);
module.exports = User;
