<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
    <a class="pagination__link pagination__link--arrow" aria-label="Предыдущая страница" v-on:click.prevent="prevPage()">
      <svg width="8" height="14" fill="currentColor">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
    </a>
  </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item" >
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница"
        v-on:click.prevent="nextPage()">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>

export default {
  props: ['modelValue', 'count', 'perPage'],
  computed: {
    page(){
      return this.modelValue
    },
    pages() { //кол-во страниц
      return Math.ceil(this.count / this.perPage)
    }
  },
  methods: {
    paginate(page) {
      this.$emit('update:modelValue', page)
    },
    nextPage(page = this.page) {
      if (page >= this.pages) {
        this.$emit('update:modelValue', page);
      }
      else {
        this.$emit('update:modelValue', page + 1);
      }
    },
    prevPage(page = this.page) {
      if (page === 1) {
        this.$emit('update:modelValue', page);
      }
      else {
        this.$emit('update:modelValue', page - 1);
      }
    }
  }
}

</script>
