function toggleText() {
  document.querySelector('.toggle-text-button').addEventListener('click', () => {
    let divText = document.querySelector('#text');
    divText.hidden = divText.hidden == true ? false : true;
  })
}
