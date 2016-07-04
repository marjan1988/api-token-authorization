const mongoose = require('mongoose');

exports.connect = function(cb){
	
	mongoose.connect('mongodb://localhost/auth-token');
	
	mongoose.connection.on('error', function(err){
		
		console.log('Error: ', err);
		
	}); 
	
	mongoose.connection.once('open', function(){
		
		console.log('Connection open');
		
		if(cb){
			cb();
		}
		
	});
	
};