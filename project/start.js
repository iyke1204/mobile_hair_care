
var express = require('express');
var app = express();
const path = require("path");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname+"/html/pages"))
app.use(express.static(__dirname+"/resources"));

// views is directory for all template files
//app.set('views', __dirname + '/html');
//app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/signup', (req, res, next) => {
  // is there a better way to send this to the user? Why does the res.render not work?
  res.sendFile(__dirname+"/html/pages/signup.html");
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// This file is what handles incoming requests and
// serves files to the browser, or executes server-side code