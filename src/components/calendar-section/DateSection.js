import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDates from '../../hooks/useDates';
import { panelActions } from '../../store/panel-slice';
import CalendarDate from './CalendarDate';

import classes from './DateSection.module.css';
import { eventDefine } from './eventDefine';

const DateSection = ()=>{
    const [calendarDates, setCalendarDates] = useState();
    // const [isMidnight, setIsMidnight] = useState();
    
    const events = useSelector(state => state.event);
    const selectedDate = useSelector(state=>state.date);
    
    const dateArray = useDates(selectedDate.month, selectedDate.year);

    const dispatch = useDispatch();

    const dateClick = useCallback((eventsToShow)=>{
        dispatch(panelActions.setDayAcitivies(eventsToShow[0]));
        dispatch(panelActions.setClickedDate(eventsToShow[1]));
    }, [dispatch]);

    useEffect(()=>{
        const d = [];
        let x=-1;

        dateArray.forEach((date)=>{
            let tmp = [];
            let titles = [];
            let types = [];
            events.forEach((event)=>{
                if(eventDefine(event, date.date, date.month, date.year)) {
                    tmp.push(event.id);
                    titles.push(event.title);
                    types.push(event.type);
                }
            });

            d.push(
                <CalendarDate 
                    key={++x}
                    date={date.date}
                    month={date.month}
                    thisMonth={date.isThisMonth}
                    isToday={date.isToday} 
                    eventIds={tmp}
                    eventTitles={titles}
                    eventTypes={types}
                    onClick={dateClick}
                />
            )
        });

        setCalendarDates(d);

    }, [dateArray, events, dateClick, dispatch]);

    // useEffect(()=>{
    //     const interval = setInterval(()=>{
    //         let t = new Date();
    //             if(t.getHours() === 0 && t.getMinutes() === 0) {
    //                 setIsMidnight((prevState)=>{
    //                     return !prevState;
    //                 });
    //             }
    //     }, 1000);
    //
    //      return ()=>{
    //          clearInterval(interval);
    //      }
    //
    // }, [isMidnight]);


    return (
        <div className={classes.mainFrame} >
            {calendarDates}
        </div>
    );

}

export default DateSection;