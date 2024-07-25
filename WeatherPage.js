import {useEffect, useState} from "react";
import WeatherRow from "../Components/WeatherRow";
import WeatherSummary from "../Components/WeatherSummary";
import getWeather from "../API/WeatherApi";

const fetchCoordinates = (callback) => {
  // Fetch coordinates logic...
  navigator.geolocation.getCurrentPosition(({coords : {latitude, longitude}}) => {
callback(latitude, longitude);
  }, (err) => {
    console.log(err);
  }) 
};
const WeatherPage = () => {
  const [todayWeather, setTodayWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [isCelcius, setIsCelcius] = useState(true);


  const isDay = todayWeather.isDay ?? true;
  useEffect(() => {
fetchCoordinates(async (latitude, longitude)=> {
const WeatherInfo = await getWeather({latitude,longitude});
convertToStateVariable(WeatherInfo);
})
  }, [])
  const convertToStateVariable = (tempWeekWeather) =>{
    let fetchedWeatherInfo = [];
    for(i = 0; i < tempWeekWeather.daily.time.length; i++){
      fetchedWeatherInfo.push({
        date: new Date(tempWeekWeather.daily.time[i]),
        maxtemprature: (tempWeekWeather.daily.temperature_2m_max[i]),
        mintemprature: (tempWeekWeather.daily.temperature_2m_min[i]),
        weathercode: tempWeekWeather.daily.weathercode[i],
        //time: tempWeekWeather.daily.time[i],
      })
    }
    setWeekWeather(fetchedWeatherInfo);
    let currentWeather = tempWeekWeather.current_weather;
    currentWeather.time = new Date(currentweather.time);
    currentWeather.isDay = currentweather.isDay === 1 ? true:false;
    delete currentWeather.isDay;
    currentWeather.weathercode = currentweather.weathercode;
    delete currentWeather.weathercode
    setTodayWeather(currentWeather);
  }
  // Component code...
  return (
    <div className = {isDay ? "app" : "app dark"}>
      <h1 className="my-heading">Weather Page</h1>
      <button
        className="ui icon button"
        onClick={(event) => {
          event.preventDefault();
          setIsCelcius(!isCelcius);
          // Add any additional logic here
        }}
        style = {{float: "right"}}
      >
        {isCelcius ? "°F" : "°C" }
      </button>
      <div>
        <WeatherSummary currentWeather = {todayWeather} isCelcius = {isCelcius}/>
        <table className = {`ui very basic table${!isDay ? "dark" : ""}`} >
       <thead className = {`table-custom${!isDay ? "dark" : ""}`}>
       <tr>
          <th>Date</th>
          <th>Temprature</th>
          <th>Time</th>
        </tr>
       </thead>
       <tbody className = "table-custom">
       <WeatherRow />
       <WeatherRow />
       <WeatherRow />
       <WeatherRow />
       <WeatherRow />
       <WeatherRow />
       <WeatherRow />
       </tbody>
      </table>
      </div>
    </div>
  );
};

export default WeatherPage;

