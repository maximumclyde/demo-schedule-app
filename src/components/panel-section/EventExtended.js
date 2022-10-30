import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eventActions } from '../../store/event-slice';
import { panelActions } from '../../store/panel-slice';

import MeetingInfo from './MeetingInfo';

import { FcClock, FcCalendar } from 'react-icons/fc';
import { MdDelete, MdOutlineClose } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import EventPortal from "../UI/EventPortal";
import Form from '../form/Form';

import classes from './EventExtended.module.css';
import LectureInfo from './LectureInfo';

const repeatVars = {
    'mon': 'monday',
    'tue': 'tuesday',
    'wed': 'wednesday',
    'thu': 'thursday',
    'fri': 'friday',
    'sat': 'saturday',
    'sun': 'sunday',
    'DAY': 'day',
    'WEEK': 'week',
    'MONTH': 'month',
    'YEAR': 'year',
    'NO_REPETITION': 'never'
};

const EventExtended = (props)=>{

    const [showEdit, setShowEdit] = useState(false);
    const dispatch = useDispatch();


    let eventObj = useSelector(state=>state.panel);
    let e = eventObj.eventsToShow.filter(event=>event[0].id === props.id);
    eventObj = e[0][0];


    let desc = eventObj.description;
    if(desc === '') desc = 'No description...';
    let sDate = `${eventObj.startDay.date}/${eventObj.startDay.month + 1}/${eventObj.startDay.year}`;
    let eDate = ` - ${eventObj.endDay.date}/${eventObj.endDay.month + 1}/${eventObj.endDay.year}`

    if(eventObj.type === 'BIRTHDAY') {
        sDate = `${eventObj.startDay.date}/${eventObj.startDay.month + 1}`;
        eDate = '';
    }

    if(eventObj.repetition === 'NO_REPETITION') {
        sDate = `${eventObj.startDay.date}/${eventObj.startDay.month + 1}/${eventObj.startDay.year}`;
        eDate = '';
    }

    const repetitionFrase = ()=>{
        let frase = 'repeats';
        let tmp = '';
        if(eventObj.type === 'BIRTHDAY') {
            return 'repeats every year';
        } else {

            if(eventObj.repetition === 'NO_REPETITION') {
                return 'doesen\'t repeat'
            }

            if(eventObj.duration > 1) {
                frase += ` every ${eventObj.duration} ${repeatVars[eventObj.repetition]}s `
            }else {
                frase += ` every ${repeatVars[eventObj.repetition]} `;
            }

            if(eventObj.break === 0) {
                tmp = 'with no breaks in between';
            } else {
                tmp = `with ${eventObj.break} ${repeatVars[eventObj.repetition]}`;
                if(eventObj.break === 1) {
                    tmp = tmp+' in between';
                } else {
                    tmp = tmp+'s in between'
                }
            }
        }
        return frase+tmp;
    };

    const showEditHandler = ()=>{
        setShowEdit(true);
    };

    const hideEdit = ()=>{
        setShowEdit(false);
        props.onClose();
    };

    const deleteEvent = ()=>{
        dispatch(panelActions.removeEvent(props.id));
        dispatch(eventActions.removeEvent(props.id));
        props.onClose();
    };

    return(
        <EventPortal onClose={props.onClose} >
            <div className={classes.frame} >
                <div className={classes.titleLine} >
                    <span className={classes.title} >{eventObj.title}</span>
                    <span className={classes.type} >{`Type: ${eventObj.type}`}</span>
                </div>
                <div className={classes.description} >
                    <span>{desc}</span>
                </div>
                <div className={classes.duration} >
                    <div>
                        <FcClock />
                        {props.time}
                    </div>
                    <div>
                        <FcCalendar/>
                        {`${sDate}${eDate}`}
                    </div>
                </div>
                <div className={classes.repetition} >
                    <span>{`This event ${repetitionFrase()}`}</span>
                </div>
                <div className={classes.informationLine} >
                    {eventObj.type === 'MEETING' ? <MeetingInfo id={props.id} /> : ''}
                    {eventObj.type === 'LECTURE' ? <LectureInfo id={props.id} /> : ''}
                </div>
                <div className={classes.buttons} >
                    <button onClick={showEditHandler} >
                        <HiPencil />
                    </button>
                    <button onClick={deleteEvent} >
                        <MdDelete />
                    </button>
                    <button onClick={props.onClose} >
                        <MdOutlineClose />
                    </button>
                </div>
                {showEdit===true? <Form
                    onClose={hideEdit}
                    id={props.id}
                /> : ''}
            </div>
        </EventPortal>
    );

};

export default EventExtended;