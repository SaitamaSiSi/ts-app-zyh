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
    const gameIndex = ref(0);
    const gameOption = ref(["请选择", "贪吃蛇"]);
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

    function handleScan() {
      uni.scanCode({
        success: (res) => {
          // console.log(`scanType:${res.scanType}`);
          // console.log(`charSet:${res.charSet}`);
          // console.log(`errMsg:${res.errMsg}`);
          // console.log(`rawData:${res.rawData}`);
          // console.log(`result:${res.result}`);
          if (res.scanType == "QR_CODE") {
            if (res.charSet.toUpperCase() == "UTF-8") {
              let object = JSON.parse(res.result.replace(/\'/g, '"'));
              uni.showModal({
                title: "产品信息",
                // content: `名称:${object.name}\r\n序列:${object.serial_number}\r\n位置:${object.location}\r\n状态:${object.status}`,
                content: JSON.stringify(object),
                showCancel: false,
              });
            } else {
              uni.showModal({
                title: "charSet错误",
                content: res.charSet,
                showCancel: false,
              });
            }
          } else {
            uni.showModal({
              title: "scanType错误",
              content: res.scanType,
              showCancel: false,
            });
          }
        },
        fail: (e) => {
          uni.showModal({
            title: "fail",
            content: e,
            showCancel: false,
          });
        },
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
    
    function gameChange(event) {
      gameIndex.value = event.detail.value;
      uni.showToast({
        title: `选择${gameOption.value[gameIndex.value]}`,
        icon: "none",
      });
    }

    function handleGameStart() {
      switch (gameIndex.value) {
        case '1': {
          uni.navigateTo({
            url: '/gamePackages/pages/snake/index'
          });
          break;
        }
        default: {
          uni.showToast({ title: '请先选择游戏', icon: 'none' });
          break;
        }
      }
    }

    function handleProductClick(product) {
      uni.showModal({
        title: "点击产品",
        content: `名称:${product.name},价格:${product.price}`,
        showCancel: false,
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
      gameIndex,
      priceOption,
      gameOption,
      productList,
      showLoading,
      clickSwiper,
      handleScan,
      handleSearch,
      storeTypeChange,
      productTypeChange,
      priceChange,
      gameChange,
      handleGameStart,
      handleProductClick,
      handleProductAdd,
      loadingMoreProduct,
    };
  },
};
</script>

<template>
    <view class="container" v-if="false">
    <view class="page-header">
      <CompSearch placeholder="肚条 火热售卖中" @handle-search="handleSearch" @handle-scan="handleScan" />
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
  <view class="game-container">
    <!-- 游戏选择区域 -->
    <view class="filter-section game-section">
        <picker
          class="game-picker"
          @change="gameChange"
          :value="gameIndex"
          :range="gameOption"
        >
          <view class="uni-input">{{ gameOption[gameIndex] }}</view>
        </picker>
        <button class="game-button" @click="handleGameStart">进入游戏</button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.game-container {
  padding: 20rpx;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);

  .row-item {
    flex: 1;
    min-width: 200rpx;
  }
}

.game-picker {
  background: #f5f5f5;
  border-radius: 8rpx;
  padding: 16rpx 24rpx;
  font-size: 28rpx;
}

.game-button {
  width: 100%;
  background: #007AFF;
  color: white;
  border-radius: 8rpx;
  padding: 16rpx 32rpx;
  font-size: 28rpx;
  transition: all 0.3s;

  &:active {
    background: #0051ff;
    transform: scale(0.98);
  }
}
</style>
