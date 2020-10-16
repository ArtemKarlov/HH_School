"use strict";

// const line = `1
// 1595862781 1595862785`;

// const line = `2
// 1595862781 1595862783
// 1595862782 1595862784`;

// const line = `2
// 1595862781 1595862782
// 1595862783 1595862784`;

// const line = `5
// 1595862781 1595862783
// 1595862781 1595862785
// 1595862782 1595862784
// 159586278 1595862784
// 1595862785 1595862787`;

// const line = `4
// 1595862781 1595862783
// 1595862782 1595862788
// 1595862784 1595862789
// 1595862787 1595862789`;

// const line = `3
// 101 103
// 102 104
// 103 105`;

// const line = `3
// 101 103
// 104 106
// 107 109`;

// const line = `3
// 101 103
// 101 103
// 107 109`;

const line = `6
100 102
100 103
100 102
102 104
103 104
103 104
105 105`;

const result = getResult(line);

console.log(result);

function getResult(line) {
    const parsedLine = parseLine(line);
    let intervals = parsedLine.slice(1);

    intervals = sortIntervals(intervals);
    intervals = reduceIntervals(intervals);

    const timeSets = intervals.map(interval => {
        return fillInterval(interval);
    });

    const findedIntervals = findeIntervalsIntresections(timeSets);
    
console.log(timeSets);
console.log(findedIntervals);

    const findedIntervalsCount = findedIntervals.length;
    const findedIntervalsDuration = findedIntervals.reduce((sumDuration, interval) => sumDuration + interval.length, 0);
    
    return [findedIntervalsCount, findedIntervalsDuration].join(' ');
}



function reduceIntervals(array) {
    const arr = [...array]
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
            continue;
        } else {
            result.push(arr[i]);
        }
        for (let j = (i + 1); j < arr.length; j++) {
            if (isArraysEqual(arr[i], arr[j])) {
                arr[j] = undefined;
            }
        }        
    }

    return result;
}


function findeIntervalsIntresections(array) {

    let findedIntervals = [...array];

    let i = 0,
        j = i + 1;


    const intersectionOfTwoIntervals = getIntersectionOfTwoIntervals(findedIntervals[i], findedIntervals[j]);
    const isIntervalsIntersect = (intersectionOfTwoIntervals.length != 0) ? true : false;
    if (isIntervalsIntersect) {
        findedIntervals.splice(i, 2, intersectionOfTwoIntervals);
        findedIntervals = [...findeIntervalsIntresections(findedIntervals)];
    } else {
        // i++;
        // j++;
        // console.log(i + " " + j);
    }
    


    // const findedIntervals = [];
    // const lastIntervalIndex = array.length - 1;
    // let isIntersectionFinded = false;
    
    // if (array.length == 1) {
    //     findedIntervals.push(...array);
    // } else {
    //     loop1:  for (let i = 0; i < lastIntervalIndex; i++) {
    //         const j = i + 1;
    //         if (isArraysEqual(array[i], array[j])) {
    //             continue loop1;
    //         }
    //         const intersectionOfTwoIntervals = getIntersectionOfTwoIntervals(array[i], array[j]);
    //         const isIntervalsIntersect = (intersectionOfTwoIntervals.length != 0) ? true : false;
    //         if (isIntervalsIntersect) {
    //             findedIntervals.push(intersectionOfTwoIntervals);
    //             isIntersectionFinded = true;                          
    //         } else {
    //             findedIntervals.push(array[i]);
    //             if (j == lastIntervalIndex) findedIntervals.push(array[j]);
    //         }
    //     }
    // }    

    // if (isIntersectionFinded) {
    //     const oldArrayLangth = findedIntervals.length;
    //     findedIntervals.push(findeIntervalsIntresections(findedIntervals));
    //     findedIntervals.splice(0, oldArrayLangth);
    // }

    return findedIntervals;
}


function parseLine(line) {
    const splitLine = line.split('\n');
    const intervalsCount = Number(splitLine[0]);
    const intervals = splitLine.slice(1).map(interval => {
        return interval.split(' ').map(elem => Number(elem))
    });

    return [intervalsCount, ...intervals];
}


function fillInterval(interval) {
    const set = [];
    for (let i = interval[0]; i <= interval[1]; i++) {
        set.push(i);
    }

    return set;
}


function sortIntervals(array) {
    const sortedArray = [...array];
    sortedArray.sort((intervalA, intervalB) => intervalA[0] - intervalB[0]);

    return sortedArray;
}


function getIntersectionOfIntervals(array) {
    const result = array.reduce((intersectionArray, currentArray) => {
        return getIntersectionOfTwoIntervals(intersectionArray, currentArray);
    });

    return result;
}


function getIntersectionOfTwoIntervals(arrA, arrB) {
    return arrA.filter(arrAElem => arrB.includes(arrAElem));
}

function isArraysEqual(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) || Array.isArray(arr2[i])) {
      if (!isArraysEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
