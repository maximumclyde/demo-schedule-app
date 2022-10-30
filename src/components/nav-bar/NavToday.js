import { useState, useEffect } from 'react';
// import NavWeather from './NavWeather';

import classes from './NavToday.module.css';

const weekDaysArray = [
    'Sun',
    'Mon',
    'Tue',
    'Wen',
    'Thu',
    'Fri',
    'Sat'
];

const NavToday = (props)=>{

    const [todayDate, setTodayDate] = useState({}); 
    // const [isMidnight, setIsMidnight] = useState(false);

    useEffect(() => {
        let day = new Date();
        setTodayDate({
            date: day.getDate(),
            month: day.getMonth()+1,
            weekDay: weekDaysArray[day.getDay()]
        });
        
        // setInterval(()=>{
        //     let t = new Date();
        //     if(t.getHours() === 0 && t.getMinutes() === 0) {
        //         setIsMidnight((prevState)=>{
        //             return !prevState;
        //         });
        //     }
        // }, 1000);
        
    }, [/**isMidnight */]);

    

    return (
        <div className={classes.date}>
            <span 
                className={classes.today}
                onClick={props.onClick}>
                {`${todayDate.weekDay} ${todayDate.date}/${todayDate.month}`}
            </span>
        </div>
    );
};

export default NavToday;