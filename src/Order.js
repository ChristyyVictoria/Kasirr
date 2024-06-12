// src/Order.js

import Item from './Item';

class Order {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(new Item(item.id, item.name, item.price, item.quantity));
    }
  }

  removeItem(item) {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity--;
      } else {
        this.items.splice(index, 1);
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotal(), 0);
  }
}

export default Order;
