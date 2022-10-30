import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const ModalBackdrop = (props)=>{
    return(
        <div className={classes.backdrop} onClick={props.onClose} >
            {props.children}
        </div>
    );
};


const ModalOverlay = (props)=>{
    return(
        <div className={classes.mainFrame}>
            {props.children}
        </div>
    );
};

const portalElement = document.getElementById('overlay-root');

const Modal = (props)=>{
    return(
        <Fragment>
            {ReactDOM.createPortal(
                <ModalBackdrop onClose={props.onClose} />, 
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>, 
                portalElement
            )}        
        </Fragment>
    );

};

export default Modal;