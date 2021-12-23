import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
      this.slider = new Carousel(slides);
      this.ribbonMenu = new RibbonMenu(categories);
      this.stepSlider = new StepSlider({
        steps: 5,
        value: 3
      });
      this.cartIcon = new CartIcon();
      this.cart = new Cart(this.cartIcon);
      this.nutsCheck = document.getElementById('nuts-checkbox');
      this.vegeterianCheck = document.getElementById('vegeterian-checkbox');
  }

  async render() {
      let sliderHolder = document.querySelector('[data-carousel-holder]');
      let menuHolder = document.querySelector('[data-ribbon-holder]');
      let stepSliderHolder = document.querySelector('[data-slider-holder]');
      let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
      let productsHolder = document.querySelector('[data-products-grid-holder]');

      productsHolder.innerHTML = '';

      sliderHolder.append(this.slider.elem);
      menuHolder.append(this.ribbonMenu.elem);
      stepSliderHolder.append(this.stepSlider.elem);
      cartIconHolder.append(this.cartIcon.elem);

      let response = await fetch('products.json');
      let result = await response.json();

      if(result){
          this.productsGrid = new ProductsGrid(result);
          productsHolder.append(this.productsGrid.elem);

          this.productsGrid.updateFilter({
            noNuts: document.getElementById('nuts-checkbox').checked,
            vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
            maxSpiciness: this.stepSlider.value,
            category: this.ribbonMenu.value
          });
      }

      document.body.addEventListener('product-add', (event) => {
          let product = result.find(item => item.id == event.detail);
          this.cart.addProduct(product);
      });

      this.stepSlider.elem.addEventListener('slider-change', (event) => {
          this.productsGrid.updateFilter({
            maxSpiciness: event.detail
          })
      });

      this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
          this.productsGrid.updateFilter({
            category: event.detail
          })
      });


      this.nutsCheck.addEventListener('change', (event) => {
          this.productsGrid.updateFilter({
            noNuts: this.nutsCheck.checked 
          });
      });

      this.vegeterianCheck.addEventListener('change', (event) => {
          this.productsGrid.updateFilter({
            vegeterianOnly: this.vegeterianCheck.checked 
          });
      });

  }
}
