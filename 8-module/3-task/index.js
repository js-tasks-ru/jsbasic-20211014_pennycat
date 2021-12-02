export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    console.log(totalCount);
    return totalCount;
    
  }

  getTotalPrice() {
    let totalSum = this.cartItems.reduce((sum, current) => sum + current.count*current.product.price, 0);
    console.log(totalSum);
    return totalSum;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


