// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", (req, res)=>{
  let date = new Date();
  
  return res.json({
    'unix': date.getTime(), 
    'utc': date.toUTCString()
  });  
});

app.get("/api/:date", (req, res)=>{
  let resultDate='';

  let inputDate = new Date(req.params.date);

  if(inputDate.toString() == "Invalid Date"){
    //convert from unix date to normal date
    inputDate = new Date(parseInt(req.params.date));
    // console.log(inputDate, "Invalid Date");
  }
 
  if(inputDate.toString() == "Invalid Date") {
    return res.json({error: "Invalid Date"});
  } else {
    resultDate = { unix: inputDate.getTime(), 
    utc: inputDate.toUTCString() };
    // console.log(resultDate);
  }
  return res.json(resultDate);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
