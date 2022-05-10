import { useEffect, useState } from 'react';
import weatherService from '../service/api'

import './style.css'

const Weather = () => {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Yangon');
  const [state, setState] = useState('Yangon');
  const [error, setError] = useState(null)


  // get weather data from api
  useEffect(() => {
    weatherService
      .getWeather(state)
      .then(result => setApiData(result))
      .catch(err => {
        // if search city is invalid show error message
        setError(`Invalid City or Country name`)
        setTimeout(() => {
          setError(null)
        }, 4000)
      })
  }, [state]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  // change temperature to Farenheit
  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="home-main">
      <header className="d-flex justify-content-center align-items-center">
        <h2>Weather App</h2>
      </header>
      <div className="container search-form-main">
        {error && <p className='error-msg'>{error}</p>}
        <div className=" search-form">
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
              placeholder="Search City"
            />
          </div>
          <button className="btn mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="card data-field mt-3 mx-auto" style={{ width: '60vw' }}>
          {apiData.main ? (
            <div className="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />
              {kelvinToFarenheit(apiData.main.temp)}&deg; C

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    🌡️
                    {' '}
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                    </strong>
                  </p>
                  <p>
                    🍃
                    {' '}
                    <strong>
                      {apiData.wind.deg}&deg; C
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    ⛅
                    {' '}
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-map-marker-alt"></i>
                      {' '}
                      {apiData.name}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather