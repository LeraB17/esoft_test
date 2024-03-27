function areBracketsBalanced(str) {
    // стек для хранения скобок
    const stack = [];

    // словарь соответствия скобок
    const bracketsMap = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (bracketsMap[char]) {
            // если это открывающая скобка (есть такое значение в словаре), добавляем ее в стек
            stack.push(char);
        } else {
            // если это закрывающая скобка
            if (stack.length === 0 || bracketsMap[stack.pop()] !== char) {
                // если стек пуст или скобки не соответствуют, возвращаем false
                return false;
            }
        }
    }

    // если стек пуст, то все скобки были правильно закрыты
    return stack.length === 0;
}

// примеры 
brackets = "()[]{}"
console.log(brackets, areBracketsBalanced(brackets)); // true
brackets = "(]"
console.log(brackets, areBracketsBalanced(brackets)); // false
brackets = "([)]"
console.log(brackets, areBracketsBalanced(brackets)); // false
brackets = "{[()(){}{()}]}"
console.log(brackets, areBracketsBalanced(brackets)); // true
brackets = "{[]({})}}"
console.log(brackets, areBracketsBalanced(brackets)); // false
brackets = "()(([{[]}[]]))"
console.log(brackets, areBracketsBalanced(brackets)); // true
