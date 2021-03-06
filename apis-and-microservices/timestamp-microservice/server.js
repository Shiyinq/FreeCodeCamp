// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
//app.get("/", function (req, res) {
  //res.sendFile(__dirname + '/views/index.html');
//});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function (req, res) {
    
    let unixDate = Math.round(new Date().getTime());
    let utcDate = new Date().toUTCString();
  
    res.json({
      unix: unixDate,
      utc: utcDate
    });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  
  let { date_string } = req.params;
  
  console.log(date_string);
  
  let unixDate = "Invalid Date";
  let utcDate = "Invalid Date";
  
  let regexDate = /[0-9]{4}\-[0-9]{2}\-[0-9]{2}/g
  let match = regexDate.test(date_string);
  
  if(match) {
      unixDate = new Date(date_string).getTime();
      utcDate = new Date(date_string).toUTCString();
  }else {
    unixDate = Number(date_string);
    utcDate = new Date(Number(date_string)).toUTCString();
  }
  
  
  if(utcDate == "Invalid Date") {
    res.json({
      error: utcDate
    });
  }else {
    
    res.json({
      unix: unixDate,
      utc: utcDate
    });
    
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});