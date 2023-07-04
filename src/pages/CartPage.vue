<template>
  <main v-if="$store.state.cartLoading"><svg class="ring" viewBox="25 25 50 50" stroke-width="5"><circle cx="50" cy="50" r="20" /></svg></main>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'mainPage'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{totalQuantity}} товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="productItem in $store.state.cartProductsData" :key="productItem.id" :item="productItem"></CartItem>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            {{ $store.state.cartProducts == 0 }}
          </p>
          <p class="cart__price">
            {{ cartTotalPrice }} ₽
          </p>
          <router-link v-slot="{navigate}" :to="{name:'order'}" custom>
            <button @click="navigate" type="button" class="cart__button button button--primery" :disabled="$store.state.cartProducts == 0"
              aria-label="Оформить заказ" >Оформить заказ</button>
          </router-link>
          <!-- :disabled="$store.state.cartProducts == 0" -->
        </div>
      </form>
    </section>
  </main>

</template>

<script>

import CartItem from '@/components/CartItem.vue';
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent ({
  components: { CartItem },
  computed: {
    ...mapGetters({
      cartTotalPrice: 'cartTotalPrice',
      totalQuantity: 'cartTotalQuantity'}), // т.е запись можно сократить запись и не создавать products()
  },
})

</script>

<style>

.product__info i {
  border: 1px solid black;
}

</style>


