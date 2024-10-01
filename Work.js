const apiKey = 'ec69f82b944f587e06eee6a9a9d0b209';

function getWeather() {
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weather-info');

    if (!city) {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                weatherInfo.innerHTML = '<p>City not found.</p>';
                return;
            }

            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const cityName = data.name;
            const country = data.sys.country;

            weatherInfo.innerHTML = `
                <p><strong>${cityName}, ${country}</strong></p>
                <p>Temperature: ${temperature}°C</p>
                <p>Weather: ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            weatherInfo.innerHTML = '<p>There was an error retrieving the weather data.</p>';
        });
}
