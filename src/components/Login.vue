<template>
  <div class="split-screen">
    <div class="left-panel">
      <div class="login-box">
        <h2>WELCOME</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username:</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
            />
          </div>
          <button type="submit" class="btn btn-light">Login</button>
        </form>
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
      </div>
    </div>
    <div class="right-panel">
      <!-- Right panel content -->
    </div>
  </div>
</template>

<script>
// Import Vue Router
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      // Simulate user authentication
      if (this.username === "admin" && this.password === "123") {
        // Example: Redirect to another page after successful login
        // Assuming 'kasir' is the route name for kasir.vue component
        this.$router.push({ name: "Order" });
      } else {
        this.errorMessage = "Invalid username or password";
      }
    },
  },
};
</script>

<style scoped>
.login-box h2 {
  font-weight: bold;
  color: #333333;
  margin-bottom: 30px; /* Lebih banyak ruang di bawah heading */
}
.split-screen {
  display: flex;
  height: 100vh;
}
.left-panel,
.right-panel {
  flex: 1;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left-panel {
  background: #faf3f0;
  color: rgb(39, 39, 39);
}
.right-panel {
  background: #3d3c42;
}
.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px; /* Lebih besar untuk ruang tambahan */
  padding: 20px;
  border-radius: 8px;
  background: #bc9a89e6; /* Latar belakang abu-abu terang */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Bayangan untuk efek kedalaman */
}
.form-control {
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 20px;
  width: 100%;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333333;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease; /* Efek transisi */
}
.form-control:focus {
  border-color: #007bff; /* Warna fokus */
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2); /* Bayangan fokus */
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #423627; /* Warna tombol biru */
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}
.btn:hover {
  background: #faf3f0; /* Warna tombol saat hover */
  color: #1d1c1b;
  stroke-width: 1px;
}
</style>
