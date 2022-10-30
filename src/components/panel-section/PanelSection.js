import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

import PanelEvent from './PanelEvent';
import { HiOutlinePlus } from 'react-icons/hi';

import Form from '../form/Form';

import classes from './PanelSection.module.css';
import reducedClasses from './PanelReduced.module.css';

const PanelSection = ()=>{
    const [eventsToShow, setEventsToShow] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const panelEvents = useSelector(state=>state.panel);

    const mediaQuery = useMediaQuery('(min-width: 961px)');


    useEffect(()=>{

        let tmp = [];

        panelEvents.eventsToShow.forEach(event=>{
            tmp.push(
                <PanelEvent
                    key={event[0].id}
                    id={event[0].id}
                    title={event[0].title}
                    description={event[0].description}
                    time={`${event[0].startTime}-${event[0].endTime}`}
                    type={event[0].type}
                    startDay={event[0].startDay}
                    endDay={event[0].endDay}
                />
            );
        })

        setEventsToShow(tmp);

    }, [panelEvents]);

    const toggleModal = ()=>{
        setModalShow((prev)=>{
            return !prev;
        });
    };

    const panelTitle = !panelEvents.clickedDate ? 
        'Click on a date to show events' : 
        `Events: ${panelEvents.clickedDate}/${panelEvents.clickedMonth+1}`;

    const noEvent = <span className={classes.noEvent} >No events to show</span>;

    
    //====CONDITIONAL CLASSES=========

    let cls = [];
    if(mediaQuery) {
        cls = []
        cls.push(`${classes.mainFrame}`);
        cls.push(`${classes.panelTitle}`);
        cls.push(`${classes.buttonContainer}`);
        cls.push(`${classes.addEventButton}`);
        cls.push(`${classes.eventsFrame}`);
    } else {
        cls = []
        cls.push(`${reducedClasses.mainFrame}`);
        cls.push(`${reducedClasses.panelTitle}`);
        cls.push(`${reducedClasses.buttonContainer}`);
        cls.push(`${classes.addEventButton}`);
        cls.push(`${reducedClasses.eventsFrame}`);
    }

    return (
        <div className={cls[0]} >
            <div className={cls[1]}>
                <span>{panelTitle}</span>
                <div className={cls[2]}>
                    <button 
                        className={cls[3]}
                        onClick={toggleModal}>
                        <HiOutlinePlus />
                    </button>
                </div>
            </div>
            <div className={cls[4]}>
                {eventsToShow.length === 0 ? noEvent : eventsToShow}
            </div>
            
            {modalShow===true ?
                    <Form 
                        id=''
                        onClose={toggleModal} />
                : ''
            }
        </div>
    );

};

export default PanelSection;