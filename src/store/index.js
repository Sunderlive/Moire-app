import axios from 'axios'
import { createStore } from 'vuex'
import { API_BASE_URL } from '@/baseUrl'

const store = createStore({
  // работая с хранилищем Vuex запрещается напрямую изменять любые свойства состояния, поэтому мутации
  // изменять состояние можно только в обработчиках мутации
  state () {
    return {
      cartProducts: [],
      cartProductsData: [],
      userAccessKey: null,
      cartLoading: null,
    }
  },
  mutations: {
    updateOrderInfo(state, orderInfo){
      state.orderInfo = orderInfo
    },
    updateCartProductAmount(state,{productId, amount}){
      const item = state.cartProducts.find(item => item.productId === productId)
      if(item){
        item.amount = amount
      }
    },
    resetCart(state) {
      state.cartProducts = [],
      state.cartProductsData = []
    },
    updateUserAccessKey(state, accessKey){
      state.userAccessKey = accessKey
    },
    updateCartProductsData(state, items){
      state.cartProductsData = items
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        item: {
          basketItemId: item.id,
          product: item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        },
      }));
    },
  },
  getters: {
    cartDetailProducts(state){
      return state.cartProducts.map((item) => item.item);
    },
    cartTotalPrice(state, getters){
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.quantity + acc,
        0,
      );
    },
    cartTotalQuantity(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item.quantity + acc, 0);
    },
  },
  actions: {
    loadOrderInfo(context, orderId){
      return axios
      .get(API_BASE_URL+`/api/orders/`+ orderId, {
        params:{
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateOrderInfo', response.data)
      })
    },
    addProductToCart(context, {productId, amount, colorId, sizeId}){
      return (new Promise(resolve => setTimeout(resolve,0)))
        .then(()=> {
          return axios //асинхронные операции лучше возвращать
          .post(API_BASE_URL+`/api/baskets/products`, {
              productId: productId,
              quantity: amount,
              colorId: colorId,
              sizeId: sizeId,
            },{
              params: {
                userAccessKey: context.state.userAccessKey
              }
            })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items)
              context.commit('syncCartProducts')
            })})
      },
    loadCart(context){
      this.state.cartLoading = true;
      return axios
      .get(API_BASE_URL+`/api/baskets`, {
        params:{
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        if(!context.state.userAccessKey) {
        localStorage.setItem('userAccessKey', response.data.user.accessKey)
        context.commit('updateUserAccessKey', response.data.user.accessKey)
        }
        context.commit('updateCartProductsData', response.data.items)
        context.commit('syncCartProducts', response.data.items)
      })
      .then(() => {
        this.state.cartLoading = false;
      })
    },
    updateCartProductAmount(context, {productId , amount}){
      context.commit('updateCartProductAmount', {productId, amount})
      if(amount <1){
        return
      }
      return axios //асинхронные операции лучше возвращать
        .put(API_BASE_URL+`/api/baskets/products`, {
            basketItemId: productId,
            quantity: amount
          },{
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
          .then(response => {
            context.commit('updateCartProductsData', response.data.items)
            context.commit('syncCartProducts')
          })
    },
    deleteCartProduct(context, basketItemId) {
      return axios
        .delete(API_BASE_URL+`/api/baskets/products`, {
          data: {
            basketItemId,
          },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },

})

export default store

