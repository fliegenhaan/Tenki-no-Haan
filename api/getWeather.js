export default async function handler(req, res) {
    const apiKey = process.env.WEATHER_API_KEY;
    const city = req.query.city;
    
    if (!city) {
        res.status(400).json({ error: 'City not provided' });
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();

        res.status(200).json({
            currentWeather: currentWeatherData,
            forecast: forecastData
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}
