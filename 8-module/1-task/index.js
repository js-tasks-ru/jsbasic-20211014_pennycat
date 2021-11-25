import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.firstPosition = this.elem.getBoundingClientRect().top + window.pageYOffset; 

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

      

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if(this.elem.classList.contains('cart-icon_visible')){
      let cart = this.elem;
      let container_coords = cart.closest('.container').getBoundingClientRect();
      let clientWidth = document.documentElement.clientWidth;

      let rightIndent = clientWidth - cart.offsetWidth - 10;

      let leftIndent = Math.min(container_coords.right + 20,rightIndent);

      if(window.pageYOffset > this.firstPosition){
        cart.style.position = 'fixed';
        cart.style.zIndex = '2000';
        cart.style.top = '50px';
        cart.style.left = `${leftIndent}px` ;
      } else {
        cart.style.position = '';
        cart.style.zIndex = '';
        cart.style.left = '';
        cart.style.top = '';
      }

      if (document.documentElement.clientWidth <= 767) {
        cart.style.position = '';
        cart.style.zIndex = '';
        cart.style.left = '';
        cart.style.top = '';
      }

    }
  }
}
