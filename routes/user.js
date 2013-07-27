
/*
 * GET users listing.
 */

var mongo = require('mongodb'),
	check = require('validator').check,
    db;

exports.list = function(req, res){
  res.send("Access denied!");
};

exports.register = function(req, res) {
	var email = req.body['email'];

	try {
		check(email).len(1, 128).isEmail();

		mongo.Db.connect( req.app.get('mongodbUrl'), function (err, db) {
  		db.collection('users', function(er, collection) {
    		collection.insert( {'email'		: email,
    							'timestamp' : Date.now() / 1000, 
    							'client_ip'	: req.connection.remoteAddress,							
    							'ua'		: req.headers['user-agent'],
    							'lang'		: req.headers['accept-language']
    						}, {safe: true}, function(er,rs) {
    			res.send('User registered!');
				});
    		});
	  	});	

	} catch (e) {
		res.send('Email - ' + e.message);
	}
};