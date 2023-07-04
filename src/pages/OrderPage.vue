<template>
  <main v-if="orderSending"><svg class="ring" viewBox="25 25 50 50" stroke-width="5"><circle cx="50" cy="50" r="20" /></svg></main>
  <main  class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
        <router-link :to="{name:'mainPage'}" >
          <a class="breadcrumbs__link">
            Каталог
          </a>
        </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name:'cart'}" >
            <a class="breadcrumbs__link">
            Корзина
           </a>
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText  v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя"/>
            <BaseFormText  v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес"/>
            <BaseFormText  v-model="formData.phone" :error="formError.phone" title="Телефон" type="tel" placeholder="Введите ваш телефон"/>
            <BaseFormText  v-model="formData.email" :error="formError.email" title="Email" type="email" placeholder="Введите ваш Email"/>
            <BaseFormTextarea title="Комментарий к заказу" v-model="formData.comment" v-bind:error="formError.comment" placeholder="Ваши пожелания"/>
            <!-- <label class="form__label">
              <input class="form__input" type="text" name="name" placeholder="Введите ваше полное имя">
              <span class="form__value">ФИО</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="text" name="address" placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="tel" name="phone" placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error">Неверный формат телефона</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="email" name="email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
            </label>

            <label class="form__label">
              <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания"></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label> -->
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" checked="" :value="1" v-model="formData.deliveryTypeId">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" :value="2" v-model="formData.deliveryTypeId ">
                  <span class="options__value">
                    Курьером <b>1200 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" checked="" :value="1" v-model="formData.paymentTypeId">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" :value="2" v-model="formData.paymentTypeId">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>

              </li>
            </ul>
          </div>
        </div>
        <OrderList></OrderList>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
           {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue'
import BaseFormTextarea from '@/components/BaseFormTextarea.vue'
import axios from 'axios'
import { API_BASE_URL } from '@/baseUrl'
import OrderList from '@/components/OrderList.vue';

export default {
  data(){
    return {
      formData: {
        name: '',
        address: '',
        phone: '',
        email: '',
        deliveryTypeId: 1,
        paymentTypeId: 1,
        comment: '',
      },
      formError: {},
      formErrorMessage: '',
      orderSending: false,
    }
  },
  components: {BaseFormText, BaseFormTextarea, OrderList},
  methods: {
    order(){
      this.orderSending = true;
      this.formError = {}
      this.formErrorMessage = ''
      axios
      .post(API_BASE_URL+'/api/orders',{
        ...this.formData
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey  //this.$store.state.userAccessKey берем ключ из глобального хранилища
        }
      })
      .then(response => {
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data)
        this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
      })
      .catch(error => {
        this.formError = error.response.data.error.request || {}  // если ошибок нет , то запишим пустой объект
        if (error.response.data.error.message)
        {
          this.formErrorMessage = error.response.data.error.message
          return
        }
        if (error.response.data.error.request.paymentTypeId){
          this.formErrorMessage = error.response.data.error.request.paymentTypeId
        }
        // if (error.response.data.error.request.hasOwnProperty('paymentTypeId')){
        //   this.formErrorMessage = error.response.data.error.request.paymentTypeId
        // }
        else {
          this.formErrorMessage = error.response.data.error.message
        }

      })
      .then(() => this.orderSending =  false);
    }
  }
}

</script>
