$(document).ready(function(){
    var showAnnouncement = document.getElementById('showAnnouncements');
    var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				var response = JSON.parse(request.responseText);
				// alert(response[0].announcement);
				//alert(response.length);
				for(var i=0;i<response.length;i++){
					showAnnouncement.innerHTML += response[i].announcement + ("\r\n");
				}
			}
			else if(request.status === 500){
				alert("Server Error");
			}
		}
	}
	request.open('POST', '/getAnnouncements' , true);
	request.setRequestHeader('Content-Type' , 'application/json');
	request.send();
});