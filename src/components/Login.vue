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
  color: black;
}
.right-panel {
  background: #3d3c42;
}
.login-box {
  justify-content: center;
  align-items: center;
  max-width: 300px;
}
.form-control {
  margin-bottom: 20px;
}
</style>
