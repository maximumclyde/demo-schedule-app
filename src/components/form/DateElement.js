import { useState, useEffect} from 'react';

import classes from './DateElement.module.css';

const monthArray = [
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
]

const DateElement = (props)=>{
    
    const [selectedValue, setSelectedValue] = useState();
    const [prevValue, setPrevValue] = useState();
    const [nextValue, setNextValue] = useState();
    const [prevShow, setPrevShow] = useState();
    const [nextShow, setNextShow] = useState();
    const [inputMode, setInputMode] = useState(false);


    useEffect(()=>{

        if(props.prev==='') {
            setPrevShow(false);
        }else {
            setPrevShow(true);
        }

        if(props.next === '') {
            setNextShow(false);
        }else {
            setNextShow(true);
        }


        if(props.type==='month') {
            setSelectedValue(monthArray[props.value]);
            setPrevValue(monthArray[props.prev]);
            setNextValue(monthArray[props.next])
        } else {
            setSelectedValue(props.value);
            setPrevValue(props.prev);
            setNextValue(props.next);
        }
    }, [props.next, props.prev, props.type, props.value]);

    const clickNewValue = (event) =>{
        props.onClick(event.target.value);
    }

    const inputModeToggler = ()=>{
        setInputMode(true);
    };

    const typeNewValue = (event)=>{
        if(props.type==='month') {
            let tmp = event.target.value;
            tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
            let p = monthArray.indexOf(tmp);
            console.log(p);
            if(p=== -1) {
                props.onClick(monthArray.indexOf(selectedValue));
            } else {
                props.onClick(p);
            }
        } else {
            let tmp = parseInt(event.target.value);
            console.log(tmp);
            if(tmp < props.limit[0] || tmp > props.limit[1] || isNaN(tmp) ) {
                props.onClick(selectedValue);
            }else {
                props.onClick(event.target.value);
            }
        }
        setInputMode(false);
    }

    return(
        <div className={classes.frame} >
            {prevShow===true ? <button
                value={props.prev}
                readOnly={true}
                onClick={clickNewValue}
            >{prevValue}</button> : ''}
            {inputMode===false ? 
            <span
                type='text'
                onClick={inputModeToggler}
                readOnly
            >{selectedValue}</span> :
            <input
                type='text'
                defaultValue={selectedValue}
                onBlur={typeNewValue}
                autoFocus={true}
            />}
            {nextShow===true ? <button
                value={props.next}
                readOnly={true}
                onClick={clickNewValue}
            >{nextValue}</button> : ''}
        </div>
    );
};

export default DateElement;