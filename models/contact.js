var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ChatMessageSchema = new Schema({
  "body": String,
  "incoming_message": { type: Boolean, default: false }
});

var ContactSchema = new Schema({
  "phone_number": String,
  "messages": [ChatMessageSchema]
})

module.exports = mongoose.model('Contact', ContactSchema);
