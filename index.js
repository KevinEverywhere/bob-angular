var curl = require('curlrequest');
var express = require('express')
    , pg=require('pg')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , app = express()
    , port = process.env.PORT || 3000
    , router = express.Router();

app.use(express.static(__dirname + '/dist/app')); 

app.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function(req, res, next) {
    res.render('/app/index.html');
});

router.get('/db', function(req, res, next) {
    res.render('/app/index.html');
});

router.get('/db/:id', function(req, res) {
	if(req.host=="bob-angular.herokuapp.com"){
		pg.connect(process.env.DATABASE_URL, function(err, client, done) {
			try{
				var _id=req.param("id");
				client.query('SELECT ' + _id + ' FROM country', function(err, result) {
					done();
					if (err){
						console.error(err); 
						res.send("Error " + err); 
					}else{
						res.send(result.rows); 
					}
				});
			}catch(oops){
			    res.set({'Content-Type': 'text/xml'});
				res.send("<xml version='1.0'><nocontent /></xml>");
			}
		});
	 }else{
	    res.set({'Content-Type': 'text/xml'});
		res.send("<xml version='1.0'><nocontent /></xml>");
	 }
});

router.get('/db/:id/:val', function(req, res) {
	if(req.host=="bob-angular.herokuapp.com"){
		pg.connect(process.env.DATABASE_URL, function(err, client, done) {
			try{
				var _id=req.param("id");
				var _val=(_id=="id") ? req.param("val") : "'" + req.param("val").toUpperCase() + "'";
				var _str= (_val!= "*") ? ' where ' + _id + '=' + _val : ''; 
				client.query('SELECT * FROM country' + str, function(err, result) {
					done();
					if (err){
						console.error(err); 
						res.send("Error " + err); 
					}else{
						res.send(result.rows); 
					}
				});
			}catch(oops){
			    res.set({'Content-Type': 'text/xml'});
				res.send("<xml version='1.0'><nocontent reason='trycatch' /></xml>");
			}
		});
	 }else{
	    res.set({'Content-Type': 'text/xml'});
		res.send("<xml version='1.0'><nocontent reason='badHost'/></xml>");
	 }
});

router.get('/feed/:feedURL', function(req, res) {
	if(req.host=="bob-angular.herokuapp.com"){
		curl.request(decodeURIComponent(req.param("feedURL")), function (err, stdout, meta) {
		    res.set({'Content-Type': 'text/xml'});
			res.send(stdout);
		});
	 }else{
	    res.set({'Content-Type': 'text/xml'});
		res.send("<xml version='1.0'><nocontent /></xml>");
	 }
});

app.use('/', router);

app.listen(port);

console.log('App running on port', port);

