<template>
    <li class="catalog__item" v-bind:key="product.id">
      <router-link class="catalog__pic" :to="{name:'product', params: {id:product.id}}">
        <img :src="product.colors[0].gallery ? product.colors[0].gallery[0].file.url : noImage"  :alt="product.title">
      </router-link>
      <h3 class="catalog__title">
        <a href="#">
          {{ product.title}}
        </a>
      </h3>

      <span class="catalog__price">
        {{product.price}} ₽
      </span>

      <ul class="colors colors--black" >
        <li class="colors__item" v-for="color in product.colors" :key="color.id">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" name="color-1" value="#73B6EA" checked="" >
            <span class="colors__value" :style="{'background-color': color.color.code}">
            </span>
          </label>
        </li>
      </ul>
    </li>

</template>

<script>

import noImage from '@/assets/noPhoto.png'

export default {
  data(){
    return {
      noImage,
    }
  },
 props:['product'],
}
</script>

