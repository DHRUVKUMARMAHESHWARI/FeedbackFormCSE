var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var db = require('./config/mongoose-connection')

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

app.get('/feedback',(req,res)=>{ 
  res.render('feedback')
})

app.get('/form',(req,res)=>{ 
  res.render('form')
})

app.get('/submitSuccess',(req,res)  =>{
  res.render('submitSuccess')
})

app.get('/DataVisualize',(req,res)  =>{
  res.render('DataVisualize')
})

app.get('/submitFailed',(req,res)  =>{
  res.render('submitFailed')

})
app.get('/profile', (req, res) => {
  res.render('profile');
});

server.listen(process.env.PORT || 3000);