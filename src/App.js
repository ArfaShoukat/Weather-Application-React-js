
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import weather from "../src/images/weather.png";
import location from "../src/images/location.png";
import "./App.css";

const App = () => {
  const [dark, setMode] = useState(false);
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState();
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  useEffect(() => {
    const savedSearchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(savedSearchHistory);
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8a13df165f9099bdd3008e66764b2a56`;
      try {
        const response = await fetch(url);
        const resJson = await response.json();
        setCity(resJson.main, resJson.weather);

        if (showSearchHistory) {
          // Save search history to local storage
          setSearchHistory((prevHistory) => {
            const newHistory = [search, ...prevHistory];
            localStorage.setItem("searchHistory", JSON.stringify(newHistory));
            return newHistory;
          });
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchApi();
  }, [search, showSearchHistory]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const toggleSearchHistory = () => {
    setShowSearchHistory(!showSearchHistory);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setSearchHistory((prevHistory) => {
          const newHistory = [search, ...prevHistory];
          localStorage.setItem("searchHistory", JSON.stringify(newHistory));
          return newHistory;
        });
      }
    };

    if (showSearchHistory) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSearchHistory, search]);
 
 
  return (
    <Router>
      <div className="container">
        <div className="row align-items-center text-center justify-content-center">
          <div className="col-md-4">
            {showSearchHistory ? (
              <Link to="/">
                <br/><br/>
                <button className="btn-back" onClick={toggleSearchHistory}>
                  Back to Weather
                </button>
                <br/><br/>
              </Link>
            ) : (
              
              <Link to="/search-history" >
                <br/>
                <button id="btn-search1" onClick={toggleSearchHistory}>
                <sapn className='span'>S</sapn>earch <span className="span">H</span>istory
                </button>
              </Link>
            )}

          

            {showSearchHistory ? (
              <div className="search-history-page">
                <h1 className="search-haed"><span className="s1">S</span>earch <span className="s1">H</span>istory</h1>
                <ul>
                  {searchHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={dark ? "darkmode main" : "main"}>
                <div className="col-md-12 switchBtn">
                  <label className="switch">
                    <input type="checkbox" onChange={() => setMode(!dark)} />
                    <span className="slider round"></span>
                  </label>
                </div>

                <form className="d-flex">
                  <input
                    id="search"
                    value={search}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchChange}
                  />
                </form>

                <img
                  className="img_weather img-responsive img-fluid"
                  src={weather}
                  alt="Weather Logo"
                />

                {!city ? (
                  <p>No Data Found</p>
                ) : (
                  <div className="info">
                    <h2>
                      <i className="fas fa-street-view"></i>
                      {search}
                    </h2>
                    <h1>
                      {city.temp}°Cel
                      <img src={location} alt="location" />
                    </h1>

                    <h3>
                      Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel{" "}
                    </h3>

                    <h4>Pressure : {city.pressure}</h4>
                    <h4>Humidity : {city.humidity}</h4>

                    <h4>Feels-Like : {city.feels_like}</h4>

                    <div className="wave one"></div>
                    <div className="wave two"></div>
                    <div className="wave three"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
