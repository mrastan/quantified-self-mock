
/*
 * GET users listing.
 */

var mongo = require('mongodb'),
	check = require('validator').check,
    db;


var getClientIp = function(req) {
  var ipAddress;
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }

  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }

  return ipAddress;
};


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
    							'client_ip'	: getClientIp(req),
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