let arr = [5, 3, 8, 1];

function filterRange(arr, a, b) {
    let newArr = [];
    for (let value of arr) {
        if (value >= a && value <= b) {
          newArr.push(value);
        }
    }
    return newArr;
}

let filtered = filterRange(arr, 1, 4);

console.log( filtered ); // [3,1] (совпадающие значения)
console.log( arr ); // [5,3,8,1] (без изменений)