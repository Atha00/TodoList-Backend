const express = require("express");
const app = express(); // Initialiser un serveur

const axios = require("axios");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Import de body-parser

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/allocine-API", // process.env.MONGODB_URI ||
  { useNewUrlParser: true }
); // Import de mongoose et connection à une database

// Démarrer le serveur
const port = 3000;
// process.env.PORT ||
app.listen(port, function() {
  console.log("Server started");
});
