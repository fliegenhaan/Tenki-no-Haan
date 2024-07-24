function getWeather() {
    const apiKey = '831f61542d1021a2649db61737e74203';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {

            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data: ', error);
            alert('Error fetching current weather data. Please try again.');

        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data: ', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const customMessageDiv = document.getElementById('custom-message');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = <p>${data.message}</p>;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind: ${wind}m/s</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();

        let customMessage = '';
        
        if (description.includes('thunderstorm')) {
            customMessage = "Oh no, looks like I should contact my girlfriend to reschedule our date for another day.";
        } else if (description.includes('rain')) {
            customMessage = "Looks like rain. Maybe I should suggest a cozy indoor date instead and tell her to bring an umbrella!";
        } else if (description.includes('drizzle')) {
            customMessage = "Just a light drizzle. We can still make our date work with an umbrella.";
        } else if (description.includes('clear')) {
            customMessage = "Perfect weather! It's a great day for our date.";
        } else if (description.includes('snow')) {
            customMessage = "It's snowing pretty heavily. Maybe I should plan a winter-themed date another time.";
        } else if (description.includes('clouds')) {
            customMessage = "A bit cloudy today. It might be wise to bring an umbrella, just in case.";
        } else {
            customMessage = "Hmmm, It seems like it's not a good weather for a date.";
        }

        customMessageDiv.innerHTML = <p>${customMessage}</p>;
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHTML;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('show');
}

function getAudio() {
    const playAudioBtn = document.getElementById('play-audio-btn');
    const audioElement = document.getElementById('background-audio');

    if (audioElement.paused) {
        audioElement.play();
        playAudioBtn.textContent = 'Pause';
    } else {
        audioElement.pause();
        playAudioBtn.textContent = 'Play Audio';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.hidden');

    function checkVisibility() {
        const triggerBottom = window.innerHeight * 0.7; 

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
});
