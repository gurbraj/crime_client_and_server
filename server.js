var path = require("path")
var express = require("express")
var app = express()

var cors = require("cors")
require("dotenv").config()
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 4000))


//mongodb stuff
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
// var url = 'mongodb://localhost:27017/db';
//
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to mongodb server");
//
//   db.close();
// });
//end mongodb stuff
//mongoose stuff

var mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
  mongoose.connect("mongodb://gnak:hejsan@ds127982.mlab.com:27982/heroku_j0kd36jk")
} else {
  mongoose.connect('mongodb://localhost:27017/db');
}

var db = mongoose.connection;

var CrimeLocation = require('./models/crimelocation');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose up and running')
});


if (process.env.NODE_ENV === 'production') {
  console.log("wassa")
  //app.use(express.static(path.join(__dirname, 'crime_front_end/build')));
  app.use(express.static('crime_front_end/build'));
//   app.get('/react', function(req, res) {
//
//   //res.sendFile(path.join(__dirname, 'crime_front_end/build'));
// });


}


app.get("/testing", function (req, res) {
  res.set('Content-Type', 'application/json');
  res.json({message :"tis comes from the node server"})
})

app.get("/crime", function (req, res) {
  res.set('Content-Type', 'application/json');

  CrimeLocation.find(function (err, crimelocations) {
  if (err) return console.error(err);

    res.json({crimelocations : crimelocations.slice(1,100)})
})

})

app.get("/crime_aggregated", function (req, res) {
  res.set('Content-Type', 'application/json');

  CrimeLocation.find(function (err, crimelocations) {
  if (err) return console.error(err);

    res.json({crimelocations : crimelocations.slice(1,100)})
  })

})

app.get("/crime_yearly/", function(req, res) {
  res.set('Content-Type', 'application/json')

  console.log(req.query)
  CrimeLocation.find(function(err, crimelocations) {
    //here goes the function that takes input req.query.year and  spits out the yearly dataset

    //memoize this later

    crimelocationsYearlyFilter = function(crimelocations, filterYear) {

      let filteredData = []

      crimelocations.forEach( (crimelocation) => {
        let hundred_block = crimelocation.hundred_block
        let hundred_block_geocoded = crimelocation.hundred_block_geocoded
        let geometry = crimelocation.geometry


        let crimesFiltered = crimelocation.crimes.filter((crime) => {
            let date = new Date(crime.date)
            let year = date.getFullYear().toString()
            return year === filterYear;
          })

        let crimelocationHash = {hundred_block: hundred_block, hundred_block_geocoded: hundred_block_geocoded, geometry: geometry , crimes: crimesFiltered }

        filteredData.push(crimelocationHash)
      })

      return filteredData

    }

    crimelocationsAggregate = function(crimelocations) {
      //this function was previously on serverside.
      let dataArr = []

      crimelocations.forEach((crimelocation) =>{
        let hundred_block = crimelocation.hundred_block
        let hundred_block_geocoded = crimelocation.hundred_block_geocoded
        let geometry = crimelocation.geometry
        let aggregatedHash = {hundred_block: hundred_block, hundred_block_geocoded: hundred_block_geocoded, geometry: geometry , crime:{baeb:0, baer:0, shoplifting:0, tfmv:0, tomv:0,total_crime:0} }

        crimelocation.crimes.forEach((crime) => {

          aggregatedHash.crime.baeb += crime.baeb
          aggregatedHash.crime.baer += crime.baer
          aggregatedHash.crime.shoplifting += crime.shoplifting
          aggregatedHash.crime.tfmv += crime.tfmv
          aggregatedHash.crime.tomv += crime.tomv
          aggregatedHash.crime.total_crime += crime['total_crime']


        })
        dataArr.push(aggregatedHash)
      });
      return dataArr

    }


    const crimelocationsYearlyFiltered = crimelocationsYearlyFilter(crimelocations, req.query.year)

    const crimelocationsYearlyFilteredAggregated = crimelocationsAggregate(crimelocationsYearlyFiltered)

    res.json({year: req.query, crimelocations : crimelocationsYearlyFilteredAggregated})

  })
})



app.listen(app.get('port'), function () {
  console.log("Listening on" +  app.get('port') )
})
