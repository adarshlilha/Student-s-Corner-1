$('.upload-btn').on('click',function(){
	$('#upload-input').click();
	$('.progress-bar').text('67%');
	$('.progress-bar').width('67%');
});
$('#upload-input').on('change', function(){
	var files=$(this).get(0).files;
	if(files.length > 0){
		var formData = new FormData();
		for(var i=0;i<files.length;i++){
			var file = files[i];
			formData.append('uploads[]', file, file.name);
		}
	}
});
$.ajax({
	url : '/uploads',
	type : 'POST',
	data : formData,
	processData : false,
	contentType : false,
	success : function(data){
		console.log('Upload Successful');
	}
});
