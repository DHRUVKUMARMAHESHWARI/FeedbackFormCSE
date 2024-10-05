const mongoose = require('mongoose')
const dbgr = require("debug")("development:mongoose")
mongoose.connect("mongodb:127.0.0.1:27017/FeedBackFormCSE")
.then(function(){
    dbgr("connected to mongo");
})
.catch(function(err){
    dbgr(err)
})

let db = mongoose.connection;

module.exports = db;