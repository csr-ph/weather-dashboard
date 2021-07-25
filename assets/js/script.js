// api key: b56c8ec1ddbf5b6f85dc1d09a5204f93 - one call API for OpenWeatherMap
// api url: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={apiKey}
// google maps geocoding api key: AIzaSyAHUffAa7_yU5X8c9jiSKHGraqyvWQjaGQ

// declare variables to use in the urls
const apiKeyWeather = 'b56c8ec1ddbf5b6f85dc1d09a5204f93';
const apiKeyGeo = 'AIzaSyAHUffAa7_yU5X8c9jiSKHGraqyvWQjaGQ';

let city = document.getElementById("city-search").value;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKeyWeather}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let currentTemp = data.current.temp;
        let currentWind = data.current.wind_speed;
        let currentHumidity = data.current.humidity;
        let currentUltra = data.current.uvi;

        document.getElementById("temp-current").innerText = `Temperature: ${currentTemp}`;
        document.getElementById("wind-current").innerText = `Wind Speed: ${currentWind}`;
        document.getElementById("humid-current").innerText = `Humidity: ${currentHumidity}`;
        document.getElementById("uvi-current").innerText = `UVI: ${currentUltra}`;
    });
});


const displayCityTitle = () => {
    
    document.getElementById("search-btn").addEventListener("click", function() {
        var cityTitleEl = document.getElementById("city-date");
        var date = new Date().toDateString();
        cityTitleEl.innerText = city + ' ' + date;
    });
}

// save data to local storage
let recentSearches = [];

localStorage.setItem('searches', JSON.stringify(recentSearches.push(city)));
const data = JSON.parse(localStorage.getItem('searches'));

console.log(data);



// display local storage data
let recentSearchesEl = document.querySelector(".recent").innerText;



// function call for search button
displayCityTitle();

