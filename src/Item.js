class Item {
    constructor(id, name, price, quantity) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
    }
    
    getTotal() {
      return this.price * this.quantity;
    }
  }
  
  export default Item;
  