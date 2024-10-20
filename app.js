var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var db = require('./config/mongoose-connection')
const weatherMiddleware = require('./middlewares/time&weather'); // Import the middleware

const bcrypt=require("bcrypt");
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

// app.post('/signup', (req, res) => {
//   let { email, year, section, password } = req.body;

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return res.status(500).send('Server error');
  
//     bcrypt.hash(password, salt, async function(err, hash) {
//       if (err) return res.status(500).send('Server error');
//       try {
//         const user = await userModel.create({
//           email,
//           year,
//           section,
//           password: hash
//         });
  
//         let token = jwt.sign({ email, userId: user._id }, process.env.JWT_SECRET);
//         res.cookie("token", token);
//         res.redirect("/login");
//       } catch (err) {
//         res.status(500).send('Database error');
//       }
//     });
//   });
// });

// app.post("/signup", async (req, res) => {
//   const { roll, password } = req.body;
//   let user = await userModel.findOne({ Enroll:roll })
//   if(user) console.log(roll,password,user.Password)
//   else console.log(roll,password,user.Password);
// })


app.get('/login',(req,res)=>{ 
  res.render('login')
})
app.post('/login', async (req, res) => {
  const { roll, password } = req.body;
  try {
    const user = await userModel.findOne({ Enroll:roll });
    if (!user) {
      return res.status(400).send("User not found. Please sign up."); 
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.send(password,user.Password);
    }
    console.log(password,user.Password);
    const token = jwt.sign({ email:user.Email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token);
    return res.redirect("/profile");  // <== 'return' ensures no further code execution

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Server error");
  }
});


app.get('/logout',(req,res)=>{
  res.render("logout")
})

// Logout route
app.post("/logout",isLogedIn, (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// Middleware to check if user is logged in
function isLogedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access denied. Please log in.");
  }

  jwt.verify(token, "key", (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token.");  // Ensure response is only sent once
    }
    req.user = decoded;  // Attach user data to request object
    next();  // Proceed to the next middleware or route handler
  });
}

app.get('/homepage',weatherMiddleware,(req,res)=>{
  res.render('homepage')
})

app.get('/feedback',(req,res)=>{ 
  res.render('feedback')
})

app.get('/form',(req,res)=>{ 
  res.render('form')
})

app.get('/DataVisualize',(req,res)  =>{
  res.render('DataVisualize')
})

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get("/form",(req,res)=>{
  res.render("form")
})

server.listen(process.env.PORT || 3000);