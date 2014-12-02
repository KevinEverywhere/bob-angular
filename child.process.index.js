/* this is in progress and used for internal testing. */

// var child_process=require('child_process').spawn();

// java -jar selenium-server-standalone-2.24.1.jar

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
console.log('App running on port', port);

java -jar selenium-server-standalone-2.24.1.jar

var webdriver = require('selenium-webdriver');
 
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();
 
driver.get('http://www.google.com');
driver.findElement(webdriver.By.name('q')).sendKeys('simple programmer');
driver.findElement(webdriver.By.name('btnG')).click();
driver.quit();