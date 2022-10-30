// import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BsList } from 'react-icons/bs';

import NavToday from './NavToday';
import DateButtons from './DateButtons';
import NavWeather from './NavWeather';

import { dateActions } from '../../store/date-slice';

import classes from './NavBar.module.css';

const NavBar = (props)=>{

    // const [timeChange, setTimeChange] = useState(false);

    const dispatch = useDispatch();

    const matches = useMediaQuery('(min-width: 961px)');

    // useEffect(()=>{
    //     const interval = setInterval(()=>{
    //             let tmp = new Date();
    //             if((tmp.getHours()===0 && tmp.getMinutes()===0) || (tmp.getHours()===20 && tmp.getMinutes()===0) || (tmp.getHours()===6 && tmp.getMinutes()===30)) {
    //                 setTimeChange((prevState)=>{
    //                     return !prevState;
    //                 })
    //             }
    //     }, 1000);

    //    return ()=>{
    //      clearInterval(interval);
    //    }
    // }, [timeChange]);

    const setToday = ()=>{
        dispatch(dateActions.setToday());
    }

    return (
        <div className={classes.navContainer}>
            <div className={classes.navStartSection}>
                <div className={classes.optionButton} onClick={props.onClick} >
                    <BsList />
                </div>
                {matches === true ? <span>AppName</span> : ''}
            </div>
            {matches === true ? <DateButtons /> : ''}
            <div className={classes.today} >
                <NavToday onClick={setToday} />
            </div>
            <div className={classes.weather} >
                <NavWeather />
            </div>
        </div>
    );
};

export default NavBar;