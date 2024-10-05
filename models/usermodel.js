const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name:{
        required: true,
        type:string,
    },
    password:{
        required: true,
        type:string,
    },
    email:{
        required: true,
        type:string,
    },
})

const db = mongoose.model('user',userSchema);
module.exports = db;
 