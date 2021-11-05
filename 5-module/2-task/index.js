function toggleText() {
  document.querySelector('.toggle-text-button').addEventListener('click', () => {
    let divText = document.querySelector('#text');
    let _hidden = divText.hidden == true ? false : true;
    divText.hidden = _hidden;
  })
}
