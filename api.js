var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var guid = require('guid');

exports.initRoutes = function(server){
	
	console.log('API Routes setup');
	
	server.get('/', function(req, res){
		
		res.send('Hello world');
		
	});
	//============================= SERVER.POST -> API/LOGIN ===========================================//
	server.post('/api/login', function(req, res){
		
		var data = req.body;
		
		var email = data.email;
		var password = data.password;
		
		if(email === undefined){
			
			return res.status(400).send('No email provided');
		}
		
		if(password === undefined){
			
			return res.status(400).send('No password provided');
		}
		
		var User = mongoose.model('User');
		// find user by email
		User.findOne({ email:email }, function(err, userDoc){
			//check if user is found
			if(userDoc){
				//compare plain text password from the website to the hashed password in the database
				bcrypt.compare(password, userDoc.password, function(err, result){
				
				if(result){
					//if result is true passwords match
					var token = guid.raw();
					//unique id 
					
					userDoc.tokens.push({ token:token });
					userDoc.save(function(err){
						
						if(!err){
							res.send({
							token:token
						});
						}else{
							res.status(400).send(err);
						}
					//add token to the user with push and save to database
					});
					
					res.sendStatus(200);
				}else{
					//wrong password
					res.status(400).send('Email or password is wrong');
				}
			});
			}else{
				//no user found with the provided email
				res.status(400).send('Email or password is wrong');
			}
			
			
			
			
			
		});
		
	});
		//============================= SERVER.POST -> API/USER ===========================================//
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