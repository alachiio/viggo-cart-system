import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/PageHome.vue'
import Product from '../views/PageProduct.vue'
import Category from '../views/PageCategory.vue'
import Cart from '../views/PageCart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/:category',
      name: 'category',
      component: Category
    },
    {
      path: '/:category/:id',
      name: 'product',
      component: Product
    }
  ]
})

export default router
