const garden = document.getElementById('garden');
const plantSeedButton = document.getElementById('plant-seed');
const plantInfo = document.getElementById('info-content');
const weatherInfo = document.getElementById('weather-info');

const apiKey = '1a8db1fa87e9b85258184e8065cb9e5c';


const plants = [
    {
        name: 'Sunflower',
        growthStages: ['🌱', '🌿', '🌼'],
        care: 'Water daily and provide plenty of sunlight.'
    },
    {
        name: 'Tomato',
        growthStages: ['🌱', '🍃', '🍅'],
        care: 'Water every other day and provide moderate sunlight.'
    },
    {
        name: 'Cactus',
        growthStages: ['🌵', '🌵', '🌵'],
        care: 'Water once a week and provide plenty of sunlight.'
    }
];

let plantCount = 0;
let currentWeather = 'sunny'; // Default weather

// Fetch real-time weather data
function fetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    currentWeather = data.weather[0].main.toLowerCase();
                    weatherInfo.textContent = `Current weather: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`;
                })
                .catch(error => {
                    console.error('Error fetching weather:', error);
                    weatherInfo.textContent = 'Error fetching weather data.';
                });
        }, error => {
            console.error('Geolocation error:', error);
            useSimulatedWeather();
        });
    } else {
        weatherInfo.textContent = 'Geolocation is not supported by this browser.';
        useSimulatedWeather();
    }
}

function useSimulatedWeather() {
    const simulatedWeatherConditions = ['sunny', 'rain', 'cloudy', 'storm'];
    currentWeather = simulatedWeatherConditions[Math.floor(Math.random() * simulatedWeatherConditions.length)];
    weatherInfo.textContent = `Simulated weather: ${currentWeather}`;
}

fetchWeather();


plantSeedButton.addEventListener('click', () => {
    if (plantCount < 10) {
        plantCount++;
        plantSeed();
    } else {
        alert('Your garden is full!');
    }
});

function plantSeed() {
    const plantType = plants[Math.floor(Math.random() * plants.length)];
    const plantElement = document.createElement('div');
    plantElement.classList.add('plant');
    plantElement.textContent = plantType.growthStages[0];
    plantElement.style.left = `${Math.random() * 80}%`;
    plantElement.style.top = `${Math.random() * 80}%`;

    garden.appendChild(plantElement);
    growPlant(plantElement, plantType);

    plantElement.addEventListener('click', () => {
        showPlantInfo(plantType);
    });
}

function growPlant(element, plantType) {
    let stage = 0;
    const interval = setInterval(() => {
        stage++;
        if (stage >= plantType.growthStages.length) {
            clearInterval(interval);
        } else {
            element.textContent = plantType.growthStages[stage];
        }
    }, 3000);
}

function shouldPlantGrow() {
    if (currentWeather === 'rain' && Math.random() > 0.7) {
        return false; // 30% chance that rain stunts growth
    }
    if (currentWeather === 'sunny' && Math.random() > 0.9) {
        return true; // 10% chance that sunny helps growth
    }
    return true;
}

function showPlantInfo(plantType) {
    plantInfo.innerHTML = `
        <h3>${plantType.name}</h3>
        <p><strong>Care Instructions:</strong> ${plantType.care}</p>
    `;
}
