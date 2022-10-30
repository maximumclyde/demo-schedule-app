export const monthsPassedFromStart = (resultStartDay, thisDateSplit)=>{

    let startYear = resultStartDay[0];
    let startMonth = resultStartDay[1];
    let startDay = resultStartDay[2];

    let thisYear = thisDateSplit[0];
    let thisMonth = thisDateSplit[1];
    let thisDay = thisDateSplit[2];

    //EVENT HASN'T STARTED YET
    if(startYear === thisYear && thisMonth < startMonth){
        return -1;
    }else if(startYear > thisYear){
        return -1;
    }


    //START DATE IN THE SAME MONTH
    if(startYear === thisYear && thisMonth === startMonth){
        if(thisDay >= startDay){
            return 0;
        }else{
            return -1;
        }
    }

    let monthsPassed = 0;
    let cycle = true;
    while(cycle){
        if(thisMonth === 1){
            thisYear --;
            thisMonth = 13;
        }

        thisMonth--;

        if(startMonth === thisMonth && startYear === thisYear){
            cycle = false;
        }
        
        monthsPassed++;
    }

    return monthsPassed;

};