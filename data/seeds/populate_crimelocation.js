//mongodb server needs to be up and running
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db');
var db = mongoose.connection;

var CrimeLocation = require('../../models/crimelocation');

var fs = require('fs'),
    csv = require('csv');

var read = fs.createReadStream('./crimelocations.csv'),
    parse = csv.parse(),

    row_index = 0, // to keep track of where we are
    transform = csv.transform(function(row,cb) {
      //the data is coming in sorted by hundredr block. this script utilizes this.
      if (row_index === 0) {
        //skip header
      } else {

        var hundred_block_new = row[1]

        if (row_index === 1) {
          //here initialize the first crimelocation
          crimeLocationHash ={
            hundred_block: hundred_block_new ,
            "hundred_block_geocoded": eval(row[9]) ,
          }
          crimelocation = new CrimeLocation(crimeLocationHash)

          //and set hundred_block_old to equal hundred_block_new
          hundred_block_old = hundred_block_new;
        }

        if (hundred_block_new !== hundred_block_old) {
          //if they are not the same, save the previous one

          console.log(crimelocation)
          crimelocation.save(function (err, crimelocation) {
            if (err) return console.error(err);
            console.log('saved crime locations: ' + crimelocation)
          });
          //and initialize new crimelocation with hundred_block_new
          crimeLocationHash ={
            hundred_block: hundred_block_new ,
            "hundred_block_geocoded": eval(row[9]) ,
          }
          crimelocation = new CrimeLocation(crimeLocationHash)
        }

        //create crimeshash and push it to crimelocation
        crimesHash = {
          date: Date(row[2], row[3]),
          "baeb": Number(row[4]) ,
          "baer": Number(row[5]),
          "shoplifting": Number(row[6]) ,
          "tfmv": Number(row[7]) ,
          "tomv": Number(row[8]),
          "total_crime": row[10]
        }

        crimelocation.crimes.push(crimesHash)
        // after the treatment, assign the treated hunded_block_new to hundred_block_old
        hundred_block_old = hundred_block_new

      }

      row_index+=1;
    });

read
    .pipe(parse)
    .pipe(transform)
