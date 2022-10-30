import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

import { dateActions } from '../../store/date-slice';

import classes from './DateButtons.module.css';

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const DateButtons = ()=>{

    const selectedDate = useSelector(state=>state.date);
    const dispatch = useDispatch();

    const decreaseDate = ()=>{
        dispatch(dateActions.decreaseDate());
    }
    const increaseDate = ()=>{
        dispatch(dateActions.increaseDate());
    }

    return(
        <div className={classes.mainFrame} >
            <div className={classes.dateTitle} >
                <span>{`${monthNames[selectedDate.month]} ${selectedDate.year}`}</span>
            </div>
            <div className={classes.buttonFrame} >
                <button onClick={decreaseDate} >
                    <MdOutlineKeyboardArrowLeft />
                </button>
                <button onClick={increaseDate} >
                    <MdOutlineKeyboardArrowRight />
                </button>
            </div>
        </div>
    );

};

export default DateButtons;