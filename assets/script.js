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

