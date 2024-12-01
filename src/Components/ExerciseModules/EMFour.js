/*
Question: Create a React application to fetch and display weather information for a given city.

Requirements:
1. The application should:
   - Accept a city name as input from the user.
   - Fetch weather data for the specified city from a simulated API.
   - Display the weather details, including:
     - City name.
     - Temperature.
     - Condition (e.g., Sunny, Cloudy, Rainy).
     - Humidity percentage.
     - Wind speed.

2. Error handling:
   - Show an appropriate error message if the city is not found in the mock API data.

3. Loading state:
   - Display a loading message while fetching weather information.
   - Ensure the UI updates dynamically based on the loading, success, or error states.

4. Display:
   - Provide a clean and user-friendly layout for input, weather details, and error messages.
   - Clear previous weather or error information when fetching new data.
*/

// Simulated API function
import React, { useState } from 'react';

const fetchCityWeather = async (city) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock data for specific cities
        const mockData = {
          london: {
            temperature: 15.5,
            condition: "Cloudy",
            humidity: 80,
            windSpeed: 10
          },
          paris: {
            temperature: 20,
            condition: "Sunny",
            humidity: 60,
            windSpeed: 5
          },
          tokyo: {
            temperature: 22,
            condition: "Rainy",
            humidity: 85,
            windSpeed: 8
          }
        };
  
        // Check if city data exists in mockData
        const data = mockData[city.toLowerCase()];
        if (data) {
          resolve({ city: city.charAt(0).toUpperCase() + city.slice(1), ...data });
        } else {
          reject(new Error("1"));
        }
      }, 3000); // Simulate 1-second delay
    });
};

const EMFour = () =>{

    const [city, setCity] = useState('');
    const [weatherData, setWeatherdata] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading]= useState(false);

    const handleError = (e) => {
        if(e) setError('City Not Found');
        setIsLoading(false);
    };

    const fetchWeather = async () => {
        
        setIsLoading(true); setError(null);
        try {
            let res = await fetchCityWeather(city);
            setWeatherdata(res);
        } catch (e) {
            handleError(e);
        } finally{
            console.log('done');
            setIsLoading(false);
        }
        // console.log('fetching data.....');
        // setError(null);
        // setIsLoading(true);
        // fetchCityWeather(city).then((data) => {
        //     setWeatherdata(data);
        //     setIsLoading(false);
        //     setCity('');
        // }).catch((e) => handleError(e))
    }

    return (
        <div className="container" style={{display:'flex', flexDirection:'column', gap:'30px'}}>
            <div className="location-input-container">
                Enter City: 
                <input onChange={(e) => setCity(e.target.value)} value={city}/>
                <button onClick={fetchWeather}>Fetch Weather</button>
            </div>
            {(weatherData && !isLoading) && <div className="weather-output-container">
                <label>Current weather for {weatherData.city}</label>
                <br></br>
                <br></br>
                <div>Temprature: {weatherData.temperature}</div>
                <div>Condition: {weatherData.condition}</div>
                <div>Humidity:{weatherData.humidity}</div>
                <div>WindSpeed: {weatherData.windSpeed}</div>
            </div>}
            {isLoading && <label>fetching weather info, please wait....</label>}
            {error!==null && <label>Error: {error}</label>}
        </div>
    )
}
export default EMFour;