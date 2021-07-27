// api key: b56c8ec1ddbf5b6f85dc1d09a5204f93 - one call API for OpenWeatherMap
// google maps geocoding api key: AIzaSyAHUffAa7_yU5X8c9jiSKHGraqyvWQjaGQ

// declare variables to use in the urls
const apiKeyWeather = 'b56c8ec1ddbf5b6f85dc1d09a5204f93';
const apiKeyGeo = 'AIzaSyAHUffAa7_yU5X8c9jiSKHGraqyvWQjaGQ';

// empty array for recent searches
let recentSearches = [];

let city = document.getElementById("city-search").value;

function getWeather() {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKeyWeather}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // and now we begin the spam of variables and document.getElementById, gosh this part took far too long

        let currentTemp = data.current.temp;
        let currentWind = data.current.wind_speed;
        let currentHumidity = data.current.humidity;
        let currentUltra = data.current.uvi;
        let currentIcon = data.current.weather[0].icon;

        document.getElementById("icon-weather").setAttribute('src', `http://openweathermap.org/img/wn/${currentIcon}.png`);
        document.getElementById("temp-current").innerText = `Temperature: ${currentTemp}`;
        document.getElementById("wind-current").innerText = `Wind Speed: ${currentWind}`;
        document.getElementById("humid-current").innerText = `Humidity: ${currentHumidity}`;
        document.getElementById("uvi-current").innerText = `UVI: ${currentUltra}`;

        let day1El = document.getElementById("day-1");
        let day2El = document.getElementById("day-2");
        let day3El = document.getElementById("day-3");
        let day4El = document.getElementById("day-4");
        let day5El = document.getElementById("day-5");

        let day1ImgEl = document.getElementById("day-1-img");
        let day2ImgEl = document.getElementById("day-2-img");
        let day3ImgEl = document.getElementById("day-3-img");
        let day4ImgEl = document.getElementById("day-4-img");
        let day5ImgEl = document.getElementById("day-5-img");

        let day1Img = data.daily[0].weather[0].icon;
        let day2Img = data.daily[1].weather[0].icon;
        let day3Img = data.daily[2].weather[0].icon;
        let day4Img = data.daily[3].weather[0].icon;
        let day5Img = data.daily[4].weather[0].icon;

        let day1TextEl = document.querySelector(".day-1-text");
        let day2TextEl = document.querySelector(".day-2-text");
        let day3TextEl = document.querySelector(".day-3-text");
        let day4TextEl = document.querySelector(".day-4-text");
        let day5TextEl = document.querySelector(".day-5-text");

        let day1Text = `Temperature: ${data.daily[0].temp.day} °F
        Wind: ${data.daily[0].wind_speed} MPH
        Humidity: ${data.daily[0].humidity} %`

        let day2Text = `Temperature: ${data.daily[1].temp.day} °F
        Wind: ${data.daily[1].wind_speed} MPH
        Humidity: ${data.daily[1].humidity} %`

        let day3Text = `Temperature: ${data.daily[2].temp.day} °F
        Wind: ${data.daily[2].wind_speed} MPH
        Humidity: ${data.daily[2].humidity} %`

        let day4Text = `Temperature: ${data.daily[3].temp.day} °F
        Wind: ${data.daily[3].wind_speed} MPH
        Humidity: ${data.daily[3].humidity} %`

        let day5Text = `Temperature: ${data.daily[4].temp.day} °F
        Wind: ${data.daily[4].wind_speed} MPH
        Humidity: ${data.daily[4].humidity} %`

        day1TextEl.innerText = day1Text;
        day2TextEl.innerText = day2Text;
        day3TextEl.innerText = day3Text;
        day4TextEl.innerText = day4Text;
        day5TextEl.innerText = day5Text;

        day1ImgEl.setAttribute("src", `http://openweathermap.org/img/wn/${day1Img}.png`);
        day2ImgEl.setAttribute("src", `http://openweathermap.org/img/wn/${day2Img}.png`);
        day3ImgEl.setAttribute("src", `http://openweathermap.org/img/wn/${day3Img}.png`);
        day4ImgEl.setAttribute("src", `http://openweathermap.org/img/wn/${day4Img}.png`);
        day5ImgEl.setAttribute("src", `http://openweathermap.org/img/wn/${day5Img}.png`);

        day1El.appendChild(day1ImgEl);
        day2El.appendChild(day2ImgEl);
        day3El.appendChild(day3ImgEl);
        day4El.appendChild(day4ImgEl);
        day5El.appendChild(day5ImgEl);

    });
});
};

const displayCityTitle = () => {
    
    document.getElementById("search-btn").addEventListener("click", function() {
        var cityTitleEl = document.getElementById("city-date");
        var date = new Date().toDateString();
        getWeather(city);
        cityTitleEl.innerText = '';
        cityTitleEl.innerText = city + ' ' + date;

        let recentSearchesEl = document.getElementById("recent-container");

        let newRecent = document.createElement("div");

        localStorage.setItem('searches', JSON.stringify(recentSearches.push(city)));
        const data = JSON.parse(localStorage.getItem('searches'));

        recentSearchesEl.appendChild(newRecent);

        newRecent.innerText = JSON.stringify(data);

        console.log(data);

    });
    
};

// save data to local storage


// function call for search button
displayCityTitle();