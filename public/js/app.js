var token;

$('#submit-button').on('click', function(){
	
	var email = $('#email-input').val();
	var password = $('#password-input').val();
	
	$.post('/api/login', { email:email, password:password }, function(res){
		
		if(res.token){
			token = res.token;
		}
		//console.log(res);
	});
});

$('#projects-button').on('click', function(){
	
	$.ajax({
		
		method:'GET',
		url:'/api/projects',
		headers:{ authorization:token },
		success:function(res){
			
			console.log(res);
		},
		error:function(err){
			
			console.log(err);
		}
		
	});
	
});