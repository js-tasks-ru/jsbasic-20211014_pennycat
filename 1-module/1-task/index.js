
function factorial(n) {
  let f = 1;

  if((+n ^ 0) === +n && +n >= 0){ //проверка на целое и положительное число 
    if(n > 1){
      f = n;
      for (let i = 1; i < n; i++) { 
        f *= i;
      }
    }
    alert(f);
    return f;
  } else { //иначе выведем предупреждение
    alert('Введите положительное целое число');
    return false;
  }

}

factorial(prompt('Введите число для вычисления факториала:','')); 