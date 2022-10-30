/**
 * HELPER FUNCTION THAT CALCULATES THE DATES
 */

export const calculateDates = (currentMonthIndex, year)=>{

    const dateArray = [];

    let tmpDate = new Date(year, currentMonthIndex, 1);

    let firstDayIndex = tmpDate.getDay();
    let currentLastDay = new Date(year, currentMonthIndex+1, 0).getDate();
    let previousLastDay = new Date(year, currentMonthIndex, 0).getDate();
    
    let x=0; //this will hold the total number of dates

    //calculating the previous month's dates
    let a=0;
    if(firstDayIndex === 0) {
        a=6;
    } else if(firstDayIndex !== 0 && firstDayIndex !== 1) {
        a = firstDayIndex - 1;
    }

    for(let i=1; i<=a; i++, x++) {
        let tmpMonth = currentMonthIndex-1;
        let tmpYear = year;
        if(currentMonthIndex === 0) {
            tmpMonth = 11;
            tmpYear--;
        }

        dateArray.push({
            date: (previousLastDay-a+i),
            month: tmpMonth,
            year: tmpYear,
            isToday: false,
            isThisMonth: false
        });
    }

    //calculating the curent month's dates
    let tmpIsToday = false;
    let tmpTodayDate = new Date();
    
    for(let i=1; i<=currentLastDay; i++, x++) {
        if(i===tmpTodayDate.getDate() && currentMonthIndex === tmpTodayDate.getMonth() && year === tmpTodayDate.getFullYear()){
            tmpIsToday = true;
        }
        dateArray.push({
            date: i,
            month: currentMonthIndex,
            year: year,
            isToday: tmpIsToday,
            isThisMonth: true
        });
        if(tmpIsToday){
            tmpIsToday = false;
        }
    }

    //calculating the next month's dates
    for(let i=1; x<42; x++, i++) {

        let tmpMonth = currentMonthIndex+1;
        let tmpYear = year;

        if(currentMonthIndex === 11) {
            tmpMonth = 0;
            tmpYear++;
        }

        dateArray.push({
            date: i,
            month: tmpMonth,
            year: tmpYear,
            isToday: false,
            isThisMonth: false
        });
    }

    return dateArray;

};