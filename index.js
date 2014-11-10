var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

/*

var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

*/

http.createServer(app).listen( (process.env.PORT || 5000));