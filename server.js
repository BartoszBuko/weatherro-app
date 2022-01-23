const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const defaultJson = '{ "cod": "404", "message": "city not found" }';

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.post("/weather", (req, res) => {
  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;

  request(url, (error, response, body) => {
    weatherJson = JSON.parse(body || defaultJson);

    if (weatherJson.cod == "404" || req.body.city == "undefined") {
      res.redirect("/error");
    } else {
      const weather = {
        city: weatherJson.name.charAt(0).toUpperCase() + city.slice(1),
        temperature: Math.round(weatherJson.main.temp),
        main: weatherJson.weather[0].main,
        wind: Math.round(weatherJson?.wind.speed * 3.6),
        icon: weatherJson.weather[0].icon,
        humidity: weatherJson.main.humidity,
      };

      const weatherData = { weather };

      res.render("weather", weatherData);
    }
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Invalid adress, check your spelling");
});

app.listen(process.env.PORT || 3000);
