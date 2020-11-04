import clamp from 'lodash/clamp'
import moment from "moment";

export const PickRandom = array => {
    return array[Math.floor(Math.random() * array.length)];
} 

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

export const getColorByValue = (value) => {
    const colors = [
        '#ff65a3',
        '#7afcff',
        '#fff740'
    ]
    return colors[clamp(value, 0, colors.length-1)]
}

export const getDate = ({daysINeed}) => {
    const isThisInFuture = (targetDayNum) => {
        // param: positive integer for weekday
        // returns: matching moment or false
        const todayNum = moment().isoWeekday();

        if (todayNum <= targetDayNum) {
            return moment().isoWeekday(targetDayNum);
        }
        return false;
    };
    const findNextInstanceInDaysArray = (daysArray) => {
        // iterate the array of days and find all possible matches
        const tests = daysINeed.map(isThisInFuture);

        // select the first matching day of this week, ignoring subsequent ones, by finding the first moment object
        const thisWeek = tests.find((sample) => {return sample instanceof moment});

        // but if there are none, we'll return the first valid day of next week (again, assuming the days are sorted)
        return thisWeek || moment().add(1, 'weeks').isoWeekday(daysINeed[0]);
    };
    findNextInstanceInDaysArray(daysINeed);
}