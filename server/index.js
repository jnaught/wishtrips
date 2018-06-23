// import required packages
require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
// const { scrape } = require("./controllers/web-scraper/scraper");
const { SESSION_SECRET, PORT } = process.env;
const axios = require("axios");

const dbCtrl = require(`${__dirname}/controllers/databaseController`);

const session = require("express-session");

// Define express invoked as "app"
const app = express();

// Define Port from .env
const port = PORT || 3100;

app.use(json());
app.use(cors());

// Create Session with express-session
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// HOSTING
app.use(express.static(`${__dirname}/../build)`));

//Real Database Endpoints
// app.post("/api/userData", dbCtrl.userData);
app.get("/api/getUserTrips/:id", dbCtrl.getUserTrips);
app.post("/api/loginUser", dbCtrl.loginUser);
app.post("/api/sendUserInfo", dbCtrl.sendUserInfo);

//Google Maps Endpoint
app.get("/api/userLocation", dbCtrl.userLocation);

//*****************WEB SCRAPER END POINT*****************//
// app.get("/api/gettravelinfo", scrape);

app.get("/api/test", (req, res) => {
    axios
        .get(
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBpckueoZxbh2f1mLzs_Uk5BzxM2cITWv4&libraries=places"
        )
        .then(response => res.json(response.data))
        .catch(console.log);
});

const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../build/index.html"));
});

app.listen(port, () => {
    console.log(`Magic happens on port ${port}`);
});
