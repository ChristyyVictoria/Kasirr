<!-- src/components/Dashboard.vue -->

<template>
    <div class="dashboard">
      <h2 class="text-center">Dashboard</h2>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Total Penjualan Hari Ini</h5>
              <p class="card-text">{{ totalSalesToday }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Total Transaksi</h5>
              <p class="card-text">{{ totalTransactions }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Pendapatan Kotor</h5>
              <p class="card-text">{{ grossRevenue }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Grafik Penjualan</h5>
              <!-- Grafik Penjualan -->
              <div id="sales-chart"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Produk Terlaris</h5>
              <ul class="list-group">
                <li class="list-group-item" v-for="product in topSellingProducts" :key="product.id">
                  {{ product.name }} - {{ product.quantitySold }} terjual
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        totalSalesToday: 0,
        totalTransactions: 0,
        grossRevenue: 0,
        topSellingProducts: [
          // Contoh data produk terlaris
          { id: 1, name: 'Produk A', quantitySold: 100 },
          { id: 2, name: 'Produk B', quantitySold: 75 },
          { id: 3, name: 'Produk C', quantitySold: 50 },
        ],
      };
    },
    mounted() {
      // Misalnya, ambil data dari API saat komponen dimuat
      this.fetchDashboardData();
    },
    methods: {
      fetchDashboardData() {
        // Panggil API atau metode untuk mengambil data dashboard
        // Contoh data statis untuk sementara
        this.totalSalesToday = 1500;
        this.totalTransactions = 45;
        this.grossRevenue = 2000;
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  .card {
    margin-bottom: 20px;
  }
  #sales-chart {
    width: 100%;
    height: 300px;
    /* Anda bisa menggunakan library chart seperti Chart.js untuk menampilkan grafik */
  }
  </style>
  