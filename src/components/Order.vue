<template>
    <div>
      <h1 class="text-center">POS Cashier</h1>
      <!-- Daftar Produk dari Products.vue -->
      <div v-for="product in products" :key="product.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">Price: ${{ product.price }}</p>
          <p class="card-text">Stock: {{ product.stock }}</p>
          <!-- Button tambah item ke keranjang -->
          <button class="btn btn-primary mr-2" @click="addItemToCart(product)">Add to Cart</button>
          <!-- Tombol kurang digunakan untuk mengurangi jumlah item di keranjang (jika sudah ada) -->
          <button class="btn btn-danger" @click="removeItemFromCart(product)">Remove from Cart</button>
        </div>
      </div>
  
      <!-- Keranjang Belanja -->
      <h2 class="mt-5">Shopping Cart</h2>
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
          <tr v-for="item in cartItems" :key="item.id">
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
  
      <!-- Total Belanja -->
      <div class="text-right">
        <h3>Total: {{ getTotalPrice() }}</h3>
      </div>
  
      <!-- Field untuk memasukkan jumlah uang yang diberikan -->
      <div class="form-group">
        <label for="amountGiven">Amount Given:</label>
        <input type="number" class="form-control" v-model.number="amountGiven">
      </div>
  
      <!-- Jumlah kembaliannya -->
      <div class="text-right">
        <h3>Change: {{ getChange() }}</h3>
      </div>
    </div>
  </template>
  
  <script>
import Products from './Products.vue'; // Import komponen Products untuk mendapatkan daftar produk

export default {
  data() {
    return {
      products: Products, // Mendapatkan daftar produk dari komponen Products
      order: new Order(),
      amountGiven: 0
    };
  },
  computed: {
    // Mendapatkan daftar item yang ada di keranjang belanja
    cartItems() {
      return this.order.items;
    }
  },
    methods: {
      // Menambahkan item ke keranjang belanja
      addItemToCart(product) {
        this.order.addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
      },
      // Menghapus item dari keranjang belanja
      removeItemFromCart(product) {
        this.order.removeItem(product);
      },
      // Menambah jumlah item di keranjang belanja
      increment(item) {
        this.order.addItem({ ...item, quantity: 1 });
      },
      // Mengurangi jumlah item di keranjang belanja
      decrement(item) {
        this.order.removeItem(item);
      },
      // Menghitung total harga belanja
      getTotalPrice() {
        return this.order.getTotal();
      },
      // Menghitung jumlah kembaliannya
      getChange() {
        return this.amountGiven - this.getTotalPrice();
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
  }
  </style>
  