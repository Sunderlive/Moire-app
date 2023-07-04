<template>
<li class="cart__item product">
  <div class="product__pic">
    <img :src="item.color.gallery[0].file.url" width="120" height="120" alt="Название товара">
  </div>
  <h3 class="product__title">
    {{ item.product.title}}
  </h3>
  <p class="product__info product__info--color">
    Цвет:
    <span>
      <i :style="`background-color: ${item.color.color.code}`"></i>
      {{ item.color.color.title }}
    </span >
    Размер: {{ item.size.title }}
  </p>
  <span class="product__code">
    Артикул: {{item.product.id}}
  </span>
  <ProductCounter v-model:amount='amount'></ProductCounter>
  <b class="product__price">
    {{item.price}} ₽
  </b>
  <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"  @click.prevent="deleteCartProduct(item.id)">
    <svg width="20" height="20" fill="currentColor">
      <use xlink:href="#icon-close"></use>
    </svg>
  </button>
</li>

</template>

<script>

import { mapActions } from 'vuex';
import ProductCounter from '@/components/ProductCounter.vue';

export default {
  components: { ProductCounter },
  props: ['item'],
  computed: {
    amount: {
      get(){
        return this.item.quantity
      },
      set(value){
        this.$store.dispatch('updateCartProductAmount', {productId: this.item.id, amount:value})
      },
    },
  },
  methods: {
    ...mapActions(['deleteCartProduct']),
  }
}

</script>

