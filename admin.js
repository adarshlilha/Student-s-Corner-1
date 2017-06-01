var insert_teacher = document.getElementById("insert_teacher");
insert_teacher.onclick = function(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				alert("Data inserted!!");
			}
			else if(request.status === 403){
				alert("Invalid data");
			}
			else if(request.status === 500){
				alert("Server error");
			}
		}
	}
	var insert_tech_id = document.getElementById("insert_reg_no").value;
	var insert_name = document.getElementById("insert_name").value;
	var insert_email = document.getElementById("insert_email").value;
	var insert_dept = document.getElementById("insert_dept").value;
	var insertorDelete = document.getElementById("insert_teacher").value;
	request.open('POST', '/admin_panel', true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({insert_tech_id : insert_tech_id , insert_name : insert_name ,insert_email: insert_email, insert_dept : insert_dept, insertorDelete : insertorDelete}));

};
var insert_student = document.getElementById("insert_student");
insert_student.onclick = function(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				alert("Data inserted!!");
			}
			else if(request.status === 403){
				alert("Invalid data");
			}
			else if(request.status === 500){
				alert("Server error");
			}
		}
	}
	var insert_stu_id = document.getElementById("insert_reg_no").value;
	var insert_name = document.getElementById("insert_name").value;
	var insert_email = document.getElementById("insert_email").value;
	var insert_dept = document.getElementById("insert_dept").value;
	var insertorDelete = document.getElementById("insert_student").value;
	request.open('POST', '/admin_panel', true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({insert_stu_id : insert_stu_id , insert_name : insert_name ,insert_email: insert_email, insert_dept : insert_dept, insertorDelete : insertorDelete}));

};
var delete_btn = document.getElementById("delete_btn");
delete_btn.onclick = function(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				alert("Data deleted!!");
			}
			else if(request.status === 403){
				alert("Invalid data");
			}
			else if(request.status === 500){
				alert("Server error");
			}
		}
	}
	var delete_reg_no = document.getElementById("delete_reg_no").value;
	var delete_name = document.getElementById("delete_name").value;
	var delete_dept = document.getElementById("delete_dept").value;
	var insertorDelete = document.getElementById("delete_btn").value;
	request.open('POST', '/admin_panel', true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({delete_reg_no : delete_reg_no , delete_name : delete_name , delete_dept : delete_dept, insertorDelete : insertorDelete}));
};



// var insert_btn = document.getElementById("insert_btn");
// insert_btn.onclick = function(){
// 	var request = new XMLHttpRequest();
// 	request.onreadystatechange = function(){
// 		if (request.readyState === XMLHttpRequest.DONE){
// 			if(request.status === 200){
// 				alert("Data inserted!!");
// 			}
// 			else if(request.status === 403){
// 				alert("Invalid data");
// 			}
// 			else if(request.status === 500){
// 				alert("Server error");
// 			}
// 		}
// 	}
// 	var insert_tech_id = document.getElementById("insert_reg_no").value;
// 	var insert_name = document.getElementById("insert_name").value;
// 	var insert_email = document.getElementById("insert_email").value;
// 	var insert_dept = document.getElementById("insert_dept").value;
// 	var insertorDelete = document.getElementById("insert_btn").value;
// 	request.open('POST', '/admin_panel', true);
// 	request.setRequestHeader('Content-Type' , 'application/json');
// 	request.send(JSON.stringify({insert_tech_id : insert_tech_id , insert_name : insert_name ,insert_email: insert_email, insert_dept : insert_dept, insertorDelete : insertorDelete}));

// };
// var delete_btn = document.getElementById("delete_btn");
// delete_btn.onclick = function(){
// 	var request = new XMLHttpRequest();
// 	request.onreadystatechange = function(){
// 		if (request.readyState === XMLHttpRequest.DONE){
// 			if(request.status === 200){
// 				alert("Data deleted!!");
// 			}
// 			else if(request.status === 403){
// 				alert("Invalid data");
// 			}
// 			else if(request.status === 500){
// 				alert("Server error");
// 			}
// 		}
// 	}
// 	var delete_reg_no = document.getElementById("delete_reg_no").value;
// 	var delete_name = document.getElementById("delete_name").value;
// 	var delete_dept = document.getElementById("delete_dept").value;
// 	var insertorDelete = document.getElementById("delete_btn").value;
// 	request.open('POST', '/admin_panel', true);
// 	request.setRequestHeader('Content-Type' , 'application/json');
// 	request.send(JSON.stringify({delete_reg_no : delete_reg_no , delete_name : delete_name , delete_dept : delete_dept, insertorDelete : insertorDelete}));
// };