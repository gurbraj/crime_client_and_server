var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CrimeLocationSchema   = new Schema({
    location: String,
    shoplifting: Number

});

module.exports = mongoose.model('CrimeLocation', CrimeLocationSchema);
