/*var announcements_btn = document.getElementById("announcements_btn");
announcements_btn.onclick() = function(){
	var announcements_text = document.getElementById("announcements_text");
	request.open('POST', '/teachers_homepage' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({announcements_text : announcements_text}));
};*/
var addDailyRoutine = document.getElementById("addDailyRoutine");
addDailyRoutine.onclick = function(){
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
	// var subject = JSON.stringify(document.getElementsByClassName("subject"));
	/*request({
    	url: "/daily_routine",
    	method: "POST",
    	json: true,   // <--Very important!!!
    	body: subject
	}, function (error, response, body){
    	console.log(response);
	});
*/
	// var subject = document.getElementsByClassName("subject");
	// subject = JSON.stringify(subject);
	var sub = [];
	var subject = [];
	for (var i=0;i<30;i++){
		sub[i] = document.getElementsByClassName("subject")[i].value;
		subject[i] = JSON.stringify(sub[i]);
		request.open('POST', '/daily_routine', true);
		request.setRequestHeader('Content-Type' , 'application/json');
		request.send(JSON.stringify({'subject' : subject[i]}));
	}
		
		
		
	//}
}