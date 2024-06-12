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
      newItemPrice: null, // Atur nilai awal menjadi null
      newItemQuantity: null, // Atur nilai awal menjadi null
    };
  },
  methods: {
    addItem() {
      if (this.newItemName && this.newItemPrice !== null && this.newItemQuantity !== null && this.newItemPrice > 0 && this.newItemQuantity > 0) {
        this.order.addItem({
          id: Date.now(),
          name: this.newItemName,
          price: this.newItemPrice,
          quantity: this.newItemQuantity,
        });
        this.newItemName = '';
        this.newItemPrice = null; // Setel kembali ke null setelah berhasil menambahkan item
        this.newItemQuantity = null; // Setel kembali ke null setelah berhasil menambahkan item
      }
    },
    increment(item) {
      if (this.newItemQuantity === null) {
        this.newItemQuantity = 1; // Jika field item quantity masih kosong, setel nilainya menjadi 1
      } else {
        this.newItemQuantity++; // Jika tidak kosong, tambahkan nilai item quantity
      }
    },
    decrement(item) {
      if (this.newItemQuantity === null || this.newItemQuantity <= 1) {
        this.newItemQuantity = 1; // Jika field item quantity masih kosong atau bernilai 1, biarkan nilainya tetap 1
      } else {
        this.newItemQuantity--; // Jika tidak kosong dan lebih besar dari 1, kurangi nilai item quantity
      }
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