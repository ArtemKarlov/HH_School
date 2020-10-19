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
// 100 103
// 101 109
// 102 104
// 105 107
// 108 110
// 108 110
// 108 111`;

// const line = `3
// 100 103
// 101 102
// 101 108
// 102 104
// 105 107
// 106 109
// 106 110`;

// const line = `3
// 100 103
// 102 105
// 103 105
// 105 107`;



// ================================================
function parseLine(line) {
    return line.split('\n');
}
const inputArray = parseLine(line);
// ================================================


// const result = getResult(inputArray);

const result = getResult2(inputArray);

console.log('======');
console.log(String(result));
console.log('======');



// 
// ver-2 ===================================================================
// 

function getResult2(inputArray) {
    let intervalsCount = 0;
    let intervalsDuration = 0;
    const numericInput = getNumericInput(inputArray);
    const intervals = numericInput.slice(1);
    intervals.sort((intA, intB) => intA[0] - intB[0]);

    const intersections = getMultiIntersections(getIntersections(intervals));


console.log(intersections);

    if (intersections.length == 0) {
        intervalsCount = intervals.length;
        intervalsDuration = getIntervalsDuration(intervals);
    } else {
        intervalsCount = intersections.length;
        intervalsDuration = getIntervalsDuration(intersections);
    }


    return `${intervalsCount} ${intervalsDuration}`;
}


function getIntersections(intervals) {
    const intersections = [];
    
    let intersectionsCount = [];

    for (let i = 0; i < intervals.length-1; i++) {
        const intA = intervals[i];
        
        const intersectA = [];
        let count = 0;

        for (let j = (i + 1); j < intervals.length; j++) {            
            const intB = intervals[j];
            let interval = []; 
            if (intA[1] >= intB[0]) {
                interval = (intA[1] > intB[1]) ? 
                    [intB[0], intB[1]] : 
                    [intB[0], intA[1]];
                intersectA.push(interval);
                count++;
            }                
        }
        // intersectionsCount.push(count);
        // console.log(intersectA.length);
        // if (intersectA.length > 1) {            
        //     intersections.push(...getIntersections(intersectA));
        // } else {
        //     intersections.push(...intersectA);
        // }   
        if (intersectA.length != 0) {
            intersections.push(intersectA);
        }
        // if (intersections.length > intervals.length) {
        //     intersections.push(...getIntersections(intersections));
        // }
    }

    // const multiIntersections = intersections.filter(intersectionsItem => {
    //     if (intersectionsItem.length > 1) {
    //         return true;
    //     }
    // });
    // if (multiIntersections.length == 0) {
    //     return intersections.reduce((result, intersection) => {
    //         return [...result, ...intersection];
    //     }, []);
    // } else {
    //     const length = intersections.length;
    //     multiIntersections.forEach((multiInter) => {
    //         intersections.push(...getIntersections(multiInter));
    //     });
    //     return intersections.slice(length);
    // }


    // intersections.sort((intA, intB) => intA[0] - intB[0]);
    return intersections;
    
}


function getMultiIntersections(intersections) {
    const multiIntersections = [];
    let result = [];

    for (let intersect of intersections) {
        if (intersect.length > 1) {
            multiIntersections.push(...getIntersections(intersect));
        }
    }


    if (multiIntersections.length == 0) {
        result =  intersections.reduce((result, intersection) => {
            return [...result, ...intersection];
        }, []);
    } else {
        result = [...getMultiIntersections(multiIntersections)];
    }

    return result;  
    
}


function getIntervalsDuration(intervals) {
    const intervalsDuration = intervals.reduce((sumDuration, interval) => {
        const intervalDuration = (interval[1] - interval[0]) + 1;
        sumDuration += intervalDuration;
        return sumDuration;
    }, 0);

    return intervalsDuration;
}


function getNonDuplicatedIntervals(intervals) {
    const duplicatedIndexes = [];

    const nonDuplicatedIntervals  = intervals.filter((intervalA, indexA) => {        
        const duplicateIndex = intervals.findIndex((intervalB, indexB) => {
            if ((indexA != indexB) && isIntervalsEqual(intervalA, intervalB)) {
                return true;
            }
        });

        if (duplicateIndex != -1) {
            duplicatedIndexes.push(duplicateIndex);
        }

        if (duplicatedIndexes.includes(indexA)) {
            return false;
        }

        return true;
    });

    return nonDuplicatedIntervals;
}


function isIntervalsEqual(intA, intB) {
    if (intA.length != intB.length) {
        return false;
    }
    for (let i = 0; i < intA.length; i++) {
        if (intA[i] !== intB[i]) {
            return false;
        }
    }

    return true;
}







// 
// ver-1 ===================================================================
// 
function getResult(array) {
    const parsedLine = getNumericInput(array);
    let intervals = parsedLine.slice(1);

    intervals = getSortedIntervals(intervals);
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


function getNumericInput(array) {    
    const intervalsCount = Number(array[0]);
    const intervals = array.slice(1).map(interval => {
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


function getSortedIntervals(array) {
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
