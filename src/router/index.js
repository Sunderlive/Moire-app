import { createRouter, createWebHashHistory} from 'vue-router'
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage'
import OrderInfoPage from '@/pages/OrderInfoPage'
import NotFoundPage from '@/pages/NotFoundPage'

const routes = [
  {name:'mainPage', component: MainPage, path:'/'},
  {name:'product', component: ProductPage, path:'/product/:id'},
  {name:'cart', component: CartPage, path: '/cart/'},
  {name:'order', component:OrderPage, path: '/order/'},
  {name:'orderInfo', component: OrderInfoPage, path:'/order/:id'},
  {name:'notFound', component: NotFoundPage, path:'/:pathMatch(.*)*'},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
