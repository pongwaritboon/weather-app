import logo from './logo.svg';
import React, {useState} from "react"
import './App.css';
import keys from "./key";


const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};
function App() {

  const dateSlice = (d) => {
    let date = String(new window.Date());
    date = date.slice(3,15);
    return date;
  };

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setCity("");
          setWeather(result);
        });
    }
  };
  return (
 
    <div className={typeof weather.main != "undefined"
    ? weather.main.temp > 18
    ?  "App hot" 
     :"App cold"
     : "App"
    }
     >
      <main>

        <div className="search-container">
          <input type="text" placeholder="Search City or Country" className="search-bar"
           onChange={(e) => setCity(e.target.value)} value={city} onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
        <div>
          <div className="location-container">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
            {dateSlice(new Date())}</div>
          </div>
          <div className="weather-container">
            <div className="temperature">
            {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
