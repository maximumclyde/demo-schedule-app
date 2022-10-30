import { useState, useEffect, Fragment } from 'react';
import DateIndicator from './DateIndicator';

import classes from './DateTimeInput.module.css';

const DateTimeInput = (props)=>{

    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [showIndicator, setShowIndicator] = useState(false);


    /**
     * THIS IS AN EFFECT USED WHEN ONLY WHEN THE PROPS CHANGE
     */
    useEffect(()=>{
        setDate(props.date);
        setMonth(props.month);
        setYear(props.year);
        setHours(props.time.split(':')[0]);
        setMinutes(props.time.split(':')[1]);
    }, [props.date, props.month, props.time, props.year]);

    const dateChangeHandler = (valueObj)=>{
        let tmpTime = `${valueObj.hours}:${valueObj.minutes}`;
        props.onChangeDate({
            date: {
                date: valueObj.date,
                month: valueObj.month,
                year: valueObj.year
            },
            time: tmpTime
        }, props.start);
    };

    const toggleDateChanger = ()=>{
        setShowIndicator((prev)=>{return !prev});
    };

    const changeDate = (value)=>{
        setDate(parseInt(value));
        dateChangeHandler({
            date: parseInt(value),
            month: month,
            year: year,
            hours: hours,
            minutes: minutes
        });
    }
    const changeMonth = (value)=>{
        setMonth(parseInt(value));
        dateChangeHandler({
            date: date,
            month: parseInt(value),
            year: year,
            hours: hours,
            minutes: minutes
        });
    }
    const changeYear = (value)=>{
        setYear(parseInt(value));
        dateChangeHandler({
            date: date,
            month: month,
            year: parseInt(value),
            hours: hours,
            minutes: minutes
        });
    };

    const hourChangeHandler = (event)=>{
        let tmp = event.target.value;
        if(tmp === '') {
            setHours('00');
        } else {
            if(parseInt(tmp) < 10) {
                setHours('0'+tmp);
            } else {
                setHours(tmp);
            }
        }
        dateChangeHandler({
            date: date,
            month: month,
            year: year,
            hours: tmp,
            minutes: minutes
        });
    }
    const minuteChangeHandler=(event)=>{
        let tmp = event.target.value;
        if(tmp === '') {
            setMinutes('00');
        } else {
            if(parseInt(tmp) < 10) {
                setMinutes('0'+tmp);
            } else {
                setMinutes(tmp);
            }
        }
        dateChangeHandler({
            date: date,
            month: month,
            year: year,
            hours: hours,
            minutes: tmp
        });
    }

    return(
        <Fragment>
            <div className={classes.dateTime} onClick={toggleDateChanger} >
                <span>{props.start===true ? 'Start:' : 'End:'}</span>
                <div>
                    <input 
                        type='text' 
                        className={classes.date} 
                        readOnly
                        value={`${date}/${month+1}/${year}`}
                    />
                    <input 
                        type='text'
                        className={classes.time}
                        readOnly
                        value={`${hours}:${minutes}`}
                    />
                </div>
            </div>

            {showIndicator===true ? 
            <div className={classes.frame} >
                <DateIndicator
                    date={date}
                    month={month}
                    year={year}
                    onDateChange={changeDate}
                    onMonthChange={changeMonth}
                    onYearChange={changeYear}
                />
                <div className={classes.timeFrame} >
                    <input 
                        type='number'
                        name='startHour'
                        className={classes.timeInput}
                        onChange={hourChangeHandler}
                        onBlur={hourChangeHandler}
                        max={23}
                        min={0}
                    />
                    <span>:</span>
                    <input 
                        type='number'
                        name='startMinute'
                        className={classes.timeInput}
                        onChange={minuteChangeHandler}
                        onBlur={minuteChangeHandler}
                        max={59}
                        min={0}
                    />
                </div>
            </div> : ''}
        </Fragment>
    );

};

export default DateTimeInput;