Условие задачи
Ограничение времени, с	1
Ограничение памяти, МБ	64
Общее число попыток отправки	15

На вход подается 2 подстроки. Нужно определить, можно ли превратить первую во вторую, заменяя одни буквы на другие, с учетом следующих правил:

    - участвуют только буквы русского алфавита а-я;
    - все буквы в нижнем регистре;
    - за один шаг нужно преобразовать все вхождения одной буквы в другую букву.


Входные данные

Входная информация поступает из стандартного ввода в виде одной строки. В этой строке содержатся две подстроки, разделенные пробелом. Ваше решение должно учитывать вариант, когда на вход поданы строки разной длины. Некорректные данные на вход не поступают, дополнительные проверки не требуются.

Выходные данные

В качестве ответа в стандартный вывод программа должна выводить 1 (если превратить можно) или 0 (если превратить нельзя).

Пример 1

Входные данные: привет прикол
Выходные данные: 1
Преобразования (выводить не нужно):
в ⇒ к (прикет)
е ⇒ о (прикот)
т ⇒ л (прикол)

Пример 2

Входные данные: ааббдд ддббаа
Выходные данные: 1
Преобразования (выводить не нужно):
д ⇒ я (ааббяя)
а ⇒ д (ддббяя)
я ⇒ а (ддббаа)

Пример 3

Входные данные: абаб ааах
Выходные данные: 0
Преобразовать нельзя, так как 'б' не сможет оказаться одновременно 'а' и 'х'.

Примечания по оформлению решения

При отправке решений на Java необходимо назвать исполняемый класс Main. В решении не нужно указывать пакет.

Для работы со стандартным потоком ввода в JS используйте require('readline'), а для работы со стандартным потоком вывода - console.log(String(data)).

Пример ввода-вывода на JS:

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', (line) => {
    // Введенная строка в переменной line, тут можно написать решение
    console.log(String(result));
    rl.close();
    return;
}).on('close', () => process.exit(0));


Перед отправкой решения рекомендуем запустить тесты из раздела Тестирование, они помогут поймать синтаксические ошибки и ошибки выполнения.