var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var db = require('./config/mongoose-connection')
const isLogedIn = require('./middlewares/isLogedIn')

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel=require("./models/usermodel");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/login',(req,res)=>{ 
  res.render('login')
})

app.post('/login', async (req, res) => {
  const { roll, password } = req.body;
  try {
    const user = await userModel.findOne({ Enroll: roll });
    console.log("Password:", password, "Hashed Password:", user.Password);
    if (!user) {
      return res.send("User not found. Please sign up.");
    }
    const isMatch = password === user.Password;

    if (!isMatch) {
      return res.send("Password did not match !!");
    }
    console.log(password,user.Password);
    const token = jwt.sign(
      {
        email:user.Email, userId: user._id, name:user.StudentName},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

    res.cookie("token", token);
    return res.redirect("/profile");

  } catch (error) {
    console.log("Error during login:", error);
    return res.send("Server error");
  }
});

app.get('/logout',isLogedIn,(req,res)=>{
  res.redirect("login")
})

// Logout route
app.post("/logout",isLogedIn, (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

server.listen(process.env.PORT);