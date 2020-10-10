const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
rl.on("line", (line) => {
  // Введенная строка в переменной line, тут можно написать решение
  //
  //
  //
  const ALPHABET_LENGTH = 33;

let result = getAnswer(line);

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
    return true;
  }
  //если строки разной длины, то строку пробразовать не получится
  if (string1.length !== string2.length) {
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
      return false;
    }
  }
  return true;
}
  //
  //
  //
  //
  console.log(String(result));
  rl.close();
  return;
}).on("close", () => process.exit(0));
