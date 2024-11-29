<script>
import {
  ref,
} from "vue";
import { storeMainSetup } from "./storeMainSetup.ts";

export default {
  name: "store",
  setup() {
    var editBtnText = ref("编辑");
    var products = ref([]);

    function EditClick() {
      editBtnText.value = editBtnText.value === "编辑" ? "完成" : "编辑";
    }

    function StoreClick(item) {
      uni.showModal({
        title: '跳转店家页面',
        content: `【${item.store}】店铺`,
        showCancel: false
      })
    }

    function ProductClick(item) {
      uni.showModal({
        title: '跳转商品页面',
        content: `【${item.store}】店铺的【${item.name}】商品,选购类型为【${item.type}】,单价【${item.price}】元,数量【${item.num}】`,
        showCancel: false
      })
    }

    function clickChange(item) {
      item.checked = !item.checked
    }

    function clearClick() {
      uni.showToast({
        title: '清空',
        icon: 'success'
      })
      products.value = []
    }

    function deleteClick() {
      var checkedIds = []
      products.value.forEach(item => {
        if (item.checked) {
          checkedIds.push(item.id)
        }
      });
      uni.showModal({
        title: '删除',
        content: checkedIds.join(','),
        showCancel: false
      })
      products.value = products.value.filter(item => !checkedIds.includes(item.id))
    }

    function buyClick() {
      uni.showToast({
        title: '购买',
        icon: 'success'
      })
      for (var i = 0; i < 30; i++) {
        products.value.push({
          id: i,
          checked: false,
          store: '商家' + i,
          name: "商品" + i,
          type: '款式' + i,
          price: "单价" + i,
          num: '数量' + i
        })
      }
    }

    return {
      editBtnText,
      products,
      EditClick,
      StoreClick,
      ProductClick,
      clickChange,
      clearClick,
      deleteClick,
      buyClick,
      ...storeMainSetup()
    };
  },
};
</script>

<template>
  <view class="container">
    <view class="row-style">
      <div style="flex-grow: 1;" />
      <button class="item-style" type="primary" @click="EditClick">{{ editBtnText }}</button>
    </view>
    <view v-if="products.length === 0" style="height: calc(100% - 200rpx);display: flex;justify-content: space-between;align-items: center;text-align: center;">
      <text style="width:100%;font-size: 48rpx;">未添加商品</text>
    </view>
    <scroll-view v-else class="scroll-view-style" scroll-y="true">
      <view class="scroll-row-style" v-for="(item, index) in products" :key=index>
        <checkbox style="margin-left: 10rpx;" :checked="item.checked" @click="clickChange(item)" />
        <view style="display: flex;flex-direction: column;flex-grow: 1;margin-left: 10rpx;">
          <text style="font-size: 28rpx;" @click="StoreClick(item)">{{ item.store }}</text>
          <view class="scroll-item-style">
            <image class="btn-img" src="/static/setting.ico" @click="ProductClick(item)" />
            <view class="vertical-text" style="flex-grow: 1;margin-left: 20rpx;">
              <text style="font-size: 24rpx;">{{ item.name }}</text>
              <text style="font-size: 18rpx;">{{ item.type }}</text>
              <view style="display: flex;flex-direction: row;">
                <text style="font-size: 18rpx;">{{ item.price }}</text>
                <div style="flex-grow: 1;" />
                <text style="font-size: 24rpx;margin-right: 100rpx;">{{ item.num }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="row-style">
      <div style="flex-grow: 1;" />
      <button v-if="editBtnText === '完成'" class="item-style" type="primary" @click="clearClick">清空</button>
      <button v-if="editBtnText === '完成'" class="item-style" type="primary" @click="deleteClick">删除</button>
      <button v-if="editBtnText === '编辑'" class="item-style" type="primary" @click="buyClick">购买</button>
    </view>
  </view>
</template>

<style>
.container {
  width: 100%;
  height: 100%;
  background-color: gray;
}

.row-style {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.item-style {
  margin: 10rpx;
  font-size: 24rpx;
  text-align: center;
}

.scroll-view-style {
  height: 100%;
}

.scroll-row-style {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.scroll-item-style {
  width: 100%;
  height: 100rpx;
  display: flex;
  margin-bottom: 5rpx;
}

.btn-img {
  width: 100rpx;
  height: 100rpx;
}

.vertical-text {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin-left: 20rpx;
}
</style>
