let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
}

function sumSalary(salaries) {
  let sum = 0;
  for (let salary in salaries) {
    if(isFinite(salaries[salary])){
      sum += salaries[salary];
    }
  }
  console.log(sum);
  return sum;
}

sumSalary(salaries);