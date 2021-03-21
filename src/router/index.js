import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import formBuilder from '../views/FormBuilder.vue'
import productBuilder from '../views/ProductBuilder.vue'
import calendar from '../views/Calendar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/form-builder',
    name: 'formBuilder',
    component: formBuilder
  },
  {
    path: '/product-builder',
    name: 'productBuilder',
    component: productBuilder
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: calendar
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
