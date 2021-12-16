import react from 'react';
import './App.css';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const apiKey = '31e5249b7f5ee68a30375552ce0232f3';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState('');

  const getWeather = event => {
    if (event.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setCity('');
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="container">
        <input
          className="input"
          placeholder="Enter City..."
          onChange={event => setCity(event.target.value)}
          value={city}
          onKeyPress={getWeather}
        ></input>
        {typeof weatherData.main === 'undefined' ? (
          <div>
            <p>Welcome to weather app! Enter in a city to get the weather of.</p>
          </div>
        ) : (
          <div className="weather-data">
            <p className="city">{weatherData.name}</p>
            <p className="temp">{Math.round(weatherData.main.temp)}°F</p>
            <p className="weather">{weatherData.weather[0].main}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
