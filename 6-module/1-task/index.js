/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.render();

    for (let row of rows){
      this.addRow(row);
    }

    this.elem.addEventListener('click', this.onClick);
  }
  render() {
    this.elem = document.createElement('table');

    this.elem.innerHTML = `
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    </tbody>
    `;
  }
  addRow(row){
    let tr = document.createElement('tr');
    tr.innerHTML = `<tr>
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.salary}</td>
      <td>${row.city}</td>
      <td><button>X</button></td>
    </tr>`
    this.elem.querySelector('tbody').append(tr);
  }
  onClick(event){
    if (event.target.tagName == 'BUTTON'){
      event.target.closest('tr').remove();
    }
  }
}
