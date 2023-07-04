<template>
  <main class="content container" style="margin-bottom: 500px;" v-if="productLoading"><svg class="ring" viewBox="25 25 50 50" stroke-width="5"><circle cx="50" cy="50" r="20" /></svg></main>
  <main class="content container" v-else-if="!productData">Не удалось загрузить товар</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'mainPage' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            {{ product.category.title }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img :src="currentImage" :alt="currentImage">
        </div>
        <ul class="pics__list">
          <li class="pics__item " v-for="image in product.colors" :key="image.id" @click.prevent="changeImage(image)">
            <a href="" class="pics__link "
              :class="{ 'pics__link--current': currentImage === (image.gallery ? image.gallery[0].file.url : noImage) }">
              <img :src="(image.gallery ? image.gallery[0].file.url : noImage)" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <ProductCounter v-model:amount='productAmount'></ProductCounter>
              <b class="item__price">
                {{ product.price }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in product.colors" :key="color.color.id"
                    @click.prevent="changeColor(color)">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.color.id"
                        >
                      <span class="colors__val" :class="{ 'colors__select': currentColorId === color.color.id }"
                        :style="{ 'background-color': color.color.code }">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>
              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" name="category" v-model.number="currentSizeId">
                    <!-- type="text" -->
                    <option v-for="size in product.sizes" :key="size.id" :value="size.id">{{ size.title }}</option>
                    <!-- <option value="value2">40-42</option>
                    <option value="value3">42-50</option> -->
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Добавление товара в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p style="margin-bottom: 0;" v-for="material in product.materials" :key="material.id">
            {{ material.title }}
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/baseUrl';
import { mapActions } from 'vuex';
import noImage from '@/assets/noPhoto.png'
import ProductCounter from '@/components/ProductCounter.vue';

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,
      productAdded:false,
      productLoading: false,
      productLoadingFailed: false,
      currentColorId: 0,
      currentSizeId: 0,
      currentImage: 0,
      noImage,
    };
  },
  computed: {
    product() {
      return this.productData;
    },
  },
  methods: {
    ...mapActions(["addProductToCart"]),
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(API_BASE_URL + `/api/products/` + this.$route.params.id)
        .then(response => this.productData = response.data)
        .catch(() => this.productLoadingFailed = true)
        .then(() => {
          this.currentColorId = this.productData.colors[0].color.id;
          this.currentSizeId = this.productData.sizes[0].id;
          if (this.productData.colors[0].gallery == null) {
            this.currentImage = this.noImage;
          }
          else {
            this.currentImage = this.productData.colors[0].gallery[0].file.url;
          }
          this.productLoading = false;
        });
    },
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount, colorId: this.currentColorId, sizeId: this.currentSizeId })
        .then(() => {
          this.isShowAddedMessage = true;
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    changeColor(value) {
      if (value.color)
        this.currentColorId = value.color.id;
      if (typeof value.gallery !== "undefined") {
        if (value.gallery) {
          this.currentImage = value.gallery[0].file.url;
        }
        else {
          this.currentImage = noImage; // доделать кнопки
        }
      }
    },
    changeImage(value) {
      if (typeof value.gallery !== "undefined") {
        if (value.gallery) {
          this.currentImage = value.gallery[0].file.url;
        }
        else {
          this.currentImage = noImage;
        }
      }
      if (value.color)
        this.currentColorId = value.color.id;
    }
  },
  created() {
    this.loadProduct();
  },
  beforeRouteUpdate() {
    this.loadProduct();
  },
  components: { ProductCounter }
}

</script>

<style>
.pics__wrapper img {
  width: 570px;
  height: 570px;
}

.colors__val,
.colors__val::before {
  border-radius: 50%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.colors__val {
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid #222;
}

.colors__val::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26px;
  height: 26px;
  border: 1px solid transparent;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.colors__label:focus .colors__val,
.colors__label:hover .colors__val {
  border-color: transparent;
}

.colors__label:focus .colors__val::before,
.colors__label:hover .colors__val::before {
  border-color: #222;
}

.colors__radio:focus~.colors__val::before {
  opacity: 0.7;
}

.colors__select::before {
  border-color: #222;
}</style>

