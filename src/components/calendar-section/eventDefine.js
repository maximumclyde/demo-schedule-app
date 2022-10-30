import { daysPassedFromStart } from "./daysPassedFromStart";
import { monthsPassedFromStart } from "./monthsPassedFromStart";
const weekDayIndex = [
    'sun',
    'mon',
    'tue',
    'wen',
    'thu',
    'fri',
    'sat'
];

export const eventDefine = (event, date, month, year)=>{

    let eventStartDate = event.startDay.date;
    let eventStartMonth = event.startDay.month;
    let eventStartYear = event.startDay.year;
    
    let eventEndDate = event.endDay.date;
    let eventEndMonth = event.endDay.month;
    let eventEndYear = event.endDay.year;

    /**
     * ========CONDITIONS FOR NOT SHOWING AN EVENT========
     */
    if(eventStartYear === year && eventStartMonth === month){
        if(eventStartDate > date){
            return false;

        }
    }

    if(eventEndYear === year && eventEndMonth === month){
        if(eventEndDate < date){
            return false;
        }
    }

    if((month < eventStartMonth || month > eventEndMonth) && (year === eventStartYear || year === eventEndYear)){
        return false;
    }

    if(year > eventEndYear){
        return false;
    }

    if(year < eventStartYear){
        return false;
    }

    if(event.repetition === 'DAY' || event.repetition === 'NO_REPETITION') {
        let sum = daysPassedFromStart([eventStartYear, eventStartMonth+1, eventStartDate], [year, month+1, date]);
        if(sum === -1) {
            return false;
        }else {
            if(sum % (event.duration + event.break) < event.duration || sum === 0) {
                return true;
            }else{
                return false;
            }
        }
    }else if(event.repetition === 'WEEK') {
        let sum = daysPassedFromStart([eventStartYear, eventStartMonth+1, eventStartDate], [year, month+1, date]);
        sum /= 7; let condition = false;
        if(sum % (event.duration + event.break) < event.duration || sum === 0) {
            let tmpDate = new Date(year, month, date);
            let tmpIndex = tmpDate.getDay();
            for(let i=0; i<event.weekdays.length/3; i++){
                let weekDay = event.weekdays.substr(i*3, 3);
                if(weekDay === weekDayIndex[tmpIndex]){
                    condition = true;
                }
            }
        }
        return condition;
    }else if(event.repetition === 'MONTH') {
        let sum = monthsPassedFromStart([eventStartYear, eventStartMonth+1, eventStartDate], [year, month+1, date]);
        if(sum % (event.duration + event.break) < event.duration || sum === 0) {
            if(year < (eventStartYear+event.duration) && year >= eventStartYear){
                return true;
            }else{
                return false;
            }
        }else {
            return false;
        }
    }else {
        let sum = monthsPassedFromStart([eventStartYear, eventStartMonth+1, eventStartDate], [year, month+1, date]);
        sum/=12;
        if(sum % (event.duration + event.frequency) < event.duration || sum === 0){
            if(month === eventStartMonth){
                if(date < eventStartDate + event.duration && date >= eventStartDate){
                    return true;
                }else{
                    return false;
                }
            }
        }else{
            return false;
        }
    }


};




