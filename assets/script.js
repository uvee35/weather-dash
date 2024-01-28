// API key 
var myApiKey = "57343ed715e45df35cda2f1c919f719d";

// DOM Elements
var searchForm = document.querySelector("#city-search-form");
var searchInput = document.querySelector("#city-input");
var searchButton = document.querySelector("#city-search-button");
var currentWeatherContainer = document.querySelector("#current-weather");
var weatherForecastContainer = document.querySelector("#weather-forecast");
var searchHistoryContainer = document.querySelector("#search-history");

// Search history array
var searchHistory = [];

// Event listeners
searchForm.addEventListener("submit", handleSearchFormSubmit);
searchButton.addEventListener("click", handleSearchFormSubmit);
