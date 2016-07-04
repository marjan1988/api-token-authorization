var mongoose = require('mongoose');


var Schema = mongoose.Schema({
	
	email		: { type:String, unique:true },
	password	: String,
	dateCreated	: { type:Date, default:Date.now },
	emailToken  : String,
	verified    : { type:Boolean, default:false },
//	tokens		: [String] 
	tokens		:[{
		token:{ type:String },
		expires:{ type:Date , default:function(){
			return Date.now() + 1000*60*60*24*14
			//1000 milisecunds * 60 = 60 secunds * 60 = 1hour * 24 = 1day * 14 = 14 days
			//token expires after 14 days
		}}
	}]
});

mongoose.model('User', Schema);