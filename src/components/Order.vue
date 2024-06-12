<template>
  <div>
    <h1 class="text-center">POS Cashier</h1>
    <div class="mb-3">
      <input type="text" v-model="newItemNameOrCode" placeholder="Item name or code" class="form-control" />
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
      <div class="mt-3">
        <label for="moneyGiven">Uang Diberikan:</label>
        <input type="number" v-model.number="moneyGiven" class="form-control" id="moneyGiven" />
      </div>
      <button class="btn btn-primary mt-2" @click="pay">Bayar</button>
      <div v-if="change !== null" class="mt-2">
        <h4>Kembalian: {{ change }}</h4>
        <button class="btn btn-secondary mt-2" @click="printInvoice">Cetak</button>
      </div>
    </div>
  </div>
</template>

<script>
import Order from '../Order';

export default {
  data() {
    return {
      order: new Order(),
      newItemNameOrCode: '',
      newItemQuantity: '',
      moneyGiven: null,
      change: null,
      availableProducts: [], // Menambahkan properti untuk daftar produk yang tersedia
      invoiceData: null // Menyimpan data pembelian untuk invoice
    };
  },
  mounted() {
    this.loadAvailableProducts(); // Memuat daftar produk yang tersedia saat komponen dimuat
  },
  methods: {
    loadAvailableProducts() {
      const savedProducts = JSON.parse(localStorage.getItem('products'));
      if (savedProducts) {
        this.availableProducts = savedProducts;
      }
    },
    saveProducts() {
      localStorage.setItem('products', JSON.stringify(this.availableProducts));
    },
    addItem() {
      // Validasi nama barang atau kode barang dengan daftar produk yang tersedia
      const foundProduct = this.availableProducts.find(product => 
        product.name === this.newItemNameOrCode || product.code === this.newItemNameOrCode
      );
      if (foundProduct) {
        if (foundProduct.stock >= this.newItemQuantity) {
        this.order.addItem({
          id: Date.now(),
          name: foundProduct.name, // Gunakan nama produk dari yang ditemukan
          price: foundProduct.price,
          quantity: this.newItemQuantity,
        });
        this.newItemNameOrCode = '';
        this.newItemQuantity = '';
      } else {
          alert('Stock is not sufficient for the quantity ordered!');
        }
      } else {
        alert('Product not found in available products!'); // Pesan kesalahan jika barang tidak ditemukan
      }
    },
    increment(item) {
      const foundProduct = this.availableProducts.find(product => product.name === item.name);
      if (foundProduct) {
        const orderItem = this.order.items.find(orderItem => orderItem.name === item.name);
        const totalQuantity = orderItem.quantity + 1;
        if (totalQuantity <= foundProduct.stock) {
          this.order.addItem({ ...item, quantity: 1 });
          //foundProduct.stock -= 1; // Mengurangi stok produk
          //this.saveProducts(); // Menyimpan perubahan stok ke local storage
        } else {
          alert('Stock is not sufficient!');
        }
      }
    },
    decrement(item) {
      this.order.removeItem(item);
    },
    pay() {
      const totalToPay = this.order.getTotal();
      if (this.moneyGiven >= totalToPay) {
        this.change = this.moneyGiven - totalToPay;
        this.invoiceData = {
          items: [...this.order.items],
          total: totalToPay,
          moneyGiven: this.moneyGiven,
          change: this.change
        };
        // Mengurangi stok barang yang diorder
        this.order.items.forEach(orderItem => {
          const foundProduct = this.availableProducts.find(product => product.name === orderItem.name);
          if (foundProduct) {
            foundProduct.stock -= orderItem.quantity;
          }
        });
        this.saveProducts();
        // Reset order setelah pembayaran berhasil
        this.order = new Order();
        this.moneyGiven = null;
      } else {
        alert('Uang yang diberikan kurang dari total yang harus dibayar!');
      }
    },
    printInvoice() {
      if (this.invoiceData) {
        const invoiceWindow = window.open('', '_blank');
        invoiceWindow.document.write('<html><head><title>Invoice</title>');
        invoiceWindow.document.write('<style>body { font-family: Arial, sans-serif; } h1, h3 { text-align: center; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: center; } .total { text-align: right; }</style>');
        invoiceWindow.document.write('</head><body>');
        invoiceWindow.document.write('<h1>Invoice</h1>');
        invoiceWindow.document.write('<h3>Date: ' + new Date().toLocaleString() + '</h3>');
        invoiceWindow.document.write('<table><thead><tr><th>Item</th><th>Price</th><th>Quantity</th><th>Total</th></tr></thead><tbody>');
        this.invoiceData.items.forEach(item => {
          invoiceWindow.document.write('<tr><td>' + item.name + '</td><td>' + item.price + '</td><td>' + item.quantity + '</td><td>' + item.getTotal() + '</td></tr>');
        });
        invoiceWindow.document.write('</tbody></table>');
        invoiceWindow.document.write('<h3 class="total">Total: ' + this.invoiceData.total + '</h3>');
        invoiceWindow.document.write('<h3 class="total">Uang Diberikan: ' + this.invoiceData.moneyGiven + '</h3>');
        invoiceWindow.document.write('<h3 class="total">Kembalian: ' + this.invoiceData.change + '</h3>');
        invoiceWindow.document.close();
        invoiceWindow.print();
      } else {
        alert('Tidak ada data untuk dicetak!');
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
