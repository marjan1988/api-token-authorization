var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

exports.initRoutes = function(server){
	
	console.log('API Routes setup');
	
	server.get('/', function(req, res){
		
		res.send('Hello world');
		
	});
	
	server.post('/api/user', function(req, res){
		
		//console.log(req.body);
		
		var data = req.body;
		
		var email = data.email;
		var password = data.password;
		
		if(email === undefined){
			
			return res.status(400).send('No email provided');
		}
		
		if(password === undefined){
			
			return res.status(400).send('No password provided');
		}
		
		bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
		
		
			var User = mongoose.model('User');

		var user = new User({ email:email, password:hash });
		
		user.save(function(err){
			
			if(!err){
				res.send(user);
			}else{
				console.log(err);
				res.status(400).send(err);
			}
		});
		
	});
		});
	
	});
	
};