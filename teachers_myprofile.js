$(window).on( "load", function() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				var response = JSON.parse(request.responseText);
				if (response.gender == 'M'){response.gender = 'MALE';}else if (response.gender == 'F'){response.gender = 'FEMALE';}
				document.getElementById('teachers_name').innerHTML = response.name;
				document.getElementById('teachers_email').innerHTML = response.name;
				document.getElementById('teachers_gender').innerHTML = response.gender;
				document.getElementById('teachers_mobile').innerHTML = response.mobile;
				document.getElementById('teachers_dob').innerHTML = (response.dob).split('T')[0]; 
				document.getElementById('teachers_preadd').innerHTML = response.present_address;
				document.getElementById('teachers_peradd').innerHTML = response.permanent_address;
				document.getElementById('teachers_dept').innerHTML = response.department;
				document.getElementById('teachers_class').innerHTML = response.class;
			}
			else if(request.status === 403){
				alert("Invalid data");
			}
		}
	}
	request.open('POST', '/getStudentDetails' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send();
});

var addInfo = document.getElementById("addInfo");
addInfo.onclick = function(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				url = 'http://localhost:8080/teachers_myprofile?name=' + encodeURIComponent(request.responseText);
   				document.location.href = url;
			}
			else if(request.status === 403){
				alert("Invalid data");
			}
			else if(request.status === 500){
				alert(req.responseText);
			}
		}
	}
	
	var gender = $('input[name="gender"]:checked').val();
	var mobile = document.getElementById("mobile").value;
	var dob = document.getElementById("dob").value;
	var present_add = document.getElementById("present_add").value;
	var permanent_add = document.getElementById("permanent_add").value;
	var same_as = $('input[name="same_as"]:checked').val();
	var e = document.getElementById("classes");
	var classes = e.options[e.selectedIndex].text;
	request.open('POST', '/student_myprofile_info' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({gender : gender, mobile:mobile, dob:dob, present_add:present_add,permanent_add:permanent_add,same_as:same_as,classes:classes}));
}