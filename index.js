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

// Route /api et /api/ → date actuelle “figée” pour FCC
app.get(["/api", "/api/"], (req, res) => {
  const now = new Date();
  
  // On arrondit à la seconde pour éviter les décalages
  const unix = Math.floor(now.getTime() / 1000) * 1000;
  const utc = new Date(unix).toUTCString();

  res.json({
    unix,
    utc
  });
});

// Route /api/:date? → timestamp ou date string
app.get("/api/:date?", (req, res) => {
  const dateInput = req.params.date;
  let date;

  if (!dateInput) {
    date = new Date();
  } else if (/^\d+$/.test(dateInput)) {
    date = new Date(parseInt(dateInput));
  } else {
    date = new Date(dateInput);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Arrondir à la seconde
  const unix = Math.floor(date.getTime() / 1000) * 1000;
  const utc = new Date(unix).toUTCString();

  res.json({
    unix,
    utc
  });
});

// Serveur
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
