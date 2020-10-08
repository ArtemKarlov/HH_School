const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', (line) => {
    // Введенная строка в переменной line, тут можно написать решение
    //
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
    // 
    
    console.log(String(result));
    rl.close();
    return;
}).on('close', () => process.exit(0));