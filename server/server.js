var express = require("express")
var app = express()


var cors = require("cors")
require("dotenv").config()

app.use(cors());

app.set('port', (process.env.PORT || 4000))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('crime_front_end/build'));
}


app.get("/testing", function (req, res) {
  res.set('Content-Type', 'application/json');
  res.json({message :"tis comes from the node server"})
})



app.listen(app.get('port'), function () {
  console.log("Listening on" +  app.get('port') )
})
