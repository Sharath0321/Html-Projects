const apiKey = 'ec69f82b944f587e06eee6a9a9d0b209';

document.addEventListener('DOMContentLoaded', () => {
    const city = localStorage.getItem('selectedCity');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const weatherDetails = document.getElementById('weather-details');

    if (!city) {
        errorMessage.innerText = "No city selected.";
        errorMessage.style.display = 'block';
        return;
    }

    cityName.innerText = city;
    loading.style.display = 'block';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';

            if (data.cod === '404') {
                errorMessage.style.display = 'block';
                return;
            }

            const temp = data.main.temp;
            const weatherDesc = data.weather[0].description;

            temperature.innerText = `Temperature: ${temp}°C`;
            description.innerText = `Weather: ${weatherDesc}`;
            weatherDetails.style.display = 'block';

            // Optionally create a chart for the city's temperature if you have time series data
            // createTemperatureChart(data); // Implement this function if needed

        })
        .catch(error => {
            loading.style.display = 'none';
            errorMessage.style.display = 'block';
            console.error('Error fetching weather data:', error);
        });
});

function goBack() {
    window.history.back();
}
