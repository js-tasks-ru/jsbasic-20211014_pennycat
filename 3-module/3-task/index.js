function camelize(str) {
  let arr = str.split('-');
  
  let newArr = arr.map(function(value, index) {
    let newValue = value;
    if (index > 0){
      newValue = value.charAt(0).toUpperCase()+value.slice(1);
    }
    return newValue;
  });
  
  let newStr = newArr.join('');
  console.log(newStr);
  return newStr;
}

camelize('background-color'); //== 'backgroundColor';
camelize('list-style-image'); //== 'listStyleImage';
camelize('-webkit-transition'); //== 'WebkitTransition';
