//Modules Imported
var express = require('express');
var morgan = require('morgan');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var formidable = require('formidable');
var fs = require('fs');
var xlsx = require('node-xlsx');
var ProgressBar = require('progressbar.js');
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var name;
var words = fs.readFileSync('uploads.json');
words = JSON.parse(words);

/*var daily_rout = fs.readFileSync('daily_routine.json');
daily_rout = JSON.parse(daily_rout);
console.log(daily_rout);*/

function showNavbar(){
	var template = fs.readFileSync('navbar.html');
	return template;
}
//files page
function showFilesPage(){
  var template = fs.readFileSync('showfiles.html');
  return template;
}
function showFiles(key,c){
  var filename = key;
  var filepath = words[key][0];
  var filesize = words[key][1];
  var filedate = words[key][2].split(',')[0];
  var filetime = words[key][2].split(',')[1];
  var marginLeft;
  if (c==0){
    marginLeft = '220px';
  }else{
    marginLeft = '50px';
  }
  var htmlTemplate = `
    <body>
      <div class="col-lg-3" style="width:16%;height:250px;float:left;margin-left:${marginLeft};margin-top:3%;">
        <img src="http://localhost:8080/images/pdf.png" style="width: 100px;margin: 4% 0px 0px 25%;"/>
        <h3 style="text-align:center;">
          ${filename}
        </h3>
        <p style="text-align:center">
          <strong>Size :</strong> ${filesize} <br>
          <strong>Upload Date :</strong> ${filedate} <br>
          <strong>Upload Time :</strong> ${filetime}          
        </p>
        <div style="text-align:center">
         <a href= "${filepath}">Download File</a>
        </div>
      </div>
    </body>`;
  return htmlTemplate;
}

var count = -1;var count2 = -1;
function aas(name,roll){
  var name = name;
  var roll = roll;
  count++;count2++;
  var template1 = `
      <div id="students">
        <p>${name}</p>
        <p style="margin-left: 100px";>${roll}</p>
        <button type="button" class="p_a" id="${count}0" value="P" onclick="replyclick(this.id)">P</button>
        <button type="button" class="p_a" id="${count}1" value="P" onclick="replyclick(this.id)">P</button>
        <button type="button" class="p_a" id="${count}2" value="P" onclick="replyclick(this.id)">P</button>
        <button type="button" class="p_a" id="${count}3" value="P" onclick="replyclick(this.id)">P</button>
        <button type="button" class="p_a" id="${count}4" value="P" onclick="replyclick(this.id)">P</button>
        <button type="button" class="p_a" id="${count}5" value="P" onclick="replyclick(this.id)">P</button>
        <p id="totalclass${count}${count2}">6</p>
      </div>
  <style>
  #students{
    margin-left:240px;
  }
  #students>p{
    font-weight: bold;
    display: inline-block;
    padding: 10px;
    margin-right: 50px;
  }
  .p_a{
    background: green;
    padding : 4px 9px;
    border : none;
    color : white;
  }
  </style>
  <script>
    function replyclick(clicked_id){
      var a = document.getElementById(clicked_id);
      var number = clicked_id.slice(0,-1) + clicked_id.slice(0,-1);
      var totalcls = 'totalclass' + number;
      console.log(totalcls);
      console.log(typeof(totalcls));
      if (a.innerHTML == 'P'){
        a.innerHTML = 'A';
        a.value = 'A';
        a.style.background = "#CC181E";
        document.getElementById(totalcls).innerHTML = Number(document.getElementById(totalcls).innerHTML) - 1;
      }
      else if (a.innerHTML == 'A'){
        a.innerHTML = 'P';
        a.value = 'P';
        a.style.background = "green";
        document.getElementById(totalcls).innerHTML = Number(document.getElementById(totalcls).innerHTML) + 1;
      }
    }
  </script>`;
  return template1;
}
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
app.post('/admin_login' , function(req,res){
  var admin_username = req.body.admin_username;
  var admin_password = req.body.admin_password;
  client.query('select * from admin where username = ?',[admin_username],function(err,result){
    if (err){
      res.status(500).send(err.toString());
    }else{
      console.log()
      if (result.length === 0){
        res.status(403).send('Username/Password is invalid\n');
      }else{
        if (admin_password === result[0].password){
          req.session.auth = {admin_id : result[0].id};
          var username = JSON.stringify(result[0].username);
          res.writeHead(200, {'Content-Type':'application/json'});
          res.write(username);
          res.end();
        }else{
          res.status(403).send('Username/Password is wrong\n');
        }
      }
    } 
  });
});

app.post('/admin_panel' , function(req,res){
  if(req.body.insertorDelete == "insert_teacher"){
    var insert_reg_no = req.body.insert_reg_no;
    var insert_name = req.body.insert_name;
    var insert_email = req.body.insert_email;
    var insert_dept = req.body.insert_dept;
    client.query('insert into teachers (tech_id,name,email,department) values (?,?,?,?)', [insert_reg_no,insert_name,insert_email,insert_dept],function(err,result){
      if(err){
        res.status(500).send(err.toString());
        }
        else{
          res.send("Registered.");
        }
    });
  }
  else if(req.body.insertorDelete == "insert_student"){
    var insert_reg_no = req.body.insert_reg_no;
    var insert_name = req.body.insert_name;
    var insert_email = req.body.insert_email;
    var insert_dept = req.body.insert_dept;
    client.query('insert into students (stu_id,name,email,department) values (?,?,?,?)', [insert_reg_no,insert_name,insert_email,insert_dept],function(err,result){
      if(err){
        res.status(500).send(err.toString());
        }
        else{
          res.send("Registered.");
        }
    });
  }
  else {
    var delete_reg_no = req.body.delete_reg_no;
    client.query('delete from teachers where tech_id=?' , [delete_reg_no], function(err,result){
      if(err){
        res.status(500).send(err.toString());
      }
      else{
        res.send("Data deleted");
      }
    });
  }
});

app.post('/getUsersName' , function(req,res){
  res.writeHead(200, {'Content-Type':'application/json'});
  res.write(req.session.auth.stu_name);
  res.end();
});

app.post('/getProfileUrl' , function(req,res){
  res.writeHead(200, {'Content-Type':'application/json'});
  res.write(req.session.auth.type);
  res.end();
});

app.post('/getStudentDetails', function(req,res){
  client.query("select * from students where stu_id=?",[req.session.auth.stu_id],function(err,result){
  if(err){
        res.status(500).send(err.toString());
        }
        else{
          // res.status(200).send(result);
          res.status(200).send(JSON.stringify(result[0]));
        }
  });
});
app.post('/teachers_myprofile_info',function(req,res){
  var gender = req.body.gender;
  var mobile = req.body.mobile;
  var dob = req.body.dob;
  var present_address = req.body.present_add;
  var permanent_address = req.body.permanent_add;
  var classes = req.body.classes;
  client.query('update teachers set gender=?,mobile=?,dob=?,present_address=?,permanent_address=?,class_teacher_of=? where tech_id=?', [gender,mobile,dob,present_address,permanent_address,classes,req.session.auth.tech_id],function(err,result){ 
    if(err){
      res.status(500).send(err.toString());
    }
    else{
      res.end();
    }
  });
});
app.post('/student_myprofile_info' , function(req,res){
  var gender = req.body.gender;
  var mobile = req.body.mobile;
  var dob = req.body.dob;
  var present_address = req.body.present_add;
  var permanent_address = req.body.permanent_add;
  var classes = req.body.classes;
  client.query('update students set gender=?,mobile=?,dob=?,present_address=?,permanent_address=?,class=? where stu_id=?', [gender,mobile,dob,present_address,permanent_address,classes,req.session.auth.stu_id],function(err,result){ 
        if(err){
          res.status(500).send(err.toString());
        }
        else{
          res.end();
        }
      });
 
});
app.post('/login' , function (req,res){
  if(req.body.regorLogin == "register" && req.body.type == "Student"){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    var someVar = [];
    client.query("select email from students where email=?",[email] ,function(err, rows){
    if(err) {
      throw err;
      console.log("error");
    } else {
      checkStudent(JSON.stringify(rows));
    }
  });
  
  function checkStudent(value) {
    someVar = JSON.parse(value);
    if(someVar == "")
    {
      res.status(404).send("You are not registered as student by the admin! :(");
    }
    else if (someVar[0]["email"] == email){
      client.query('update students set password=?,signed_up=? where email=?', [dbString,"YES",email],function(err,result){ 
        if(err){
          res.status(500).send(err.toString());
        }
        else{
          res.send("Student Registered.");
        }
      });
    }
   }
  }
  else if(req.body.regorLogin == "login" && req.body.type == 'Student'){
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
          req.session.auth = {stu_id : result[0].stu_id, stu_name : result[0].name,type : 'student'};
          name = JSON.stringify(result[0].name);
          res.writeHead(200, {'Content-Type':'application/json'});
          res.write(name);
          res.end();
        }else{
          res.status(403).send('Username/Password is wrong\n');
        }
      }
    } 
  });
}
  else if(req.body.regorLogin == "login" && req.body.type == 'Teacher'){
    var email = req.body.email;
    var password = req.body.password;
    client.query('select * from teachers where email = ?',[email],function(err,result){
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
          req.session.auth = {tech_id : result[0].tech_id,type : 'teacher'};
          var name = JSON.stringify(result[0].name);
          res.writeHead(200, {'Content-Type' : 'application/json'});
          res.write(name);
          res.end();
        }else{
          res.status(403).send('Username/Password is wrong\n');
        }
      }
    } 
  });  
}

  else if(req.body.regorLogin == "register" && req.body.type == "Teacher"){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    var someVar = [];
	  client.query("select email from teachers where email=?",[email] ,function(err, rows){
	  if(err) {
	    throw err;
	    console.log("error");
	  } else {
	    checkTeacher(JSON.stringify(rows));
	  }
	});
	
	function checkTeacher(value) {
	  someVar = JSON.parse(value);
    if(someVar == "")
    {
      res.status(404).send("You are not registered by the admin! :(");
    }
  	else if (someVar[0]["email"] == email){
      client.query('update teachers set password=?,signed_up=? where email=?', [dbString,"YES",email],function(err,result){	
        if(err){
          res.status(500).send(err.toString());
        }
        else{
          res.send("Teacher Registered.");
        }
      });
    }
	 }
  }
});


app.get('/students',function(req,res){
  var obj = xlsx.parse(fs.readFileSync(__dirname + '/myfile.xlsx'));
  var total_students = (obj[0].data).length;
  for (var i=2;i<total_students;i++){
    res.write(obj[0].data[i][0] + '\n');
    res.end();
  }
});

app.get('/aa',function(req,res){
  var roll_no;
  var present_date = new Date().toLocaleDateString();
  var attendance = fs.readFileSync('attendance.json'); // Reading JSON file
  attendance = JSON.parse(attendance); 
  res.write(showNavbar());
  res.write(fs.readFileSync('aa.html'));
  var obj = xlsx.parse(fs.readFileSync(__dirname + '/myfile.xlsx'));
  var total_students = (obj[0].data).length;
  attendance[present_date] = new Object();
  for (var i=2;i<total_students;i++){
    roll_no = obj[0].data[i][1];
    res.write(aas(obj[0].data[i][0].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),obj[0].data[i][1]));
    (attendance[present_date])[roll_no] = 50;
  }
  console.log(attendance);
  res.end();
});
app.get('/routine' , function(req,res){
  res.write(showNavbar());
  res.write(fs.readFileSync('routine.html'));
  res.end();
});
app.get('/teachers_homepage' , function(req,res){
  res.write(showNavbar());
  res.write(fs.readFileSync('teachers_homepage.html'));
  res.end();

  /*var announcements_text = req.body.announcements_text;
  client.query('insert into announcements (announcements) values(?) , [announcements_text]');*/
  /*var d_routine = `<button type='submit' id="addDailyRoutine">Add </button>
    <script>
      var dr1 = document.getElementById('addDailyRoutine');
      dr1.onclick = function(){
        var f = (function(){
          var xhr= [],numbers;
          for(i=0;i<10;i++){
            numbers = document.getElementByClassName('subject')[i].innerHTML;
            try{
              (function(i){
                xhr[i] = new XMLHttpRequest();
                  console.log(numbers);
                  xhr[i].open("POST", '/daily_routine', true);
                  xhr[i].setRequestHeader('Content-Type' , 'application/json');
                  xhr[i].send(JSON.stringify({"numbersl" : numbers}));
              })(i);
            }
            catch (err) {
              console.log(err.ToString());
            }
          }
        })();
      };
    </script> `
    res.write(d_routine);
  res.end();*/
});

app.get('/attendance',function(req,res){
  // var excel_attendance = JSON.stringify(xlsx.parse(__dirname + '/myfile.xlsx')); // parses a file
  var obj = xlsx.parse(fs.readFileSync(__dirname + '/myfile.xlsx')); //parses a buffer
  // obj[0].data[0][3] = new Date((obj[0].data[0][3] - (25567 + 1))*86400*1000);
  // obj[0].data[0][3] = obj[0].data[0][3].toLocaleDateString();
  console.log(JSON.stringify(obj));
  var attendance = fs.readFileSync('attendance.json'); // Reading JSON file
  attendance = JSON.parse(attendance);                 // Changing JSON to text
  var present_date = new Date().toLocaleDateString();  // get present date
  
  attendance[present_date] = new Object();            //declare new object with present date
  var roll_no;
  var total_classes_present;
  var total_students = (obj[0].data).length;          // get total no of rows of the attendance excel sheet
  for (var i=2;i<total_students;i++){
    roll_no = obj[0].data[i][1];
    total_classes_present = obj[0].data[i][9];
    // console.log(obj[0].data[i][1]);
    (attendance[present_date])[roll_no] = total_classes_present;
  }
  var data1 = JSON.stringify(attendance,null,2);
    fs.writeFile('attendance.json', data1 , function finished(err){
      console.log("All Set");
    });
  // console.log(total_students);
  // // (attendance[present_date])[roll_no] = 6;
  // // attendance[present_date] = ;
  // // console.log

  // console.log(attendance);
  // console.log(attendance['23/4/2017']);
  // // attendance[obj[0].data[0][3]] = new Object();
  // // attendance[obj[0].data[0][3]]
  res.send("Hello");
});

app.get('/showAttendance' , function(req,res){
  var aa = fs.readFileSync('attendance.json');
  aa = JSON.parse(aa);
  var present_date = new Date().toLocaleDateString();
  res.send('Number of Classes attended on ' + present_date + ' = ' + (aa[present_date])[req.session.auth.stu_id]);
});

app.get('/checklogin' , function(req,res){
  if(req.session && req.session.auth && req.session.auth.stu_id){
    res.send("session on" + req.session.auth.stu_id);
  }
  else if(req.session && req.session.auth && req.session.auth.tech_id){
    res.send("session on" + req.session.auth.tech_id);
  }
  else if(req.session && req.session.auth && req.session.auth.admin_id){
    res.send("session on" + req.session.auth.admin_id);  
  }
  else{
    res.send("session off");
  }
});
app.get('/test',function(req,res){
  res.send("This is a test");
});
app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});
app.get('/teachers_showfiles', function(req,res){
	res.write(showNavbar());
	res.write(showFilesPage());
  var c=0;
	for (var key in words){
	    res.write(showFiles(key,c));
      c++;
	}
	res.end();
});
app.get('/student_showfiles', function(req,res){
  res.write(showNavbar());
  //res.write(showFilesPage());
  var c=0;
  for (var key in words){
      res.write(showFiles(key,c));
      c++;
  }
  res.end();
});

var port = 8080;
app.listen(8080, function (){
  console.log(`Students Corner listening on port ${port}!`);
});

app.get('/' , function(req,res){
  if(req.session.auth){
    res.writeHead(301,{Location: 'localhost:8080/homepage'});
    res.end();
  }
  else{
    res.sendFile('index.html' , {root : __dirname});
  }
});
app.get('/homepage' , function(req,res){
  if(req.session && req.session.auth && req.session.auth.stu_id){
    console.log(req.session);
    console.log(req.session.auth);
    console.log(req.session.auth.stu_id);
    res.write(showNavbar());
    res.write(fs.readFileSync('student_homepage.html'));
    res.end();
  }
  else if(req.session && req.session.auth && req.session.auth.tech_id){
    res.write(showNavbar());
    res.write(fs.readFileSync('teachers_homepage.html'));
    res.end();
  }
  else{
    res.send("You are not allowed to access this page");
  }
});
app.get('/uploader' , function(req,res){
  res.sendFile('uploader.html' , {root : __dirname});
});
app.get('/student_myprofile', function(req,res){
  res.write(showNavbar());
  res.write(fs.readFileSync('student_myprofile.html'));
  res.end();
});
app.get('/teachers_myprofile', function(req,res){
  res.write(showNavbar());
  res.write(fs.readFileSync('teachers_myprofile.html'));
  res.end();
});
app.get('/admin_log' , function(req,res){
  res.sendFile('admin_login.html' , {root : __dirname});
});
app.get('/admin' , function(req,res){
  if(req.session && req.session.auth && req.session.auth.admin_id){
    res.sendFile('admin.html' , {root : __dirname});
  }
else{
    res.send("You are not allowed to access this page");
  }
});
app.get('/css/:filename',function(req,res){
  res.sendFile(path.join(__dirname,'css', req.params.filename));
});
app.get('/:jsfile' , function(req,res){
  res.sendFile(req.params.jsfile , {root : __dirname});
});
app.get('/images/:image', function(req,res){
  res.sendFile(path.join(__dirname,'images',req.params.image));
});

/*app.post('/daily_routine',function(req,res){
  var data = req.body.subject;
  var data1 = JSON.stringify(data,null,2);
    fs.writeFile('daily_routine.json', data1 , function finished(err){
      console.log("All Set");
    }); 
});*/
app.post('/upload',function(req,res){
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/uploads');
  form.on('file', function(field,file){
		fs.rename(file.path,path.join(form.uploadDir , file.name));
    // console.log(form);
    words[file.name] = new Array(3);
		words[file.name][0] = path.join(form.uploadDir , file.name);
    words[file.name][1] = file.size/1000 + " KB";
    words[file.name][2] = new Date().toLocaleString();
    var data = JSON.stringify(words,null,2);
    fs.writeFile('uploads.json', data , function finished(err){
      console.log("All Set");
    });
	});
  form.on('error',function(err){
		console.log('An error has occured: \n' + err);
	});
  form.on('end',function(){
		res.end('Success');
	});
  form.parse(req);
});