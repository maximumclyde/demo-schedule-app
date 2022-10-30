/**
 * A FUNCTION THAT RETURN THE NUMBER OF DAYS PASSED FROM THE START
 * IN CASE THE EVENT HASN'T STARTED YET IT RETURNS -1
 */
const monthDays = { 1: "31", 2: "28", 3: "31", 4: "30", 5: "31", 6: "30", 7: "31", 8: "31", 9: "30", 10: "31", 11: "30", 12: "31" };


export const daysPassedFromStart = (resultStartDay, thisDateSplit)=>{

    let startYear = resultStartDay[0];
    let startMonth = resultStartDay[1];
    let startDay = resultStartDay[2];

    let thisYear = thisDateSplit[0];
    let thisMonth = thisDateSplit[1];
    let thisDay = thisDateSplit[2];

    
    /**
     * =======CONDITIONS TO RETURN -1=====
     */

    if(startYear === thisYear && thisMonth < startMonth){
        return -1;
    }else if(startYear > thisYear){
        return -1;
    }


    
    if(startYear === thisYear && thisMonth === startMonth){
        if(thisDay >= startDay){
            return (thisDay-startDay);
        }else{
            return -1;
        }
    }

    /**
     * ========CALCULATION========
     */
    
    let daysPassed = thisDay;
    let cycle = true;
    
    while(cycle){
        
        if(thisMonth === 1){
            thisYear --;
            thisMonth = 13;
        }

        thisMonth--;

        if(thisYear%4 === 0 && thisMonth === 2){
            daysPassed++;
        }

        if(startMonth === thisMonth && startYear === thisYear){
            daysPassed+=(monthDays[thisMonth] - startDay);
            cycle = false;
        }else{
            daysPassed+=monthDays[thisMonth];
        }


    }

    return daysPassed;

};