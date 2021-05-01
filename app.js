const express=require('express');
const cors = require('cors');
const bodyparser=require('body-parser');
const passport=require('passport');
const passportjwt=require('passport-jwt');
const mongoose = require('mongoose');
const bcryptjs=require('bcryptjs');
const jsonwebtoken=require('jsonwebtoken');
const path=require('path');
const config=require('./config/database');

//connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected',()=>{
  console.log('Connected to database' +config.database);
});

//On Error
mongoose.connection.on('error',(err)=>{
  console.log('Database error:' +err);
});


const app=express();

const users = require('./routes/users');

//port number
const port =process.env.PORT || 8080;

//cors middleware
app.use(cors());

//set Static folder
app.use(express.static(path.join(__dirname,'public')));

//body parser middleware
app.use(bodyparser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//index route
app.get('/',(req,res)=>{
  res.send('Invalid end point');
});

app.get('*',(req,res)=>{
  res.sendFile(path.join(_dirname,'public/index.html'));
});

//start server
app.listen(port,()=>{
  console.log('Server started on port:'+port);
});
