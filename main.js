var signup = document.getElementById("signup_btn");
signup.onclick = function() {
	var password = document.getElementById('new_password').value;
	var conf_password = document.getElementById('conf_password').value;
	if (password != conf_password){
		alert("Passwords do not match");
		return false;
	}
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			
			if (request.status === 200){
				alert("Registered");
			}
			else if (request.status === 403){
				alert("Invalid username/password");
			}
			else if (request.status === 500){
				alert("Server Error");
			}
			else if (request.status === 404){
				alert("You are not registered by the admin! :(");
			}
		}
	}
	var name = document.getElementById("name").value;
	var email = document.getElementById("new_email").value;
	var password = document.getElementById("new_password").value;
	var regorLogin = document.getElementById("signup_btn").value;
	var type = $('input[name="teacherorStu"]:checked').val();
	request.open('POST', '/login' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({name: name ,email: email , password: password , regorLogin : regorLogin, type : type}));
};

var signin = document.getElementById("signin_btn");
signin.onclick = function() {
	var request = new XMLHttpRequest();
	// request.open("POST","http://localhost:8000/login", true);
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if (request.status === 200){
   				url = 'http://localhost:8080/homepage?name=' + encodeURIComponent(request.responseText);
   				document.location.href = url;
   			}
			else if (request.status === 403){
				alert("Invalid username/password");
			}
			else if (request.status === 500){
				alert("Server Error");
			}
		}
	}
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var regorLogin = document.getElementById("signin_btn").value;
	var type = $('input[name="teacherorStu"]:checked').val();
	request.open('POST', '/login' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({email: email , password: password, regorLogin : regorLogin , type : type}));
};

