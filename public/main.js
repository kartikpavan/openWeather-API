const weatherDisplay = document.querySelector(".weather");
const weatherForm = document.querySelector(".weather-form");
const cityInput = document.getElementById("city-input");

//Fetch weather from API
const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3232595214011a9bd13e4e80dd238181`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    alert("City Not found");
    return;
  }
  console.log(data);

  const displayData = {
    city: data.name,
    temp: tempConvert(data.main.temp),
  };
  addWeatherToDom(displayData);
};
//Displaying data to DOM
const addWeatherToDom = (data) => {
  weatherDisplay.innerHTML = `<h1>Weather in <span>${data.city}</span></h1> <h2>${data.temp} &deg;C</h2>`;
  cityInput.value = "";
};
//convert temperature from fahrenheit to celcius
const tempConvert = (temp) => {
  return Math.ceil(temp - 273.15);
};

//event listner for form submission
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cityInput.value === "") {
    alert("Please Enter City");
  } else {
    fetchWeather(cityInput.value);
  }
});

//initial fetch
fetchWeather("delhi");
