#!/usr/bin/env nodejs
//Modules Imported
var express = require('express');
var morgan = require('morgan');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');

var app = express();
app.use(morgan('combined'));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Path Redirects
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts/', express.static(__dirname + '/node_modules/bootstrap/fonts')); // redirect google fonts
app.use(session({
  secret : 'aSecret',
  cookie : {maxAge : 1000*60*60*24*30},
  resave : true,
  saveUninitialized : true
}));
//Database Connectivity
var config = {
    user : 'root',
    database : 'stu_corner',
    host : '127.0.0.1',
    password :'12345'
};
var client = mysql.createConnection(config);
client.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
  }else{
    console.log('Connection established');
}
});
//Password Hashing Function
function hash(input,salt){
  var hashedInput = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
  return ["pbkdf2Sync","10000",salt,hashedInput.toString('hex')].join('$');
}

process.on('uncaughtException', function (err) {
    console.log(err);
});
//Login & Signup Request
app.post('/login' , function (req,res){
  if(req.body.regorLogin == "register"){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    client.query('INSERT into students (name,email,password) values (?,?,?)',[name,email,dbString],function(err,result){
      if(err){
        res.status(500).send(err.toString());
      }
      else{
        res.send(" Student Registered.");
      }
    });
  }
  else if(req.body.regorLogin == "login"){
    var email = req.body.email;
    var password = req.body.password;
    client.query('select * from students where email = ?',[email],function(err,result){
    if (err){
      res.status(500).send(err.toString());
    }else{
      if (result.length === 0){
        res.status(403).send('Username/Password is invalid\n');
      }else{
        var dbString = result[0].password;
        var salt = dbString.split('$')[2];
        var hashedPassword = hash(password,salt)
        if (hashedPassword === dbString){
          req.session.auth = {stu_id : result[0].stu_id};
          res.status(200).send(result[0].name);
        }else{
          res.status(403).send('Username/Password is wrong\n');
        }
      }
    } 
  });  
  }
});
app.get('/checklogin' , function(req,res){
  if(req.session && req.session.auth && req.session.auth.stu_id){
    res.send("session on" + req.session.auth.stu_id);
  }
  else{
    res.send("session off");
  }
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80

app.listen(8080, function () {
  console.log(`Students Corner listening on port ${port}!`);
});
app.get('/' , function(req,res){
  res.sendFile('index.html' , {root : __dirname});
});
app.get('/homepage' , function(req,res){
  res.sendFile('homepage.html' , {root : __dirname});
});
app.get('/css/:filename',function(req,res){
  res.sendFile(path.join(__dirname,'css', req.params.filename));
});
app.get('/main.js' , function(req,res){
  res.sendFile('main.js' , {root : __dirname});
});
app.get('/images/:image', function(req,res){
  res.sendFile(path.join(__dirname,'images',req.params.image));
});