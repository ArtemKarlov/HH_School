"use strict";

const ALPHABET_LENGTH = 5;

//
// cases: +
// const line = "ааббдд ддббаа";
// const line = "привет прикол";
// const line = "кубик кабак";
// const line = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя ааягдеёжзийклмнопрстуфхцчшщъыьэяю";
//
// cases: -
// const line = "абаб ааах";
// const line = "кубик кабан";
// const line = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя яюэьыъщшчцхфутсрпонмлкйизжёедгвба";
//

const line = "0123 3210";

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
  if (string1 === string2) {
    console.log("equal test true");
    return true;
  }
  //если строки разной длины, то строку пробразовать не получится
  if (string1.length !== string2.length) {
    console.log("length test false");
    return false;
  }

  let firstStringRepeatedLetters = [];
  let secondStringRepeatedLetters = [];

  loop1: for (let i = 0; i < string1.length; i++) {
    if (firstStringRepeatedLetters.includes(string1[i])) {
      continue loop1;
    }

    if (
      i == ALPHABET_LENGTH - 1 &&
      (
        (firstStringRepeatedLetters.length === 0 && secondStringRepeatedLetters.length === 0) 
      // || (firstStringRepeatedLetters.length !== 0 && secondStringRepeatedLetters.length === 0)
      )
    ) {
      console.log("33 and repaed test false");
      return false;
    }

    for (let j = i + 1; j < string1.length; j++) {
      let isString2PairEqual = false;
      if (string2[i] === string2[j]) {
        isString2PairEqual = true;
        secondStringRepeatedLetters.push(string2[i]);
      }

      if (string1[i] === string1[j]) {
        if (!isString2PairEqual) {
          console.log("cross equal test false");
          return false;
        } else {
          firstStringRepeatedLetters.push(string1[i]);
        }
      }
    }

    
  }
  console.log("final test true");
  return true;
  // если длина >= 33 и нет повторений в обоих словах -> 0
  // если длина >= 33 но есть повторения -> следующая проверка
  // если в 1 есть повторяющиеся но во 2 на этих позициях не повторяются -> 0

  // //получаем "отпечатки" строк
  // const firstStringStamp = getSubstringStamp(string1);
  // const secondStringStamp = getSubstringStamp(string2);
  // //выбираем из "отпечатка" первой строки индексы повторяющихся букв
  // const repeatedLettersPos = firstStringStamp.filter(
  //   (stamp) => stamp.length > 1
  // );
  // const secondRepeatedLettersPos = secondStringStamp.filter(
  //   (stamp) => stamp.length > 1
  // );
  // // если в первой строке нет повторяющихся букв
  // // и длина строки больше количества допустимых символов - не получится заменить
  // if (
  //   string1.length >= 33 &&
  //   repeatedLettersPos.length === 0 &&
  //   secondRepeatedLettersPos.length === 0
  // ) {
  //   return false;
  // }

  // // для каждой повторяющейся буквы из первой строки проверяем,
  // // что в "отпечатках" второй строки есть такой массив,
  // // который содержит все индексы повторяющейся буквы из первой строки
  // return repeatedLettersPos.every((letterPos) =>
  //   secondStringStamp.some((secondStamp) =>
  //     letterPos.every((pos) => secondStamp.includes(pos))
  //   )
  // );
}
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
