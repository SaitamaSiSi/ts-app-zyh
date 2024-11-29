<script lang="ts">

import { userMainSetup } from './userMainSetup'

export default {
  name: "user",
  setup() {
    return userMainSetup();
  },
};
</script>

<template>
  <view class="container">
    <view class="row-style">
      <image class="avatar-style" src="/static/mario.jpg" />
      <text class="name-style">{{ userInfo.realName }}</text>
      <image class="setting-btn" src="/static/setting.ico" @click="UserInfoClick" />
    </view>
    <view class="row-style">
      <text class="item-style" @click="OtherClick">{{ `商品收藏 ${pageInfo.porductCollectNum}` }}</text>
      <text class="item-style" @click="OtherClick">{{ `店铺收藏 ${pageInfo.storeCollectNum}` }}</text>
      <text class="item-style" @click="OtherClick">{{ `我的足迹 ${pageInfo.historyNum}` }}</text>
    </view>
    <view class="row-style">
      <view class="custom-btn" @click="OtherClick">
        <image class="btn-img" src="/static/setting.ico" />
        <text class="btn-text">待付款</text>
      </view>
      <view class="custom-btn" @click="OtherClick">
        <image class="btn-img" src="/static/setting.ico" />
        <text class="btn-text">待收货</text>
      </view>
      <view class="custom-btn" @click="OtherClick">
        <image class="btn-img" src="/static/setting.ico" />
        <text class="btn-text">待评价</text>
      </view>
      <view class="custom-btn" @click="OtherClick">
        <image class="btn-img" src="/static/setting.ico" />
        <text class="btn-text">退换/售后</text>
      </view>
      <view class="custom-btn" @click="OtherClick">
        <image class="btn-img" src="/static/setting.ico" />
        <text class="btn-text">全部订单</text>
      </view>
    </view>
    <scroll-view class="scroll-view-style" scroll-x="true">
      <view class="scroll-row-style">
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">客户服务</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">我的预约</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">红包超人</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">问医生</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">我的问答</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">闲置换钱</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">充值中心</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">省省卡</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">领福利</text>
        </view>
        <view class="scroll-item-style" @click="OtherClick">
          <image class="btn-img" src="/static/setting.ico" />
          <text class="btn-text">淘东快递</text>
        </view>
      </view>
    </scroll-view>
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

.avatar-style {
  height: 90rpx;
  width: 90rpx;
  margin: 5rpx;
}

.name-style {
  flex-grow: 1;
  font-size: 36rpx;
  color: #000000;
  text-align: left;
  margin-left: 10rpx;
}

.setting-btn {
  height: 50rpx;
  width: 50rpx;
  margin: 40rpx 20rpx 10rpx 10rpx;
}

.item-style {
  margin: 10rpx;
  flex: 1;
  font-size: 24rpx;
  text-align: center;
}

.custom-btn {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-img {
  width: 50rpx;
  height: 50rpx;
}

.btn-text {
  font-size: 16rpx;
}

.scroll-view-style {
  height: 100rpx;
  white-space: nowrap;
  overflow-x: auto;
}

.scroll-row-style {
  height: 100%;
  display: flex;
}

.scroll-item-style {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 100rpx;
}

</style>
