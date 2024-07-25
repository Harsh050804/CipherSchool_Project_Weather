import {convertToFahrenheit} from '../WeatherUtil';


const WeatherSummary = ({currentWeather: {temprarture, weatherCode}, isCelcius}) => {
  return (<div>
    <h1 className = "ui header">
      {isCelcius ? `${temprarture} °C`:`${convertToFahrenheit(temprarture)} °F`} | Sunny</h1>
  </div>)
};

export default WeatherSummary;
