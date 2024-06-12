<!-- src/components/SideBarLeft.vue -->

<template>
    <div class="sidebar">
      <div class="sidebar-header text-center">
        <h3>Kasir</h3>
        <img src="@/assets/admin.jpeg" alt="Admin Avatar" class="admin-avatar">
        <p>Admin</p>
      </div>
      <ul class="list-group mt-3">
        <li class="list-group-item" v-for="item in menuItems" :key="item.name">
          <router-link :to="item.link">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuItems: [
          { name: 'Order', link: '/order' },
          { name: 'Products', link: '/products' },
          //{ name: 'Customers', link: '/customers' },
          //{ name: 'Reports', link: '/reports' },
          //{ name: 'Settings', link: '/settings' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 230px;
    height: 100vh;
    position: fixed;
    background-color: #f8f9fa;
    padding: 10px;
  }
  .sidebar-header {
    margin-bottom: 20px;
  }
  .admin-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 10px 0;
  }
  .list-group-item {
    padding: 10px;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  </style>
  