// API key 
var myApiKey = "57343ed715e45df35cda2f1c919f719d";

// DOM Elements
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");
var currentWeatherContainer = document.querySelector("#today");
var weatherForecastContainer = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");

// Search history array
var searchHistory = [];

// Event listeners
searchForm.addEventListener("submit", handleSearchFormSubmit);
searchButton.addEventListener("click", handleSearchFormSubmit);

// Load search history on page load
loadSearchHistory();

// Handle search form submission
function handleSearchFormSubmit(event) {
    event.preventDefault();
    var city = searchInput.value.trim();
    if (city) {
        searchCity(city);
        searchInput.value = "";
    } else {
        alert("Please enter a city name.");
    }
}

// Search city and retrieve weather data
function searchCity(cityName) {
    fetchCoordinates(cityName);
}

// Fetch coordinates of the city
function fetchCoordinates(city) {
    var coordinatesUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myApiKey}`;
    fetch(coordinatesUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length) {
                fetchWeatherData(data[0].lat, data[0].lon, city);
            } else {
                alert("City not found.");
            }
        })
        .catch(error => alert("Unable to connect to weather service."));
}

// Fetch weather data based on coordinates
function fetchWeatherData(latitude, longitude, cityName) {
    var weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${myApiKey}&units=metric`;
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data, cityName);
            displayWeatherForecast(data);
            updateSearchHistory(cityName);
        })
        .catch(error => alert("Unable to retrieve weather data."));
}

// Display current weather data
function displayCurrentWeather(data, cityName) {
    var currentWeather = data.list[0];
    var weatherIcon = currentWeather.weather[0].icon; // Get the weather icon code
    var weatherDescription = currentWeather.weather[0].description; // Get the weather description
    var temperature = currentWeather.main.temp; // Temperature in Celsius

    var weatherHTML = `
        <h2>Current Weather in ${cityName}</h2>
        <div class="weather-info">
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}">
            <p><strong>Temperature:</strong> ${temperature}°C</p>
        </div>
        <p><strong>Humidity:</strong> ${currentWeather.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${currentWeather.wind.speed} m/s</p>
        <p><strong>Weather Conditions:</strong> ${capitalizeFirstLetter(weatherDescription)}</p>
    `;
    currentWeatherContainer.innerHTML = weatherHTML;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Function to display weather forecast data using Bootstrap cards
function displayWeatherForecast(data) {
    weatherForecastContainer.innerHTML = ''; 

    var forecastHTML = '<div class="card-deck">'; 
    for (var i = 0; i < data.list.length; i += 8) { 
        var dayForecast = data.list[i];
        var date = new Date(dayForecast.dt_txt).toLocaleDateString();
        var temp = dayForecast.main.temp;
        var wind = dayForecast.wind.speed;
        var humidity = dayForecast.main.humidity;
        var weatherIcon = dayForecast.weather[0].icon; 
        var weatherDescription = dayForecast.weather[0].description; 

        // Create card HTML for each forecast day
        forecastHTML += `
            <div class="card text-center bg-light mb-3">
                <div class="card-header">${date}</div>
                <div class="card-body">
                    <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}" class="weather-icon">
                    <h5 class="card-title">${temp} °C</h5>
                    <p class="card-text">Weather: ${capitalizeFirstLetter(weatherDescription)}</p>
                    <p class="card-text">Wind: ${wind} m/s</p>
                    <p class="card-text">Humidity: ${humidity}%</p>
                </div>
            </div>
        `;
    }
    forecastHTML += '</div>'; // Close the card-deck div
    weatherForecastContainer.innerHTML = forecastHTML; // Insert the forecast cards HTML into the forecast container
}

// Update and display search history
function updateSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));
        displaySearchHistory();
    }
}
