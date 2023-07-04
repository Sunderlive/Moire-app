<template>
 <div class="form__counter">
    <button type="button" @click.prevent='itemAmount--' aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="itemAmount" name="count">


    <button type="button" @click.prevent='itemAmount++' aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

</template>

<script>
export default {
  props: ['amount'],
  computed: {
    itemAmount: {
      set(value) {
        if (value >= 1) {
          this.$emit('update:amount', value);
        }
      },
      get() {
        return this.amount;
      },
    },
  },
}
</script>
