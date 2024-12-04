import type { Module } from 'vuex';
import type { AppGlobalState } from '@/store/modules/types';

/**
 * 初始化state里的数据值
 */
const initState = {
  userInfo: {},
  shopingCart: [],
};
// 标红色的值命名最好和文件名一致
const appGlobal: Module<AppGlobalState, { appGlobal: AppGlobalState }> = {
  namespaced: true,
  state: () =>  ({
    appName: 'WxStore',
    appPrice: 124,
    ...initState,
  }),
  mutations: {
    /**
    * mutations里的方法用于修改state的值，
    * state为原本state的值，param为变化的值
    * 需要注意的是mutations里面的方法是同步的，通过commit调用
    */
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_APP_NAME(state, appName) {
      state.appName = appName;
    },
    ADD_SHOP_CART(state, product) {
      state.shopingCart.push(product);
    },
    DEL_SHOP_CART(state, ids) {
      state.shopingCart = state.shopingCart.filter(item => !ids.includes(item.id))
    },
    CLEAR_SHOP_CART(state) {
      state.shopingCart = [];
    },
  },
  actions: {
    /**
     * actions中一般是接口调用方法或者需要异步操作的函数方法
     * 第一个参数是调用方法，参数params是接口的入参
     * 异步操作时通过dispatch调用
     */
    SetUserInfo({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo);
    },
    SetAppName({ commit }, appName) {
      commit('SET_APP_NAME', appName);
    },
    addShopCart({ commit }, product) {
      commit('ADD_SHOP_CART', product);
    },
    delShopCart({ commit }, ids) {
      commit('DEL_SHOP_CART', ids);
    },
    clearShopCart({ commit }) {
      commit('CLEAR_SHOP_CART');
    },
  },
  getters: {
    /**
     * getters中的方法对state值进行计算，暂时用到的比较少
     */
    doubleCount: (state: AppGlobalState) => state.appPrice * 2,
    getAppName: (state: AppGlobalState) => state.appName,
    getShopingCart: (state: AppGlobalState) => state.shopingCart,
  },
};

export default appGlobal;