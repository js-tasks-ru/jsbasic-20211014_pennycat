function makeDiagonalRed(table) {
  console.log(table.rows.length);
  for(let i=0; i < table.rows.length; i++){
    let row = table.rows[i];
    row.cells[i].style.backgroundColor = 'red';
  }
}
