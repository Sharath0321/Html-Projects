const apiKey = 'YOUR_API_KEY';

function getWeather() {
    const city = document.getElementById('city').value;
    const weatherCard = document.getElementById('weather-card');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherSection = document.getElementById('weather-section');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    // Clear previous results
    weatherCard.style.display = 'none';
    loading.style.display = 'none';
    errorMessage.style.display = 'none';

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

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
            const cityDisplay = `${data.name}, ${data.sys.country}`;

            cityName.innerText = cityDisplay;
            temperature.innerText = `Temperature: ${temp}°C`;
            description.innerText = `Weather: ${weatherDesc}`;
            weatherCard.style.display = 'block';
        })
        .catch(error => {
            loading.style.display = 'none';
            errorMessage.style.display = 'block';
            console.error('Error fetching weather data:', error);
        });
}
