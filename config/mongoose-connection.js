const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/FeedBackFormCSE")
  .then(() => {
    console.log("Connected to MongoDB");
    dbgr("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    dbgr(err);
  });

  let db = mongoose.connection;
  module.exports = db;  