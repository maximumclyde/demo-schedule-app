import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';

import EventExtended from './EventExtended';
import Card from '../UI/Card';

import { panelActions } from '../../store/panel-slice';

import classes from './PanelEvent.module.css';

const eventTypes = {
    'EVENT': `${classes.eventBg}`,
    'LECTURE': `${classes.lectureBg}`,
    'MEETING': `${classes.meetingBg}`,
    'BIRTHDAY': `${classes.birthdayBg}`,
};

const PanelEvent = (props)=>{
    const [portalShow, setPortalShow] = useState(false);
    const dispatch = useDispatch();

    const togglePortal = ()=>{
        dispatch(panelActions.setClickedId(props.id));
        setPortalShow((prev)=>{
            return !prev;
        });
    };

    let d = 'No description...'
    if(props.description !== '') {
        d=props.description;
    }
    let c = eventTypes[props.type]
    return(
        <Fragment>
            <Card onClick={togglePortal}>
                <div className={classes.eventTitle}  >
                    <div className={`${classes.typeColor} ${c}`}></div>
                    <span>{props.title}</span>
                </div>
                <div className={classes.eventDescription}>
                    {d}
                </div>
                <div className={classes.time}>
                    {`Time: ${props.time}`}
                </div>
            </Card>
            {portalShow===true ? 
                <EventExtended 
                    onClose={togglePortal} 
                    id={props.id}
                    time={props.time} 
                /> : ''}
        </Fragment>
    );

};

export default PanelEvent;