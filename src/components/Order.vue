<template>
  <div>
    <h1 class="text-center">POS Cashier</h1>
    <div class="mb-3">
      <input type="text" v-model="newItemName" placeholder="Item name" class="form-control" />
      <input type="number" v-model.number="newItemPrice" placeholder="Item price" class="form-control mt-2" />
      <input type="number" v-model.number="newItemQuantity" placeholder="Item quantity" class="form-control mt-2" />
      <button class="btn btn-success mt-2" @click="addItem">Add Item</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.getTotal() }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="increment(item)">+</button>
            <button class="btn btn-danger btn-sm" @click="decrement(item)">-</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-right">
      <h3>Total: {{ order.getTotal() }}</h3>
    </div>
  </div>
</template>

<script>
import Order from '../Order';

export default {
  data() {
    return {
      order: new Order(),
      newItemName: '',
      newItemPrice: 0,
      newItemQuantity: 1,
    };
  },
  methods: {
    addItem() {
      if (this.newItemName && this.newItemPrice > 0 && this.newItemQuantity > 0) {
        this.order.addItem({
          id: Date.now(),
          name: this.newItemName,
          price: this.newItemPrice,
          quantity: this.newItemQuantity,
        });
        this.newItemName = '';
        this.newItemPrice = 0;
        this.newItemQuantity = 1;
      }
    },
    increment(item) {
      this.order.addItem({ ...item, quantity: 1 });
    },
    decrement(item) {
      this.order.removeItem(item);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>