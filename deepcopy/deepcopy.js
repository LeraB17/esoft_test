function deepCopy(obj, visited = new WeakMap()) {
    // если obj уже был скопирован, возвращаем его копию
    if (visited.has(obj)) {
        return visited.get(obj);
    }

    // примитивные типы возвращаем сразу
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // создаем новый объект или массив в зависимости от типа obj
    const copy = Array.isArray(obj) ? [] : {};

    // сохраняем скопированный объект в WeakMap (хранит все скопированные объекты)
    visited.set(obj, copy);

    // рекурсивно копируем свойства
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = deepCopy(obj[key], visited);
        }
    }

    // сохраняем прототип
    Object.setPrototypeOf(copy, Object.getPrototypeOf(obj));

    return copy;
}

// оригинальный объект с полями разных типов данных
const originalObj = {
    a: 1,
    b: { c: 2 },
    d: [3, 4],
    e: new Date(),
    f: () => console.log('meow'),
};

// добавим циклическую ссылку
originalObj.originalObj = originalObj

// копия
const copiedObj = deepCopy(originalObj);

// поля (в том числе вложенных объектов) совпадают (в том числе по типам)
console.log(copiedObj);
console.log(copiedObj.b.c === originalObj.b.c); 
console.log(copiedObj.d[0] === originalObj.d[0]); 
console.log(copiedObj.e instanceof Date);
// поля, являющиеся объектами не равны, тк это не один и тот же объект, а копия => другое место в памяти 
console.log(copiedObj.d === originalObj.d); 
console.log(copiedObj.originalObj.d == originalObj.originalObj.d); 

// при изменении оригинального объекта копия не меняется
originalObj.a = 3;
console.log(copiedObj.a != originalObj.a);

// функция тоже скопировалась и работает
copiedObj.f(); 
