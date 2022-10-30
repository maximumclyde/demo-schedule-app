import { useState, useEffect } from 'react';
import * as WeatherIcons from 'react-icons/wi';
import { TbMapPinOff } from 'react-icons/tb';

import useGetCoords from '../../hooks/useGetCoords';

import classes from './NavWeather.module.css';

const NavWeather = ()=>{
    
    const [weatherIcon, setWeatherIcon] = useState(<TbMapPinOff />);
    const [temperature, setTemperature] = useState();

    const locationObject = useGetCoords();

    useEffect(() => {
        if(!locationObject.permission) {
            return;
        }

        async function fetchData(){
            try {
                let latitude = locationObject.latitude;
                let longitude = locationObject.longitude;
                let requestAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0184cbb327c7dc1343ef0ebd2d39b287&units=metric`;

                const response = await fetch(requestAddress);
                const data = await response.json();

                let i = data.weather[0].icon;
                setTemperature(data.main.temp);

                switch (i) {
                    case '01d' :
                        setWeatherIcon(<WeatherIcons.WiDaySunny />);
                        break;
                    case '01n' :
                        setWeatherIcon(<WeatherIcons.WiMoonAltWaningCrescent2 />);
                        break;
                    case '02d' :
                        setWeatherIcon(<WeatherIcons.WiDayCloudy />);
                        break;
                    case '02n' :
                        setWeatherIcon(<WeatherIcons.WiNightAltCloudy />);
                        break;
                    case '03d' || '03n' :
                        setWeatherIcon(<WeatherIcons.WiCloud />);
                        break;
                    case '04d' || '04n' :
                        setWeatherIcon(<WeatherIcons.WiCloudy />);
                        break;
                    case '09d' :
                        setWeatherIcon(<WeatherIcons.WiDayShowers />);
                        break;
                    case '09n' :
                        setWeatherIcon(<WeatherIcons.WiNightShowers />);
                        break;
                    case '10d' :
                        setWeatherIcon(<WeatherIcons.WiDayRain />);
                        break;
                    case '10n' :
                        setWeatherIcon(<WeatherIcons.WiNightRain />);
                        break;
                    case '11d' || '11n' :
                        setWeatherIcon(<WeatherIcons.WiThunderstorm />);
                        break;
                    case '13d' || '13n' :
                        setWeatherIcon(<WeatherIcons.WiSnowflakeCold />);
                        break;
                    case '50d' || '50n' :
                        setWeatherIcon(<WeatherIcons.WiFog />);
                        break;
                    default:
                        setWeatherIcon(<TbMapPinOff />);
                }

            } catch(err) {
                console.log(err);
            }
        }

        fetchData();

    }, [locationObject.latitude, locationObject.longitude, locationObject.permission]);


    return (
        <div className={classes.wi}>
            {weatherIcon}
            {temperature === undefined ? 
                <span></span> : 
                <span>{`${temperature}`}&#176;C</span>
            }
        </div>
    );
};

export default NavWeather;