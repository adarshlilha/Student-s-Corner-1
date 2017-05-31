var add_announcement = document.getElementById("add_announcement");
add_announcement.onclick = function(){
	var request = new XMLHttpRequest();
	var announcements_text = document.getElementById("announcements_text").value;
	var e = document.getElementById("forClass");
	var forClass = e.options[e.selectedIndex].text;

	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if (request.status === 200){
  				console.log('announcement added');
   			}
		}
	}

	request.open('POST', '/announcements' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({announcements_text : announcements_text , forClass : forClass}));
};



addDailyRoutine.onclick = function(){
	var addDailyRoutine = document.getElementById("addDailyRoutine");
	var subjectsArray = document.getElementsByClassName('subject');
	var request = new XMLHttpRequest();
	var i;var subjects=[];
    for (i = 0; i < subjectsArray.length; i++){
      subjects.push(document.getElementsByClassName('subject')[i].value);
    }
	/*request.onreadystatechange = function(){
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
	}*/
	request.open('POST', '/setDailyRoutine' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({subjects : subjects}));
};
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
	/*var sub = [];
	var subject = [];
	for (var i=0;i<30;i++){
		sub[i] = document.getElementsByClassName("subject")[i].value;
		subject[i] = JSON.stringify(sub[i]);
		request.open('POST', '/daily_routine', true);
		request.setRequestHeader('Content-Type' , 'application/json');
		request.send(JSON.stringify({'subject' : subject[i]}));
	}
	*/	
		
		
	//}
//}