<template>
  <div class="cart__block">
    <ul class="cart__orders" >
      <li class="cart__order" v-for="product in products" :key="product.basketItemId">

        <h3>{{ product.product.title }}</h3>
        <b>{{ product.product.price }} ₽</b>
        <span>Артикул: {{ product.product.id}}</span>
      </li>
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>1200 ₽</b></p>
      <p>Итого: <b>{{ products.length }}</b> товара на сумму <b> {{totalPrice}} ₽</b></p>
    </div>

    <button class="cart__button button button--primery" type="submit">
      Оформить заказ
    </button>
  </div>
  </template>

  <script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'}), // т.е запись можно сократить запись и не создавать products()
    }
  }

  </script>
