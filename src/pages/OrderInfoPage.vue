<template>
  <main class="content container">
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

      <h1 class="content__title">
        Заказ оформлен <span>№ {{$store.state.orderInfo.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{$store.state.orderInfo.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{$store.state.orderInfo.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{$store.state.orderInfo.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{$store.state.orderInfo.paymentType}}
              </span>
            </li>
          </ul>
        </div>
        <OrderInfoList :products="$store.state.orderInfo"/>
      </form>
    </section>
  </main>

</template>

<script>
  import OrderInfoList from '@/components/OrderInfoList.vue';
  export default {
    components: {OrderInfoList},
    created(){
      if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
        return
      }
      this.$store.dispatch('loadOrderInfo', this.$route.params.id) // через хук инициируем это действие
    }
  }
</script>

