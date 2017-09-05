var config = require("./config.json")
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

const TWILIO_ACCOUNT_SID = config.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = config.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = config.TWILIO_NUMBER
var twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

//mongodb stuff
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
  mongoose.connect("mongodb://gnak:hejsan@ds127982.mlab.com:27982/heroku_j0kd36jk")
  app.use(express.static('crime_front_end/build'));
} else {
  mongoose.connect('mongodb://localhost:27017/db');
}

var db = mongoose.connection;

var CrimeLocation = require('./models/crimelocation');
var Contact = require('./models/contact');
//Contact.collection.drop();

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose up and running')
});

//set up socket
const server = app.listen(app.get('port'), function () {
  console.log("Listening on" +  app.get('port') )
})

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //these are OUTGOING chat messages from the app
  socket.on('chat message', function(messageObj){
    console.log(messageObj);
    //io.emit('chat message', "hello world from server!");
    let body = messageObj.body;
    let phoneNumber = messageObj.phone_number

    //send the outgoing message to twilio
    twilioClient.messages.create(
      {to: phoneNumber, from: TWILIO_NUMBER, body: body},
      (error, message) => {
        if (!error) {
          console.log('success sending text')
        } else {
          console.log('error sending text')
        }
      }
    )

    io.emit('chat message', messageObj)

  });

});


// chat end points
app.get('/contacts', (req, res) => {
  Contact.find((err, contacts) => {
    res.json({contacts: contacts})
  })

})

app.post('/contacts/new', (req,res) => {
  let contactHash = {phone_number: req.body.phone_number};
  let contact = new Contact(contactHash);
  contact.save((err, contact) => {
    if (err) {
      console.log(err)
    } else {
      console.log("saved contact:", contact)
      res.json(contact)
    }
  })

})

app.post('/contacts/messages/new', (req, res) => {
  let phoneNumber = req.body.phone_number;
  let messageBody = req.body.body;

  Contact.findOne({"phone_number": phoneNumber}, (err, foundContact) => {
    foundContact.messages.push({"body": messageBody});

    foundContact.save((err, foundContact) => {
      if (err) {
        console.log(err)
      } else {
        console.log("saved message")
      }
    })

    res.json({message: "created message in db"})
  })

})

app.get("/contacts", (req,res) => {
  Contact.find((err, contacts) => {
    res.json({contacts: contacts})
  })
})

app.post("/sms", (req, res) => {
  let phoneNumber = req.body.From;
  let body = req.body.Body;
  let messageObj = {"phone_number": phoneNumber, "body": body, "incoming_message": true}

  Contact.findOne({"phone_number": phoneNumber}, (err, foundContact) => {
    foundContact.messages.push(messageObj)

    foundContact.save((err, foundContact) => {
      if (err) {
        console.log(err)
      } else {
        console.log("saved message")
      }
    })
  })

  io.emit("chat message", messageObj)
  res.json({message: "created message in db"})
})
//end chat end points



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
