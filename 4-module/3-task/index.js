function highlight(table) {
  let rows = table.querySelectorAll('tbody tr');
  for (let row of rows){

    let status = row.querySelector('td[data-available]');
    let gender = row.querySelector('td:nth-child(3)').textContent;
    let age = row.querySelector('td:nth-child(2)').textContent;

    if (status){
        if(status.dataset.available == 'true'){
            row.classList.add('available');
        } else if(status.dataset.available == 'false'){
            row.classList.add('unavailable');
        }
    } else {
        row.hidden = true;
    }

    if(gender == 'm'){
      row.classList.add('male');
    } else if (gender == 'f'){
      row.classList.add('female');
    }

    if(age < 18){
      row.style['text-decoration'] = 'line-through';
    }
    
  }
}
