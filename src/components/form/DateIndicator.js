import { useState, useEffect } from 'react';
import DateElement from './DateElement';

import classes from './DateIndicator.module.css';


const DateIndicator = (props)=>{

    const [numberArray, setNumberArray] = useState([]);

    useEffect(()=>{
        let tmpNum = [];
        
        let monthDays = new Date(props.year, props.month+1, 0).getDate();
        for(let i=1; i<=monthDays; i++) {
            tmpNum.push(i);
        }

        setNumberArray(tmpNum);
    }, [props.month, props.year]);

    const returnAdjacentDates = ()=>{
        if(props.date===1) {
            return({
                prev: '',
                next: props.date+1
            });
        } else {
            if(props.date===numberArray.length) {
                return({
                    prev: props.date-1,
                    next: ''
                });
            } else {
                return({
                    prev: props.date-1,
                    next: props.date+1
                });
            }
        }
    };

    const returnAdjacentMonths = ()=>{
        if(props.month===0) {
            return({
                prev: '',
                next: props.month+1
            });
        } else {
            if(props.month===11) {
                return({
                    prev: props.month-1,
                    next: ''
                });
            } else {
                return({
                    prev: props.month-1,
                    next: props.month+1
                });
            }
        }
    };

    const returnAdjacentYears = ()=>{
        return({
            prev: props.year-1,
            next: props.year+1
        })
    }


    return(
        <div className={classes.frame} >
            <DateElement
                prev={returnAdjacentDates().prev}
                value={props.date}
                next={returnAdjacentDates().next}
                onClick={props.onDateChange}
                type='date'
                limit={[1, numberArray.length]}
            />
            <DateElement
                prev={returnAdjacentMonths().prev}
                value={props.month}
                next={returnAdjacentMonths().next}
                onClick={props.onMonthChange}
                type='month'
                limit={['', '']}
            />
            <DateElement
                prev={returnAdjacentYears().prev}
                value={props.year}
                next={returnAdjacentYears().next}
                onClick={props.onYearChange}
                type='year'
                limit={[0, 9999]}
            />
        </div>
    );

};

export default DateIndicator;