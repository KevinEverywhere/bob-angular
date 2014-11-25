var curl = require('curlrequest');
var express = require('express')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , app = express()
    , port = process.env.PORT || 3000
    , router = express.Router();

app.use(express.static(__dirname + '/app')); 

app.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function(req, res, next) {
    res.render('/app/index.html');
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

