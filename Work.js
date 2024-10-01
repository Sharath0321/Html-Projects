const apiKey = 'ec69f82b944f587e06eee6a9a9d0b209';

async function getWeather() {
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

    try {
        const response = await fetch(url);
        const data = await response.json();

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

        // Update charts for the specified Indian cities
        updateTemperatureCharts();

    } catch (error) {
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
        console.error('Error fetching weather data:', error);
    }
}

async function updateTemperatureCharts() {
    const cities = ["Bangalore", "Mumbai", "Chennai", "Kolkata"]; // Specific Indian cities
    const temperatureData = {};

    for (const city of cities) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            console.error(`Error fetching data for ${city}:`, data.message);
            continue;
        }

        const temp = data.main.temp;
        temperatureData[city] = temp;
    }

    // Create charts
    const labels = Object.keys(temperatureData);
    const temperatures = Object.values(temperatureData);

    createChart('chartBangalore', labels, temperatures);
    createChart('chartMumbai', labels, temperatures);
    createChart('chartChennai', labels, temperatures);
    createChart('chartKolkata', labels, temperatures);
}

function createChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: data,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}
