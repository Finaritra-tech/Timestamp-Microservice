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

// Route /api/ → idem /api pour éviter tout échec FCC
app.get("/api/", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Route /api/:date → date timestamp ou date string
app.get("/api/:date", (req, res) => {
  const dateInput = req.params.date;
  let date;

  // Paramètre vide → date actuelle
  if (!dateInput) {
    date = new Date();
  } 
  // Timestamp numérique
  else if (/^\d+$/.test(dateInput)) {
    date = new Date(parseInt(dateInput));
  } 
  // Date string classique
  else {
    date = new Date(dateInput);
  }

  // Vérification date valide
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Réponse JSON
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Serveur
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
