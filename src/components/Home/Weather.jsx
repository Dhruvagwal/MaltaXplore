import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forecast";
import ReactAnimatedWeather from "react-animated-weather";
const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  };

  componentDidMount() {
    this.getWeather(35.9375, 14.3754);
    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();

    const oneCallApi = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=80b8bc51de824911bc295834250301&q=${lat},${lon}&hours=48`
    );
    const oneCallData = await oneCallApi.json();
    
    const timezoneOffset = oneCallData.location.tz_id;

    const currentTime = new Date().toLocaleString("en-US", { timeZone: timezoneOffset });
    const currentHour = new Date(currentTime).getHours(); 
  
    const hourlyData = oneCallData.forecast.forecastday[0].hour;
      
    const nextFourHoursData = hourlyData.filter((hour) => {
      const hourTime = new Date(hour.time).getHours();
      return hourTime >= currentHour && hourTime < currentHour + 4;
    });
  
  
    const nextFourHoursTemp = nextFourHoursData.map((hour) => {
      const date = new Date(hour.time);
      
      let hour12 = date.getHours();
      const minutes = date.getMinutes();
      
      const ampm = hour12 >= 12 ? 'PM' : 'AM';
      
      hour12 = hour12 % 12;
      hour12 = hour12 ? hour12 : 12; 
      
      const formattedTime = `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    
      return {
        time: formattedTime, 
        temperature: Math.round(hour.temp_c), 
        conditionIcon: hour.condition.icon,
      };
    });  
  
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
      hourlyWeather: nextFourHoursTemp,
      // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),

      // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
    });
    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };

  render() {
    return (
      <div className="lg:relative bg-red-100 rounded-[3rem] lg:w-[32vw] h-full p-4 max-lg:space-y-8">
        <div className="bg-red-400 items-center text-white flex justify-between p-4 rounded-2xl">
          <span className="text-sm md:text-xl">
            {this.state.city}, {this.state.country}
          </span>
          <div className="text-sm md:text-xl">{dateBuilder(new Date())}</div>
        </div>
        <Forcast data={this.state} />
        {/* <div className="bg-gradient-to-r from-black to-green-800 h-[30vh] rounded-3xl mt-[-1rem] text-white p-4">
          Today
        </div> */}
        <div className="bg-gradient-to-r from-black to-green-800 h-[26vh] rounded-3xl text-white p-4">
          <h2 className="text-xl font-md pl-4">Today</h2>
          <div className="grid grid-cols-4">
            {this.state.hourlyWeather?.map((hour, index) => (
              <div key={index} className="flex flex-col items-center gap-2 py-8 lg:py-4">
                <p className="text-xs md:text-base font-thin">{hour.time}</p>
                <img src={`https:${hour.conditionIcon}`} alt="" className="w-10 h-10"/>
                <p className="text-sm md:text-lg">{Math.round(hour.temperature)}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
