"use strict";

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

const line = "01234567890123 98765432109876";

const ALPHABET_LENGTH = 33;

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
    console.log("string equal test true");
    return true;
  }
  //если строки разной длины, то строку пробразовать не получится
  if (string1.length !== string2.length) {
    console.log("string length test false");
    return false;
  }

  let firstStringRepeatedLetters = [];
  let secondStringRepeatedLetters = [];
  let firstStringUniqueLetters = [];
  let secondStringUniqueLetters = [];

  loop1: for (let i = 0; i < string1.length; i++) {
    if (firstStringRepeatedLetters.includes(string1[i])) {
      continue loop1;
    } else {
      firstStringUniqueLetters.push(string1[i]);
    }

    if (!secondStringRepeatedLetters.includes(string2[i])) {
      secondStringUniqueLetters.push(string2[i]);
    }

    for (let j = i + 1; j < string1.length; j++) {
      let isString2PairEqual = false;
      if (string2[i] === string2[j]) {
        isString2PairEqual = true;
        if (!secondStringRepeatedLetters.includes(string2[i])) {
          secondStringRepeatedLetters.push(string2[i]);
        }
      }

      if (string1[i] === string1[j]) {
        if (!isString2PairEqual) {
          console.log("cross equal test false");
          return false;
        }
        if (!firstStringRepeatedLetters.includes(string1[i])) {
          firstStringRepeatedLetters.push(string1[i]);
        }
      }
    }

    if (
      firstStringUniqueLetters.length === ALPHABET_LENGTH &&
      secondStringUniqueLetters.length === ALPHABET_LENGTH
    ) {
      console.log("my test");
      return false;
    }
  }

  console.log("ALPHABET_LENGTH: " + ALPHABET_LENGTH);
  console.log("string1.length: " + string1.length);
  console.log("UniqueLetters.length: " + firstStringUniqueLetters.length);
  console.log(firstStringUniqueLetters);
  console.log(secondStringUniqueLetters);
  console.log(firstStringRepeatedLetters);
  console.log(secondStringRepeatedLetters);

  console.log("final test true");
  return true;
}
