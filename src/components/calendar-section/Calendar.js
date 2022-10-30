import { useMediaQuery } from '@mui/material';

import DateSection from './DateSection';
import DateButtons from '../nav-bar/DateButtons';

import classes from './Calendar.module.css';

const Calendar = ()=>{
    const mediaQuery = useMediaQuery('(min-width: 961px');

    return (
        <div className={classes.mainFrame} >
            {mediaQuery ? '' : <DateButtons />}
            <div className={classes.weekDays} >
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
            <DateSection />
        </div>
    );
};

export default Calendar;
