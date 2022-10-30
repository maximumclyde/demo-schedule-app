import { useState, useEffect } from 'react';
import { calculateDates } from './calc-dates';

/**
 * THIS IS A HOOK USED TO GET THE DATES 
 * TO BE SHOWN IN THE CALENDAR COMPONENT
 */

const useDates = (submittedMonth, submittedYear)=>{
    const [dateArray, setDateArray] = useState([]);

    useEffect(()=>{
        let tmpDateArray = calculateDates(submittedMonth, submittedYear);
        setDateArray(tmpDateArray);
    }, [submittedMonth, submittedYear]);

    return dateArray;

};
export default useDates;