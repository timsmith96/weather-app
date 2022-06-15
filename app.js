const API_KEY = 'bd2ab4170f665942e892370209a70ce8';
const form = document.querySelector('#weather-form');
const input = document.querySelector('#weather-input');
const container = document.querySelector('#results-container');

async function getLocation(location) {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
  );
  const locationData = await response.json();
  const longitude = locationData[0].lon;
  const latitude = locationData[0].lat;
  return [longitude, latitude];
}

async function getWeather(location) {
  let coordinates = await getLocation(location);
  let longitude = coordinates[0];
  let latitude = coordinates[1];
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData.main;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  container.innerHTML = '';

  const data = await getWeather(input.value);
  console.log(data);

  const location = document.createElement('h2');
  location.textContent = input.value.toUpperCase();
  container.appendChild(location);

  const temperature = document.createElement('p');
  temperature.innerHTML = 'Temperature: ' + data.temp + '&deg;C';
  container.appendChild(temperature);

  const minTemp = document.createElement('p');
  minTemp.innerHTML = 'Minimum temperature: ' + data.temp_min + '&deg;C';
  container.appendChild(minTemp);

  const maxTemp = document.createElement('p');
  maxTemp.innerHTML = 'Maximum temperature: ' + data.temp_max + '&deg;C';
  container.appendChild(maxTemp);

  const humidity = document.createElement('p');
  humidity.innerHTML = 'Humidity: ' + data.humidity + '%';
  container.appendChild(humidity);

  container.style.display = 'flex';
});
