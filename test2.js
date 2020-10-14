"use strict";

// const line = `1
// 1595862781 1595862785`;

const line = `2
1595862781 1595862783
1595862782 1595862784
1595862785 1595862787`;

// const line = `2
// 1595862781 1595862782
// 1595862783 1595862784`;


const splitLine = line.split('\n');

let count = splitLine[0];

const intervals = splitLine.slice(1).map(interval => {
    return interval.split(' ').map(elem => Number(elem))
});

const intervalsSets = intervals.map(interval => {
    const set = [];
    for (let i = interval[0]; i <= interval[1]; i++) {
        set.push(i);
    }
    return set;
});


const result = intersectionTwoArrays(intervalsSets[0], intervalsSets[1]);
const resultAll = intersectionArrays(intervalsSets);


console.log(intervalsSets);
console.log(result);
console.log(resultAll);


function intersectionArrays(array) {
    const result = array.reduce((intersectionArray, currentArray) => {
        return intersectionTwoArrays(intersectionArray, currentArray);
    });
    return result;
}

function intersectionTwoArrays(arrA, arrB) {
    return arrA.filter(arrAElem => arrB.includes(arrAElem));
}


