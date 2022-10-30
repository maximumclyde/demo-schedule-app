import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import classes from './EventPortal.module.css';

const portalElement = document.getElementById('event');

const Backdrop = (props)=>{
    return(
        <div 
            onClick={props.onClick}
            className={classes.backdrop}
            />
    );
}

const Overlay = (props)=>{
    return (
        <div className={classes.overlay} >
            {props.children}
        </div>
    );
};

const EventPortal = (props)=>{
    return(
        <Fragment>
            {createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
            {createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
        </Fragment>
    );
};

export default EventPortal;