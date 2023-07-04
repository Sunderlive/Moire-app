<template>
    <ul class="catalog__list">
      <ProductItem v-for="product in products" :product="product" :key="product.id"/>
        </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: {ProductItem},
  props:['products']
}























// data(){
  //   return{
  //     products: []
  //   }
  // },
  // computed: {
  // },
  // components: {ProductItem},
  // methods: {
  //   ...mapActions(['loadProducts']),

  // },
  // created(){
  //   this.loadProducts()
  // }
</script>














