var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db');
var db = mongoose.connection;

var CrimeLocation = require('../../models/crimelocation');
//mongodb server needs to be up and running


var fs = require('fs'),
    csv = require('csv');

var read = fs.createReadStream('./crimelocations.csv'),
    parse = csv.parse(),

    row_index = 0, // to keep track of where we are
    transform = csv.transform(function(row,cb) {

      if (row_index === 0) {
        //skip header
      } else {
        dataHash ={
          hundred_block: row[1],
          date: Date(row[2], row[3]),
          "baeb": Number(row[4]) ,
          "baer": Number(row[5]),
          "shoplifting": Number(row[6]) ,
          "tfmv": Number(row[7]) ,
          "tomv": Number(row[8]),
          "hundred_block_geocoded": eval(row[9]) ,
          "total_crime": row[10]
        }

        var crimelocation = new CrimeLocation(dataHash)
        crimelocation.save(function (err, crimelocation) {
          if (err) return console.error(err);
          console.log('saved crime locations: ' + crimelocation)
        });

      }

      row_index++;
    });

read
    .pipe(parse)
    .pipe(transform)
