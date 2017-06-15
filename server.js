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



  res.json({crimelocations : crimelocations})
})

})
//renamge this endpoint later
app.get("/crime_aggregated", function (req, res) {
  res.set('Content-Type', 'application/json');

  CrimeLocation.find(function (err, crimelocations) {
  if (err) return console.error(err);

  //this is the function that takes crimelocations, and returns aggregated crimes.
  // dataArr = []
  //
  // crimelocations.forEach((crimelocation) =>{
  //   var hundred_block = crimelocation.hundred_block
  //   var hundred_block_geocoded = crimelocation.hundred_block_geocoded
  //   var geometry = crimelocation.geometry
  //   aggregatedHash = {hundred_block: hundred_block, hundred_block_geocoded: hundred_block_geocoded, geometry: geometry , crime:{baeb:0, baer:0, shoplifting:0, tfmv:0, tomv:0,total_crime:0} }
  //
  //   crimelocation.crimes.forEach((crime) => {
  //
  //     aggregatedHash.crime.baeb += crime.baeb
  //     aggregatedHash.crime.baer += crime.baer
  //     aggregatedHash.crime.shoplifting += crime.shoplifting
  //     aggregatedHash.crime.tfmv += crime.tfmv
  //     aggregatedHash.crime.tomv += crime.tomv
  //     aggregatedHash.crime.total_crime += crime['total_crime']
  //
  //
  //   })
  //   dataArr.push(aggregatedHash)
  // });
  // end aggregateCrime

  res.json({crimelocations : crimelocations})
})

})



app.listen(app.get('port'), function () {
  console.log("Listening on" +  app.get('port') )
})
