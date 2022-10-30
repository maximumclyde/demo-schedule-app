import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import classes from './OptionsPortal.module.css';

const ModalBackdrop = (props)=>{
    return(
        <div className={classes.backdrop} onClick={props.onClick} >
            {props.children}
        </div>
    );
};

const ModalOverlay = (props)=>{
    return(
        <div className={classes.frame} >
            {props.children}
        </div>
    );
};

const portal = document.getElementById('options');

const OptionsPortal = (props)=>{

    return(
        <Fragment>
            {createPortal(
                <ModalBackdrop onClick={props.onBackDropClick} />
                , portal
            )}
            {createPortal(
                <ModalOverlay >
                    {props.children}
                </ModalOverlay>
                , portal)}
        </Fragment>
    );

};

export default OptionsPortal;
