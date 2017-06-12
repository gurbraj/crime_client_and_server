var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// var CrimeLocationSchema   = new Schema({
//     location: String,
//     shoplifting: Number
//
// });

var CrimeLocationSchema   = new Schema({
  hundred_block: String,
  date: Date ,
  "baeb": Number,
  "baer": Number,
 "shoplifting": Number,
 "tfmv": Number,
 "tomv": Number,
 "hundred_block_geocoded": Array,
 "total_crime": Number
});



module.exports = mongoose.model('CrimeLocation', CrimeLocationSchema);
