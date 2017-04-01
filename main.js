var signup = document.getElementById("signup_btn");
signup.onclick = function() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if (request.status === 200){
				alert("Logged in");
			}
			else if (request.status === 403){
				alert("Invalid username/password");
			}
			else if (request.status === 500){
				alert("Server Error");
			}
		}
	}
	var name = document.getElementById("name").value;
	var email = document.getElementById("new_email").value;
	var password = document.getElementById("new_password").value;
	var regorLogin = document.getElementById("signup_btn").value;
	request.open('POST', '/login' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({name: name ,email: email , password: password , regorLogin : regorLogin}));
};

var signin = document.getElementById("signin_btn");
signin.onclick = function() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if (request.status === 200){
				// window.location.href = 'http://localhost:8080/homepage';
				console.log(result[0].name);
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
	request.open('POST', '/login' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({email: email , password: password, regorLogin : regorLogin}));
};