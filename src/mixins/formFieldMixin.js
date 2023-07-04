import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'modelValue'],
  components:  {BaseFormField},
  computed: {
    // двунаправленное вычисляемое свойство и через v-model с ним свяжемся
    dataValue: {
      get(){
        return this.modelValue;
      },
      set(modelValue){
        this.$emit('update:modelValue', modelValue)
      }
    }
  } ,
}

//Через миксины можно добавить ещё к примеру входящий параметр

