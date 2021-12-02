import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if(product != null){
      let result = this.cartItems.find((item) => item.product.id === product.id);
      let cartItem = {};
  
      if(result != undefined){
        result.count++;
        cartItem = result;
      } else {
        cartItem = {
          product: product,
          count: 1
        }
        this.cartItems.push(cartItem);
      }
  
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {

    let index = this.cartItems.findIndex((item) => item.product.id === productId);
    let item = this.cartItems[index];

    if(item){
      item.count += amount; 
      if(index > -1){
        if(item.count == 0){
          this.cartItems.splice(index, 1);
        }
      }
    }

    this.onProductUpdate(item);
  
  }

  isEmpty() {
    return this.cartItems.length > 0 ? false : true;
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce((count,current) => count + current.count, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalSum = this.cartItems.reduce((sum, current) => sum + current.count*current.product.price, 0);
    return totalSum;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.form = this.renderOrderForm();
    let body = createElement('<div></div>');

    this.cartItems.forEach((item) => {
        body.append(this.renderProduct(item.product, item.count));
    });
    
    body.append(this.form);

    this.modal.setTitle('Your order');
    this.modal.setBody(body);
    
    body.addEventListener('click', (event) => {
      let button = event.target.closest('.cart-counter__button');
      
      if(button){
        let productId = event.target.closest('.cart-product').dataset.productId;
        let amount = button.classList.contains('cart-counter__button_plus')? 1 : -1;
        this.updateProductCount(productId,amount);
      }

    });

    this.modal.open();

    this.form.addEventListener('submit', this.onSubmit);
    
  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')){

        if (this.isEmpty()) {
          this.modal.close();
          return false;
        }

        let productId = cartItem.product.id;
        let modalBody = document.querySelector('.modal__body').firstElementChild;
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
        let cartRow = modalBody.querySelector(`[data-product-id="${productId}"]`);

        if(cartItem.count > 0){
          productCount.innerHTML = cartItem.count;
          productPrice.innerHTML = `€${(cartItem.count*cartItem.product.price).toFixed(2)}`;
          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        } else {
          cartRow.remove();
        }
    }

    
  }

  onSubmit = (event) => {
    event.preventDefault();

    let form = this.form;
    let submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.classList.add('is-loading');

    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    })
    .then((response) => {
      if(response.ok){
        this.cartItems = [];
        this.modal.setTitle('Success!');
        this.modal.setBody(createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`));
      }
    })
  

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

