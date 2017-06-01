var announcements_btn = document.getElementById("announcements_btn");
announcements_btn.onclick() = function(){
	var announcements_text = document.getElementById("announcements_text");
	request.open('POST', '/teachers_homepage' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send(JSON.stringify({announcements_text : announcements_text}));
};