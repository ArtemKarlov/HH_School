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
    const result = getResult2(inputArray);
    console.log(String(result));
    process.exit(0)
});
// 
// 
// 

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

        if (intersectA.length != 0) {
            intersections.push(intersectA);
        }
    }

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


function getNumericInput(array) {    
    const intervalsCount = Number(array[0]);
    const intervals = array.slice(1).map(interval => {
        return interval.split(' ').map(elem => Number(elem))
    });

    return [intervalsCount, ...intervals];
}