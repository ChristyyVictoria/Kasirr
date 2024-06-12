import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cashier from '../components/Cashier.vue'
import Products from '../components/Products.vue'
import Order from '../components/Order.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homeview",
      component: HomeView,
    },
    {
      path: "/cashier",
      name: "Cashier",
      component: Cashier,
      children: [
        {
          path: "/products",
          name: "Products",
          component: Products,
        },
        {
          path: "/order",
          name: "Order",
          component: Order,
        },
      ]
    },
  ],
});

export default router 
