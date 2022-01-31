// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const PORT = process.env.PORT || 3030;
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {
  let userDate = (req.params.date);
  if (userDate.match(/\d{5,}/)) {
    userDate = +userDate;
    console.log(userDate);
  }
  let date = new Date(userDate);
  if (date.toUTCString() == "Invalid Date") {
    res.json({ error: "Invalid Date" })
  }
  // to convert date into a utc format we can use =>
  // date.toUTCString()

  // to create date into unix userDate format we can use => date.valueOf()

  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
})
app.get('/api/', (req, res) => {
  let date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
})

// listen for requests :)
// process.env.PORT
let listener = app.listen(PORT, function () {
  console.log('Your app is running on http://localhost:' + listener.address().port);
});
