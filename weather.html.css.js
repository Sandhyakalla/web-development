<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather api Integration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #2b2b2b;
            color: #fff;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        #weather-container {
            max-width: 400px;
            background-color: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }
        #weather-container:hover {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
        }
        #weather-info {
            margin-top: 20px;
        }
        label {
            color: #fff;
        }
        input, button {
            padding: 10px;
            margin: 5px 0;
        }
        input {
            border: none;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.5);
            color: #2b2b2b;
        }
        button {
            background-color: #000000;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #fff;
            color: #000000;
        }
    </style>
</head>
<body>
    <div id="weather-container">
        <h1>Weather Status</h1>
        <div>
            <label for="city">Enter City:</label>
            <input type="text" id="city" placeholder="City">
            <button onclick="getWeather()">Get Weather</button>
        </div>
        <div id="weather-info"></div>
    </div>

    <script>
        async function getWeather() {
            const apiKey = '74ddba1b48e2ee7dd1e5c6d4110ef11c';
            const city = document.getElementById('city').value;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (response.ok) {
                    displayWeather(data);
                } else {
                    showError(data.message);
                }
            } catch (error) {
                showError('An error occurred while fetching the weather data.');
            }
        }

        function displayWeather(data) {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <h2>Current Weather in ${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp} &#8451;</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        }

        function showError(message) {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
        }
    </script>
</body>
</html>
