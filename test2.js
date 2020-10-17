"use strict";

// const line = `1
// 1595862781 1595862785`;

const line = `2
1595862781 1595862783
1595862782 1595862784`;

// const line = `2
// 1595862781 1595862782
// 1595862783 1595862784`;

// const line = `3
// 101 104
// 102 106
// 103 104
// 105 108`;

const result = getResult(line);
console.log(typeof(result));

console.log(String(result));

function getResult(line) {
    const parsedLine = parseLine(line);
    let intervals = parsedLine.slice(1);

    intervals = sortIntervals(intervals);
    intervals = reduceIntervals(intervals);

    const timeSets = intervals.map(interval => {
        return fillInterval(interval);
    });

    const findedIntervals = findeIntervalsIntresections(timeSets);
    
// console.log(timeSets);
// console.log(findedIntervals);

    const findedIntervalsCount = findedIntervals.length;
    const findedIntervalsDuration = findedIntervals.reduce((sumDuration, interval) => sumDuration + interval.length, 0);
    
    return findedIntervalsCount + ' ' + findedIntervalsDuration;
}

function parseLine(line) {
    const splitLine = line.split('\n');
    const intervalsCount = Number(splitLine[0]);
    const intervals = splitLine.slice(1).map(interval => {
        return interval.split(' ').map(elem => Number(elem))
    });

    return [intervalsCount, ...intervals];
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
    let findedIntervals = [];
    const lastIntervalIndex = array.length - 1;
    let isIntersectionFinded = false;
    let hasIntersection = false;
    
    if (array.length == 1) {
        findedIntervals.push(...array);
    } else {
        for (let i = 0; i < lastIntervalIndex; i++) {
            const j = i + 1;
            const intersectionOfTwoIntervals = getIntersectionOfTwoIntervals(array[i], array[j]);
            if (intersectionOfTwoIntervals.length != 0) {
                findedIntervals.push(intersectionOfTwoIntervals);
                isIntersectionFinded = true;
                hasIntersection = true;
            }
            else {
                (!hasIntersection) ? 
                    findedIntervals.push(array[i]) : 
                    hasIntersection = false;
                if (j == lastIntervalIndex) findedIntervals.push(array[j]);
                
            }
        }
    } 

    if (isIntersectionFinded) {
        findedIntervals = findeIntervalsIntresections(findedIntervals);
    }

    return findedIntervals;
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


// function getIntersectionOfIntervals(array) {
//     const result = array.reduce((intersectionArray, currentArray) => {
//         return getIntersectionOfTwoIntervals(intersectionArray, currentArray);
//     });

//     return result;
// }


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
