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

app.use('/', router);

app.listen(port);

console.log('-----------------------------');
console.log('Testing Server Availability');
console.log('-----------------------------');
console.log(' ');
console.log('The server at port ' + port + ' is now ');
console.log('available for the protractor tests.');
console.log('Open a second window at the same ');
console.log('directory location and enter one ');
console.log('or more of the following tests:');
console.log(' ');
console.log('-----------------');
console.log('npm run protract');
console.log('-----------------');
console.log(' ');
console.log('-----------------');
console.log('npm run iphone-protract');
console.log('-----------------');
console.log(' ');
console.log('-----------------');
console.log('npm run ipad-protract');
console.log('-----------------');
console.log(' ');
console.log('In a browser, it can be seen at:');
console.log(' ');
console.log('http://localhost:' + port);
console.log(' ');

