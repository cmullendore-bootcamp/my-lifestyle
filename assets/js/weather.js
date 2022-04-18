var urlId = "bb2c88d223252f9cbf3c41f7d0c2aa16"
var testLocation = "Flushing";
var currentweatherDayEl = document.querySelector("#weather-current-day");
var currentWeatherIconEl = document.querySelector("#weather-current-icon");
var currentWeatherConditionEl = document.querySelector("#weather-current-condition");
var currentWeatherTempEl = document.querySelector("#weather-current-temp");
var currentWeatherHumidityEl = document.querySelector("#weather-current-humidity");

// Get user lon and lat
function getUserLocation(location) {
/*     var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=" + urlId;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var locationLat = data[0].lat.toString();
                var locationLon = data[0].lon.toString();

                getUserWeather(locationLat, locationLon);
            })
        } else {
            alert("Location not found.");
        }
    });
*/

    var locationJson = JSON.parse(localStorage.getItem("lifestyle-location"));
    
    getUserWeather(locationJson.geometry.location.lat, locationJson.geometry.location.lng);
};
 
function getUserWeather(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + urlId;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                // Current Weather Icon
                currentWeatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
                // Current conditions
                currentWeatherConditionEl.textContent = data.current.weather[0].main;
                // Current Temp
                currentWeatherTempEl.textContent = Math.floor(data.current.temp) + " F";
                // Current Humidity
                currentWeatherHumidityEl.textContent = data.current.humidity + " %";
                // Daily Weather
                for (var i = 0; i < 5; i++) {
                    var weatherIconEl = document.querySelector(".img-day-" + i);
                    var weatherTempEl = document.querySelector(".temp-day-" + i);
                    document.getElementById(`day-${i}`).innerText = moment(data.daily[i].dt * 1000).format("ddd");
                    weatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png")
                    weatherTempEl.textContent = Math.floor(data.daily[i].temp.day) + " F";

                }
            });
        } else {
            alert("Unable to get weather");
        }
    });
};

getUserLocation(testLocation);
