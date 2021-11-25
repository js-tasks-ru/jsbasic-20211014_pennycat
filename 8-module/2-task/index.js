import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: false, 
      vegeterianOnly: false, 
      maxSpiciness: 4, 
      category: '' 
    };

    this.elem = createElement(`<div class="products-grid">
        <div class="products-grid__inner">
          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>`);

    this.renderCards(products);
  
  }

  renderCards = (products) => {
    let productsGrid = this.elem.querySelector('.products-grid__inner');
    productsGrid.innerHTML = '';

    products.forEach((product) => {
        let cartItem = new ProductCard(product);
        productsGrid.append(cartItem.elem);
    });

  }

  updateFilter = (filters) => {
    for (let filter in filters) {
        this.filters[filter] = filters[filter];
    } 

    let filteredProducts = this.products.filter((product) => {
        return (this.filters['noNuts'] ? !product.nuts : true)
        && (this.filters['vegeterianOnly'] ? product.vegeterian : true)
        && (product.spiciness <= this.filters['maxSpiciness'])
        && (this.filters['category'] ? product.category === this.filters['category'] : true);
    });

    this.renderCards(filteredProducts);
  }


}
