let inputData = '1 и -5.8 или 10 хотя 34 + -5.3 и 73';

function getMinMax(str) {
  let array = str.split(' ');
  let numArray = array.filter(item => Number(item));
  let min = Math.min.apply(null, numArray);
  let max = Math.max.apply(null, numArray);
  let objMinMax = {
    min: min,
    max: max,
  }
  //console.log(numArray);
  return objMinMax;
}

console.log(getMinMax(inputData)); // { min: -5.8, max: 73  }

