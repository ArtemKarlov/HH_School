const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const inputArray = [];
let vacancyCount = undefined;

rl.on('line', (line) => {
    if (vacancyCount === undefined) {
        vacancyCount = line;
    }    

    inputArray.push(line);
    
    if (inputArray.length == (vacancyCount + 1)) {
        rl.close();
    }

    // Введенная строка в переменной line, тут можно написать решение
    // console.log(String(result));
    // rl.close();
    // return;
}).on('close', () => {
    const result = getResult(inputArray);
    console.log(String(result));
    process.exit(0)
});
// 
// 
// getResult2
function getResult(inputArray) {
    let intervalsCount = 0;
    let intervalsDuration = 0;
    const intervals = getNumericIntervals(inputArray);
    intervals.sort((intA, intB) => intA[0] - intB[0]);

    const intersections = getIntersections(intervals);
    const multiIntersections = getMultiIntersections(intersections);

    if (multiIntersections.length == 0) {
        intervalsCount = intervals.length;
        intervalsDuration = getIntervalsDuration(intervals);
    } else {
        intervalsCount = multiIntersections.length;
        intervalsDuration = getIntervalsDuration(multiIntersections);
    }

    return `${intervalsCount} ${intervalsDuration}`;
}

// getNumericIntervals
function getNumericIntervals(inputArray) {    
    const numericIntervals = inputArray.slice(1).map(interval => {
        return interval.split(' ').map(elem => Number(elem))
    });

    return numericIntervals;
}

// getIntervalsDuration
function getIntervalsDuration(intervals) {
    const intervalsDuration = intervals.reduce((sumDuration, interval) => {
        const intervalDuration = (interval[1] - interval[0]) + 1;
        sumDuration += intervalDuration;
        return sumDuration;
    }, 0);

    return intervalsDuration;
}


// getIntersections_v2
function getIntersections(intervals) {
    const intersections = [];
    
    for (let i = 0; i < intervals.length-1; i++) {        
        for (let j = (i + 1); j < intervals.length; j++) {            
            if (intervals[i][1] >= intervals[j][0]) {
                const interval = (intervals[i][1] > intervals[j][1]) ? 
                    [intervals[j][0], intervals[j][1]] : 
                    [intervals[j][0], intervals[i][1]];
                intersections.push(interval);
            }                
        }
    }

    return intersections;   
}

// getMultiIntersections_v2
function getMultiIntersections(intersections) {
    const multiIntersections = [];
    let result;

    multiIntersections.push(...getIntersections(intersections));

    if (multiIntersections.length == 0) {
        return intersections;
    }
    else {
        result = getNonDuplicatedIntervals(multiIntersections);
        return [...getMultiIntersections(result)];
    }
}

// getNonDuplicatedIntervals
function getNonDuplicatedIntervals(intervals) {
    const duplicatedIndexes = [];

    const nonDuplicatedIntervals  = intervals.filter((intervalA, indexA) => {        
        const duplicateIndex = intervals.findIndex((intervalB, indexB) => {
            if (
                (indexA != indexB) && 
                (indexA < indexB) &&
                isIntervalsEqual(intervalA, intervalB)
            ) {
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

// isIntervalsEqual
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
