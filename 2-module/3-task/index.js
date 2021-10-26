let calculator = {
  read(num1,num2) {
    this.num1 = num1;
    this.num2 = num2;
  },
  sum(){
    let summa = this.num1 + this.num2;
    return summa;
  },
  mul(){
    let result = this.num1 * this.num2;
    return result;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально

calculator.read(3, 5);
console.log(calculator);
console.log(calculator.sum()); // 8
console.log(calculator.mul()); // 15