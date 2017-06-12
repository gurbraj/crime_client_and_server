var express = require("express")
var app = express()


var cors = require("cors")
require("dotenv").config()

app.use(cors());

app.set('port', (process.env.PORT || 4000))


//mongodb stuff
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/db';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");

  db.close();
});
//end mongodb stuff
//mongoose stuff

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db');
var db = mongoose.connection;

var CrimeLocation = require('./models/crimelocation');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose up and running')
});
//


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('crime_front_end/build'));
  console.log("wassa")
}


app.get("/testing", function (req, res) {
  res.set('Content-Type', 'application/json');
  res.json({message :"tis comes from the node server"})
})

app.get("/crime", function (req, res) {
  res.set('Content-Type', 'application/json');

  CrimeLocation.find(function (err, crimelocations) {
  if (err) return console.error(err);
  
  res.json({message : crimelocations})
})

})



app.listen(app.get('port'), function () {
  console.log("Listening on" +  app.get('port') )
})
