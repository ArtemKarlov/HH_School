"use strict";

//
// cases: +
// const line = "ааббдд ддббаа";
// const line = "привет прикол";
// const line = "кубик кабак";
//
// cases: -
// const line = 'абаб ааах';
// const line = "кубик кабан";
//

const line = "фывап аааак";

let result = getAnswer(line);
console.log(line);
console.log(result);

function getAnswer(string) {
  const substrings = string.split(" "); //разделяем строку на подстроки через пробел
  const firstSubstring = substrings[0];
  const secondSubstring = substrings[1];
  if (isStringsModified(firstSubstring, secondSubstring)) {
    return 1;
  }
  return 0;
}

//возвращает true если string1 можно преобразовать в string2
function isStringsModified(string1, string2) {
  //если строки разной длины, то строку пробразовать не получится
  if (string1.length !== string2.length) {
    return false;
  }
  //получаем "отпечатки" строк
  const firstStringStamp = getSubstringStamp(string1);
  const secondStringStamp = getSubstringStamp(string2);
  //выбираем из "отпечатка" первой строки индексы повторяющихся букв
  const repeatedLettersPos = firstStringStamp.filter(
    (stamp) => stamp.length > 1
  );
  // для каждой повторяющейся буквы из первой строки проверяем,
  // что в "отпечатках" второй строки есть такой массив,
  // который содержит все индексы повторяющейся буквы из первой строки
  return repeatedLettersPos.every((letterPos) =>
    secondStringStamp.some((secondStamp) =>
      letterPos.every((pos) => secondStamp.includes(pos))
    )
  );
}
// function isStringsModified(string1, string2) {
//   //если строки разной длины, то строку пробразовать не получится
//   if (string1.length !== string2.length) {
//     return false;
//   }
//   //получаем "отпечатки" строк
//   const firstStringStamp = getSubstringStamp(string1);
//   const secondStringStamp = getSubstringStamp(string2);
//   //если в первой строке нет повторяющихся букв, то преобразовать можно
//   if (firstStringStamp.length === string1.length) {
//     return true;
//   } else {
//     //выбираем из "отпечатка" первой строки индексы повторяющихся букв
//     const repeatedLettersPos = firstStringStamp.filter(
//       (stamp) => stamp.length > 1
//     );
//     // для каждой повторяющейся буквы из первой строки проверяем,
//     // что в "отпечатках" второй строки есть такой массив,
//     // который содержит все индексы повторяющейся буквы из первой строки
//     return repeatedLettersPos.every((letterPos) =>
//       secondStringStamp.some((secondStamp) =>
//         letterPos.every((pos) => secondStamp.includes(pos))
//       )
//     );
//   }
//   // return false;
// }
//возвращает "отпечаток" строки - массив с массивами индексов вхождения каждой буквы
function getSubstringStamp(string) {
  //приводим строку к массиву
  const arr = Array.from(string);
  let stamps = [];
  loop1: for (let i = 0; i < arr.length; i++) {
    //если в "отпечатках" уже есть такой массив,
    // который содержит индекс текущей бкувы (т.е. такая буква уже встречалась),
    // то переходим на следующую итерацию
    if (stamps.some((stamp) => stamp.includes(i))) {
      continue loop1;
    }
    let stamp = [i]; //записываем в "отпечаток" индекс текущей буквы
    for (let j = i + 1; j < arr.length; j++) {
      // если в массиве (правее текущей (i-ой) позиции) повторно встречается буква -
      // записываем "повторную" позицию в "отпечаток"
      if (arr[i] === arr[j]) {
        stamp.push(j);
      }
    }
    // добавляем "отпечаток" буквы в "отпечаток" строки
    stamps.push(stamp);
  }
  return stamps;
}

// function isArraysEqual(arr1, arr2) {
//   if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
//     return false;
//   }
//   if (arr1.length != arr2.length) {
//     return false;
//   }
//   for (let i = 0; i < arr1.length; i++) {
//     if (Array.isArray(arr1[i]) || Array.isArray(arr2[i])) {
//       if (!isArraysEqual(arr1[i], arr2[i])) {
//         return false;
//       }
//     } else if (arr1[i] !== arr2[i]) {
//       return false;
//     }
//   }
//   return true;
// }
