import { useMediaQuery } from '@mui/material';
import classes from './CalendarDate.module.css';

const eventTypes = {
    'EVENT': `${classes.eventBg}`,
    'LECTURE': `${classes.lectureBg}`,
    'MEETING': `${classes.meetingBg}`,
    'BIRTHDAY': `${classes.birthdayBg}`,
};

const CalendarDate = (props)=>{

    const mediaQuery = useMediaQuery('(min-width:961px)');

    const types = props.eventTypes;
    let trCounter = 0; let index = 0;

    let titles=[];

    //FUNCTION THAT PUTS EVENTS INTO DATES
    props.eventIds.forEach(id => {
        if(trCounter === 4){
            return;
        }

        titles.push(
            <tr className={classes.row} key={Math.random()} >
                <td 
                    key={id} 
                    className={`${eventTypes[types[index]]}`}
                >
                    <span>
                        {props.eventTitles[index]}
                    </span>
                </td>
            </tr>
        );
        trCounter++; index++;
    });
    
    //FUNCTION THAT FILLS THE DATE UI WITH WHITE SPACES
    for(let i=3; i>=trCounter; i--) {
        titles.push(
            <tr className={classes.row} key={Math.random()} >
                <td key={Math.random()}></td>
            </tr>
        );
    }

    //CONDITIONAL CLASSES
    const numClasses = `${props.thisMonth ? 
        classes.dateNumber : 
        classes.dateNumberOtherM
    }`;

    const todayFrame = `${props.isToday ?
        classes.dateNumberToday :
        ''
    }`;

    let reducedCalendarRow = [
        titles[0],
        titles[1]
    ];
    let cter = 4;
    if(mediaQuery) {
        cter = 4; 
    }else {
        cter = 2;
    }

    const clickHandler = ()=>{
        props.onClick([props.eventIds, [props.date, props.month]]);
    };

    return (
        <div className={`${classes.dateFrame} ${todayFrame}`} onClick={clickHandler} >
            <div className={`${numClasses} ${props.eventIds.length>cter ? classes.moreEvents : ''}`}>
                {props.date}
            </div>
            <table>
                <tbody className={classes.tableBody} >
                    {mediaQuery === true ? titles : reducedCalendarRow}
                </tbody>
            </table>
        </div>
    );

};

export default CalendarDate;