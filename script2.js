"use strict";

function getLine(key) {
    let line = '';
    switch (key) {
        case 1: // 1 5
            line = `1
1595862781 1595862785`;
            break;

        case 2: // 1 2 
            line = `2
1595862781 1595862783
1595862782 1595862784`;
            break;

        case 3: // 2 4
            line = `2
1595862781 1595862782
1595862783 1595862784`;  
            break;

        case 4: // 1 2
            line = `5
100 103
101 108
102 104
105 107`;
            break;

        case 5: // 2 4
            line = `5
100 103
101 108
102 104
105 107
106 109`;
            break;

        case 6: // 1 2
            line = `6
100 103
101 108
102 104
105 107
106 109
105 110`;
            break;
        default:
            line = `3
100 104
101 105
102 106
103 107
108 112
109 113
110 114
111 115
111 113`;
            break;
    }

    return line;
}

const line = getLine();

// ================================================
function parseLine(line) {
    return line.split('\n');
}
const inputArray = parseLine(line);
// ================================================


const result = getResult(inputArray);

console.log(String(result));



// 
// ver-2 ===================================================================
// 

// getResult2
function getResult(inputArray) {
    let answer = '';
    const intervals = getNumericIntervals(inputArray);
    const intersections = getIntervalsIntersections(intervals); 
console.log(intersections);

    if (intersections.length == 0) {
        answer = getAnswer(intervals);
    } else {
        const multiIntersections = getMultiIntersections2(intersections);
        console.log(multiIntersections);
        answer = getAnswer(multiIntersections);
    }

    return answer;
}

// getNumericIntervals
function getNumericIntervals(inputArray) {    
    const numericIntervals = inputArray.slice(1).map(interval => {
        return interval.split(' ').map(elem => Number(elem))
    });

    return numericIntervals;
}

// getAnswer (array of intervals) -> (answer string)
function getAnswer(intervalsArray) {
    const intervalsCount = intervalsArray.length;
    const intervalsDuration = getIntervalsDuration(intervalsArray);

    return `${intervalsCount} ${intervalsDuration}`;
}

// getIntervalsDuration (array of intervals) -> (sumDuration number)
function getIntervalsDuration(intervalsArray) {
    const intervalsDuration = intervalsArray.reduce((sumDuration, interval) => {
        const intervalDuration = (interval[1] - interval[0]) + 1;
        sumDuration += intervalDuration;
        return sumDuration;
    }, 0);

    return intervalsDuration;
}


// getIntervalsIntersections_v2
function getIntervalsIntersections(intervalsArray) {
    const intersections = [];    
    intervalsArray.sort((intA, intB) => intA[0] - intB[0]);
    
    loop1: for (let i = 0; i < intervalsArray.length-1; i++) { 
      
        for (let j = (i + 1); j < intervalsArray.length; j++) {
            let intersection = [];

            if (
                (intervalsArray[i][0] == intervalsArray[j][0]) && 
                (intervalsArray[i][1] == intervalsArray[j][1])
            ) {
                intersection = [intervalsArray[i][0], intervalsArray[i][1]];
            } else if ((intervalsArray[i][1] >= intervalsArray[j][0])) {
                intersection = (intervalsArray[i][1] > intervalsArray[j][1]) ? 
                                    [intervalsArray[j][0], intervalsArray[j][1]] : 
                                    [intervalsArray[j][0], intervalsArray[i][1]];
            }
      
            if (intersection.length != 0) {                
                if (
                    (intersections.length == 0) || 
                    (intersections[(intersections.length - 1)][0] !== intersection[0]) ||
                    (intersections[(intersections.length - 1)][1] !== intersection[1])
                ) {
                    intersections.push(intersection);
                }
            }
            else {
                continue loop1;
            }       
        }        
    }

    return intersections;       
}


function getMultiIntersections2(intersections) {
    const multiIntersections = [];
    const shrinkedIntervalsArray = getShrinkedIntervalsArray(intersections)
    multiIntersections.push(...getIntervalsIntersections(shrinkedIntervalsArray));

    if (multiIntersections.length == 0) {
        return shrinkedIntervalsArray;
    }
    else {
        return getMultiIntersections2(multiIntersections);
    }
}

function getShrinkedIntervalsArray(intervalsArray) {
    const duplicatedIndexes = [];
    const shrinkedIntervalsArray = [];

    loop1: for (let i = 0; i < intervalsArray.length; i++) {
        if (duplicatedIndexes.includes(i)) {
            continue loop1;
        } else {
            shrinkedIntervalsArray.push(intervalsArray[i]);            
        }
        for (let j = (i + 1); j < intervalsArray.length; j++) {
            if (
                (intervalsArray[i][0] == intervalsArray[j][0]) && 
                (intervalsArray[i][1] == intervalsArray[j][1])
            ) {
                duplicatedIndexes.push(j);
            }
        }
    }

    return shrinkedIntervalsArray;
}



// int = [int[0], int[1]]
function getIntersection(intA, intB) {
    let intersection = [];
    if ((intA[0] == intB[0]) && (intA[1] == intB[1])) {
        intersection = [intA[0], intA[1]];
    } else if ((intA[1] >= intB[0]) && (intA[0] <= intB[1])) {
        intersection = (intA[0] < intB[0]) ? 
                (intA[1] > intB[1]) ? [intB[0], intB[1]] : [intB[0], intA[1]] :
                (intA[1] < intB[1]) ? [intA[0], intA[1]] : [intA[0], intB[1]];
    }

    return intersection;
}




// =============================================================================================
// archive
// 

// // getNextIntersections (intersectionsMatrix) -> (intersectionsMatrix)
// function getNextIntersections(intersectionsMatrix) {
//     const nextIntersections = [];
//     intersectionsMatrix.forEach(intersection => {
//         const srinkedIntersections = getShrinkedIntervalsArray(intersection);
//         const nextIntersect = getIntervalsIntersections(srinkedIntersections);
//         if (nextIntersect.length != 0) {
//             nextIntersections.push(nextIntersect); 
//         }             
//     });

//     return nextIntersections;
// }

// // getMultiIntersections_v2
// function getMultiIntersections(intersectionsMatrix) {
//     const largestSubArrays = getLargestSubArrays(intersectionsMatrix);

//     let multiIntersections = getNextIntersections(largestSubArrays);


//     if (multiIntersections.length == 0) {
//         return intersectionsMatrix.reduce((result, intersection) => {
//             return [...result, ...intersection];
//         }, []);;
//     }
//     else { 
//         // let i = 0;

//         // while (i<5) {
//         //     multiIntersections = getNextIntersections(multiIntersections);
//         //     console.log(multiIntersections);
//         //     i++;
//         // }
//         return [...getMultiIntersections(multiIntersections)];
//     }
// }




// // getLargestSubArrays (intersectionsMatrix) -> (intersectionsMatrix)
// function getLargestSubArrays(array) {
//     const subArrayslengths = array.map(subArray => subArray.length);
//     const maxLength = getMaxOfArray(subArrayslengths);
//     const largestSubArrays = array.filter(subArray => subArray.length == maxLength);
    
//     return largestSubArrays;
// }

// // Рекомендуется использовать только в случае обработки массивов с небольшим количеством элементов
// function getMaxOfArray(numArray) {
//     return Math.max.apply(null, numArray);
// }

// function isIntervalsIntersect(intA, intB) {
//     const intersection = getIntersection(intA, intB);
//     if (intersection.length !== 0) {
//         return true;
//     } else {
//         return false;
//     }
// }






// // isIntervalsEqual
// function isIntervalsEqual(intA, intB) {
//     if ((intA[0] != intB[0]) || (intA[1] != intB[1])) {
//         return false;
//     }
    
//     return true;
// }











// // getIntersections
// function getIntersections(intervals) {
//     const intersections = [];
    
//     for (let i = 0; i < intervals.length-1; i++) {        
//         const intersect = [];
//         for (let j = (i + 1); j < intervals.length; j++) {            
//             if (intervals[i][1] >= intervals[j][0]) {
//                 const interval = (intervals[i][1] > intervals[j][1]) ? 
//                     [intervals[j][0], intervals[j][1]] : 
//                     [intervals[j][0], intervals[i][1]];
//                 intersect.push(interval);
//             }                
//         }
//         if (intersect.length != 0) {
//             intersections.push(intersect);
//         }
//     }

//     return intersections;   
// }

// // getMultiIntersections
// function getMultiIntersections(intersections) {
//     const multiIntersections = [];

//     for (let intersect of intersections) {
//         if (intersect.length > 1) {
//             multiIntersections.push(...getIntersections(intersect));
//         }
//     }

//     if (multiIntersections.length == 0) {
//         return intersections.reduce((result, intersection) => {
//             return [...result, ...intersection];
//         }, []);
//     } else {
//         return [...getMultiIntersections(multiIntersections)];
//     }  
// }



// getNonDuplicatedIntervals
// function getNonDuplicatedIntervals(intervals) {
//     const duplicatedIndexes = [];

//     const nonDuplicatedIntervals  = intervals.filter((intervalA, indexA) => {        
//         const duplicateIndex = intervals.findIndex((intervalB, indexB) => {
//             if (
//                 (indexA != indexB) && 
//                 (indexA < indexB) &&
//                 isIntervalsEqual(intervalA, intervalB)
//             ) {
//                 return true;
//             }
//         });

//         if (duplicateIndex != -1) {
//             duplicatedIndexes.push(duplicateIndex);
//         }

//         if (duplicatedIndexes.includes(indexA)) {
//             return false;
//         }

//         return true;
//     });

//     return nonDuplicatedIntervals;
// }
// 
// 
// // для отсортированных по началу интарвалов исключаем проверку (intA[0]<...)
// function getIntersectionOfSortedIntervals(intA, intB) {
//     let intersection = [];
//     if ((intA[0] == intB[0]) && (intA[1] == intB[1])) {
//         intersection = [intA[0], intA[1]];
//     } else if ((intA[1] >= intB[0])) {
//         intersection = (intA[1] > intB[1]) ? [intB[0], intB[1]] : [intB[0], intA[1]];
//     }
//     return intersection;
// }


// // getIntervalsIntersections_v2
// function getIntervalsIntersections(intervalsArray, returnType = 'array') {
//     const intersections = [];
//     const intersectionsMatrix = [];
    
//     for (let i = 0; i < intervalsArray.length-1; i++) { 
//         const intersectionI = [];       
//         for (let j = (i + 1); j < intervalsArray.length; j++) {
//             const intersection =  getIntersection(intervalsArray[i], intervalsArray[j]);                
//             if (intersection.length != 0) {
//                 intersectionI.push(intersection);
//             }        
//         }
//         if (intersectionI.length != 0) {
//             (returnType === 'matrix') ? intersectionsMatrix.push(intersectionI) : intersections.push(...intersectionI);
//         }  
//     }

//     if (returnType === 'matrix') {
//         return intersectionsMatrix;
//     } else {
//         return intersections;
//     }       
// }


