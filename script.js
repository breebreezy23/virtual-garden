const garden = document.getElementById('garden');
const plantSeedButton = document.getElementById('plant-seed');
const plantInfo = document.getElementById('info-content');

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

function showPlantInfo(plantType) {
    plantInfo.innerHTML = `
        <h3>${plantType.name}</h3>
        <p><strong>Care Instructions:</strong> ${plantType.care}</p>
    `;
}
