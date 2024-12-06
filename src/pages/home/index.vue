<script>
import { ref } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import CompSearch from "@/components/comp-search/comp-search.vue";
import CompProductList from "@/components/comp-product-list/comp-product-list.vue";
import CompLoading from "@/components/comp-loading/comp-loading.vue";

export default {
  name: "home",
  components: { CompSearch, CompProductList, CompLoading },
  setup() {
    const swiperProps = ref({});
    const swiperItems = ref([]);
    const storeTypeIndex = ref(0);
    const storeTypeOption = ref(["默认店类型", "火锅店", "串串店", "烧烤店"]);
    const productTypeIndex = ref(0);
    const productTypeOption = ref([
      "默认品类",
      "牛肉品类",
      "鸡肉品类",
      "猪肉品类",
    ]);
    const priceIndex = ref(0);
    const priceOption = ref(["默认价格", "价格低序", "价格高序"]);
    const productList = ref([]);
    const showLoading = ref(false);

    swiperProps.value = {
      showDot: true,
      autoPlay: true,
      interval: 2000,
      duration: 500,
    };
    swiperItems.value.push({
      id: 0,
      url: "/static/logo.png",
    });
    swiperItems.value.push({
      id: 1,
      url: "/static/mario.jpg",
    });
    swiperItems.value.push({
      id: 2,
      url: "/static/setting.ico",
    });

    function clickSwiper(item) {
      uni.showModal({
        title: "点击图片",
        content: `id:${item.id},url:${item.url}`,
        showCancel: false,
      });
    }

    function handleSearch(value) {
      console.log("搜索 => ", value);
      uni.showModal({
        title: "搜索",
        content: `内容:${value}`,
        showCancel: false,
      });
    }

    function storeTypeChange(event) {
      storeTypeIndex.value = event.detail.value;
      uni.showToast({
        title: `选择${storeTypeOption.value[storeTypeIndex.value]}`,
        icon: "none",
      });
    }

    function productTypeChange(event) {
      productTypeIndex.value = event.detail.value;
      uni.showToast({
        title: `选择${productTypeOption.value[productTypeIndex.value]}`,
        icon: "none",
      });
    }

    function priceChange(event) {
      priceIndex.value = event.detail.value;
      uni.showToast({
        title: `选择${priceOption.value[priceIndex.value]}`,
        icon: "none",
      });
    }

    function handleProductClick(product) {
      uni.navigateTo({
        url: `../goods/details?id=${product.id}`,
      });
    }

    function handleProductAdd(product) {
      uni.showModal({
        title: "添加产品",
        content: `名称:${product.name},价格:${product.price}`,
        showCancel: false,
      });
    }

    function loadingMoreProduct() {
      productList.value.push({
        id: 0,
        checked: false,
        name: "产品1",
        comment:
          "产品1的描述XXXXXXXXXXXXXXXXXXXXXXc好滴哦娃都会哦啊我第几啊我i骄傲我i多久啊我哦i大",
        type: "款式1",
        price: 20,
        url: "/static/logo.png",
        num: 1,
      });
      productList.value.push({
        id: 1,
        checked: false,
        num: 1,
        name: "产品2",
        comment: "产品2的描述XXXXXXXXXXXXXXXXXXXXXX",
        type: "款式2",
        price: 30,
        url: "/static/mario.jpg",
      });
      productList.value.push({
        id: 2,
        checked: false,
        num: 1,
        name: "产品3",
        comment: "产品3的描述XXXXXXXXXXXXXXXXXXXXXX",
        type: "款式3",
        price: 40,
        url: "/static/setting.ico",
      });
    }

    loadingMoreProduct();
    onReachBottom(() => {
      if (!showLoading.value) {
        showLoading.value = true;
        setTimeout(() => {
          loadingMoreProduct();
          showLoading.value = false;
        }, 3000);
      }
    });

    return {
      swiperProps,
      swiperItems,
      storeTypeIndex,
      storeTypeOption,
      productTypeIndex,
      productTypeOption,
      priceIndex,
      priceOption,
      productList,
      showLoading,
      clickSwiper,
      handleSearch,
      storeTypeChange,
      productTypeChange,
      priceChange,
      handleProductClick,
      handleProductAdd,
      loadingMoreProduct,
    };
  },
};
</script>

<template>
  <view class="container">
    <view class="page-header">
      <CompSearch placeholder="肚条 火热售卖中" @handle-search="handleSearch" />
      <view class="uni-margin-wrap">
        <swiper
          class="swiper"
          :circular="true"
          :indicator-dots="swiperProps.showDot"
          :autoplay="swiperProps.autoPlay"
          :interval="swiperProps.interval"
          :duration="swiperProps.duration"
        >
          <swiper-item
            v-for="(item, index) in swiperItems"
            :key="index"
            @click="clickSwiper(item)"
          >
            <view class="swiper-item uni-bg-red">
              <image :src="item.url" mode="fill" />
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="page-container">
      <view class="row-style">
        <view class="row-item">
          <picker
            @change="storeTypeChange"
            :value="storeTypeIndex"
            :range="storeTypeOption"
          >
            <view class="uni-input">{{ storeTypeOption[storeTypeIndex] }}</view>
          </picker>
        </view>
        <view class="row-item">
          <picker
            @change="productTypeChange"
            :value="productTypeIndex"
            :range="productTypeOption"
          >
            <view class="uni-input">{{
              productTypeOption[productTypeIndex]
            }}</view>
          </picker>
        </view>
        <view class="row-item">
          <picker
            @change="priceChange"
            :value="priceIndex"
            :range="priceOption"
          >
            <view class="uni-input">{{ priceOption[priceIndex] }}</view>
          </picker>
        </view>
      </view>
      <CompProductList
        :productList="productList"
        @handle-click="handleProductClick"
        @handle-add="handleProductAdd"
      />
      <view class="page-bottom">
        <CompLoading
          class="page-loading"
          :style="{ display: `${showLoading ? '' : 'none'}` }"
        />
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
@import url("./home.scss");
</style>
