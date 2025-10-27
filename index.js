// index.js
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));  // pour FCC

// Page d'accueil
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API test
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Route /api → retourne la date actuelle
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});


app.get("/api/", function (req, res) {
  let currentDate = new Date()
  res.json({"unix": currentDate.getTime(), "utc": `${currentDate}`});
});



app.get("/api/:date?", function (req, res) {
  let calcDate = isNaN(req.params.date) ? req.params.date : parseInt(req.params.date)
  console.log(calcDate)
  let currentDate = new Date(calcDate)
  let errorResponse = {"error": `${currentDate}`}
  let validResponse = {"unix": currentDate.getTime(), "utc": `${currentDate.toUTCString()}`}
  console.log(currentDate)
  currentDate == "Invalid Date" ? res.json(errorResponse) : res.json(validResponse); 
});

// Serveur
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
