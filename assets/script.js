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