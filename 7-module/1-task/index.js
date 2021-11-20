import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`<div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    </div>`);
    this.toLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.toRight = this.elem.querySelector('.ribbon__arrow_right');
    this.toRight.classList.add('ribbon__arrow_visible');
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.addLinks(categories);
    this.toLeft.addEventListener('click', this.left);
    this.toRight.addEventListener('click', this.right);
    this.elem.addEventListener('click', this.choose);
  }
  addLinks(categories){
    let result = categories.map(item => `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`).join('');
    this.ribbonInner.innerHTML = result;
  }
  left = (event) => {
    console.log('to left');
    this.ribbonInner.scrollBy(-350, 0);
    this.updateBtns();
  }
  right = (event) => {
    console.log('to right');
    this.ribbonInner.scrollBy(350, 0);
    this.updateBtns();
  }
  updateBtns(){
    this.ribbonInner.scrollLeft == 0 ? this.toLeft.classList.remove('ribbon__arrow_visible') : this.toLeft.classList.add('ribbon__arrow_visible')
    
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
      
    scrollRight < 1 ? this.toRight.classList.remove('ribbon__arrow_visible') : this.toRight.classList.add('ribbon__arrow_visible')
  }
  choose = (event) => {
      if(event.target.classList.contains('ribbon__item')){
        event.preventDefault();
        let selected = this.elem.querySelectorAll('.ribbon__item');
        for(let item of selected) {
          item.classList.remove('ribbon__item_active');
        }
        event.target.classList.add('ribbon__item_active');

        let selectItem = new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id,
          bubbles: true
        })
        this.elem.dispatchEvent(selectItem);
      }
  }
}
