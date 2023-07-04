<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
         {{ countProducts }} товаров
        </span>
      </div>
    </div>
    <div class="content__catalog">

      <ProductFilter v-model:category-id="filterCategoryId" v-model:price-from="filterPriceFrom" v-model:price-to="filterPriceTo"
      v-model:material-id="filterMaterials" v-model:season-id="filterSeasons" v-model:color-id="filterColors"/>
      <section class="catalog">
        <svg v-if="productsLoading"  class="ring" viewBox="25 25 50 50" stroke-width="5"><circle cx="50" cy="50" r="20" /></svg>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров <button @click.prevent="loadProducts" >Попробовать ещё раз</button> </div>
        <ProductList :products="products"/>
        <Base-pagination v-model="page" :per-page="productsPerPage" :count="countProducts"></Base-pagination>
      </section>
    </div>
  </main>
</template>


<script>
import ProductList from '@/components/ProductList.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BasePagination from '@/components/BasePagination.vue'
import axios from 'axios'
import { API_BASE_URL } from '@/baseUrl';

export default {
components: {ProductList, ProductFilter, BasePagination},
data(){
  return {
    filterCategoryId: 0,
    filterPriceFrom: 0,
    filterPriceTo: 0,
    filterColors: [],
    filterSeasons: [],
    filterMaterials: [], // нужно сюда положить ид материалов или колекции
    productsData: null,

    productsLoading: false,
    productsLoadingFailed: false,
    page: 1,
    productsPerPage:6,
  }
},
computed: {
  products(){
      return this.productsData
       ? this.productsData.items.map (product => {
        return {
          ...product,
        images: product.colors[0] // ?
        }
       }) // приведем к нужному формату из сервера
       : [] // из-за того, что не успевает прогрузиться, нужно вернуть пустой массив
    },
    countProducts(){
      return this.productsData ? this.productsData.pagination.total : 0
    }
},
methods: {
    loadProducts() {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductsTimer) // Для правильной загрузки и выполнится только последний метод
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL+`/api/products`, { // в методе get доступна опция
        params: {
          page: this.page,
          limit: this.productsPerPage,
          categoryId: this.filterCategoryId,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
          materialIds: this.filterMaterials,
          seasonIds: this.filterSeasons,
          colorIds: this.filterColors
        }
      })
      .then(response => this.productsData = response.data)
      .catch(() => this.productsLoadingFailed= true)
      .then(()=> this.productsLoading = false)
      },0)
    }
  },
  watch: {
    page(){
      this.loadProducts()   // следим за изменением свойства page и если изменилась , то перезагружаем  // watcher получается это свойство ?
    },
    filterCategoryId(){
      this.loadProducts()
    },
    filterPriceFrom() {
      this.loadProducts()
    },
    filterPriceTo(){
      this.loadProducts()
    },
    filterMaterials(){
      this.loadProducts()
    },
    filterSeasons(){
      this.loadProducts()
    },
    filterColors(){
      this.loadProducts()
    }
  },
  created(){  // хуки разобраться
    this.loadProducts()
  }
}
</script>
