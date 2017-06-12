var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//one crimelocation has many crimes



var CrimesSchema = new Schema({
  date: Date ,
  "baeb": Number,
  "baer": Number,
 "shoplifting": Number,
 "tfmv": Number,
 "tomv": Number,
 "total_crime": Number
});


var CrimeLocationSchema   = new Schema({
  hundred_block: String,
 "hundred_block_geocoded": Array,
 "crimes": [CrimesSchema]
});

// var CrimeLocationSchema   = new Schema({
//   hundred_block: String,
//   date: Date ,
//   "baeb": Number,
//   "baer": Number,
//  "shoplifting": Number,
//  "tfmv": Number,
//  "tomv": Number,
//  "hundred_block_geocoded": Array,
//  "total_crime": Number
// });



module.exports = mongoose.model('CrimeLocation', CrimeLocationSchema);
