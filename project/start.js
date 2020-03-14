
const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


//Connect to DB
mongoose.connect(`${process.env.MONGODB_KEY}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to db!")
  })
  .catch(err => console.log(err))

//Import Routes
const authRoute = require('../routes/auth');

//Middleware
//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Routes Middlewares
app.use('/', authRoute)


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname))
app.use(express.static(__dirname+"/resources"));

// views is directory for all template files
app.set('views', __dirname + '/html');
app.set('view engine', 'ejs'); 

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

// This file is what handles incoming requests and
// serves files to the browser, or executes server-side code