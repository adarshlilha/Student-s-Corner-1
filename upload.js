$('.upload-btn').on('click',function(){
	$('#upload-input').click();
	$('.progress-bar').text('0%');
	$('.progress-bar').width('0%');
});
$('#upload-input').on('change', function(){
	var files=$(this).get(0).files;
	if(files.length > 0){
		var formData = new FormData();
		for(var i=0;i<files.length;i++){
			var file = files[i];
			formData.append('uploads[]', file, file.name);
		}
	$.ajax({
		url : '/upload',
		type : 'POST',
		data : formData,
		processData : false,
		contentType : false,
		success : function(data){
			console.log('Upload Successful');
		},
		xhr: function(){
			//create Http request
			var xhr = new XMLHttpRequest();
			//listen to the progress event
			xhr.upload.addEventListener('progress', function(evt){
				if(evt.lengthComputable){
					var percentageComplete = evt.loaded / evt.total;
					percentageComplete = parseInt(percentageComplete * 100);

					$('.progress-bar').text(percentageComplete + '%');
					$('.progress-bar').width(percentageComplete + '%');

					if (percentageComplete === 100){
						$('.progress-bar').html('Done');
					}
				}
			},false);
			return xhr;
			}
		});
	}
});