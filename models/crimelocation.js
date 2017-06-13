var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var GeoJSON = require('mongoose-geojson-schema');
//one crimelocation has many crimes

var CrimesSchema = new Schema({
  "date": Date ,
  "baeb": Number,
  "baer": Number,
 "shoplifting": Number,
 "tfmv": Number,
 "tomv": Number,
 "total_crime": Number
});


var CrimeLocationSchema   = new Schema({
  "hundred_block": String,
 "hundred_block_geocoded": Array,
 "geometry": mongoose.Schema.Types.GeoJSON,
 "crimes": [CrimesSchema]
});



module.exports = mongoose.model('CrimeLocation', CrimeLocationSchema);
