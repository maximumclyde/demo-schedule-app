import { useState, useEffect } from 'react';
import {
    WiDaySunny,
    WiMoonAltWaningCrescent2,
    WiDayCloudy,
    WiNightAltCloudy,
    WiCloud,
    WiCloudy,
    WiDayShowers,
    WiNightShowers,
    WiDayRain,
    WiNightRain,
    WiThunderstorm,
    WiSnowflakeCold,
    WiFog
} from 'react-icons/wi';
import { TbMapPinOff } from 'react-icons/tb';

import useGetCoords from '../../hooks/useGetCoords';

import classes from './NavWeather.module.css';

const NavWeather = ()=>{
    
    const [weatherIcon, setWeatherIcon] = useState(<TbMapPinOff />);
    const [temperature, setTemperature] = useState();

    const locationObject = useGetCoords();

    useEffect(() => {
        if(!locationObject.permission) {
            // setWeatherIcon(<TbMapPinOff />);
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

                if (i === '01d') {
                    setWeatherIcon(<WiDaySunny />);
                }
                    
                else if (i === '01n') {
                    setWeatherIcon(<WiMoonAltWaningCrescent2 />);
                }
                    
                else if (i === '02d') {
                    setWeatherIcon(<WiDayCloudy />);
                }
                    
                else if (i === '02n') {
                    setWeatherIcon(<WiNightAltCloudy />);
                }
                    
                else if(i === '03d' || i === '03n') {
                    setWeatherIcon(<WiCloud />);
                }
                    
                else if(i === '04d' || i === '04n') {
                    setWeatherIcon(<WiCloudy />);
                }
                    
                else if (i === '09d') {
                    setWeatherIcon(<WiDayShowers />);
                }
                    
                else if (i === '09n') {
                    setWeatherIcon(<WiNightShowers />);
                }
                    
                else if (i === '10d') {
                    setWeatherIcon(<WiDayRain />);
                }
                    
                else if (i === '10n') {
                    setWeatherIcon(<WiNightRain />);
                }
                    
                else if(i === '11d' || i === '11n') {
                    setWeatherIcon(<WiThunderstorm />);
                }
                    
                else if(i === '13d' || i === '13n') {
                    setWeatherIcon(<WiSnowflakeCold />);
                }
                    
                else if(i === '50d' || i === '50n') {
                    setWeatherIcon(<WiFog />);
                }
                    
                else
                    setWeatherIcon(<TbMapPinOff />);

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