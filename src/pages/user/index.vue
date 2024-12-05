<script lang="ts">
import { userSetup } from "./userSetup";

export default {
  name: "user",
  setup() {
    return userSetup();
  },
};
</script>

<template>
  <view class="container">
    <view v-if="userDetail">
      <view class="u-flex user-box" style="padding: 32rpx 0rpx 16rpx 16rpx">
        <view>
          <image class="avatar" :src="userDetail.avatarUrl" mode="aspectFill" />
        </view>
        <view style="padding-left:16rpx; flex:1">
          <view>
            {{ userDetail.name }}
          </view>
          <view v-if="userDetail" class="u-tips-color">
            用户编号:{{ userDetail.id }}
          </view>
        </view>
        <view>
          <image class="setting" style="padding-right:16rpx;" :src="'/static/setting.ico'" mode="aspectFill" @click="UserInfoClick" />
        </view>
      </view>
      <uni-grid :column="3">
        <uni-grid-item>
          <view class="item" @click="go('/pages/order/index?status=0')">
            <uni-icons type="shop" :size="46" color="#a78845"></uni-icons>
            <view class="grid-text">待支付</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item" @click="go('/pages/order/index?status=1')">
            <uni-icons type="cart" :size="46" color="#a78845"></uni-icons>
            <view class="grid-text">待发货</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item" @click="go('/pages/order/index?status=2')">
            <uni-icons type="gift" :size="46" color="#a78845"></uni-icons>
            <view class="grid-text">已发货</view>
          </view>
        </uni-grid-item>
      </uni-grid>
      <view>
        <uni-list :border="true">
          <uni-list-item link :to="'/pages/index/index?key=collection'">
            <template v-slot:header>
              <uni-icons type="heart" :size="46" color="#a78845"></uni-icons>
            </template>
            <template v-slot:body>
              <view class="slot-box">
                <text class="slot-text">我的收藏</text>
              </view>
            </template>
          </uni-list-item>
          <uni-list-item link :to="'/pages/index/index?key=address'">
            <template v-slot:header>
              <uni-icons type="map" :size="46" color="#a78845"></uni-icons>
            </template>
            <template v-slot:body>
              <view class="slot-box">
                <text class="slot-text">收货地址</text>
              </view>
            </template>
          </uni-list-item>
          <uni-list-item link :to="'/pages/index/index?key=aboutus'">
            <template v-slot:header>
              <uni-icons type="contact" :size="46" color="#a78845"></uni-icons>
            </template>
            <template v-slot:body>
              <view class="slot-box">
                <text class="slot-text">关于我们</text>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
      <view class="version">version {{ userDetail.version }}</view>
    </view>
    <view v-else>
      <page-box-empty
        title="请先登陆"
        sub-title="登陆以后才能访问用户中心"
        :show-btn="true"
        btn-title="立即登陆"
        url="/pages/index/index"
      />
    </view>
  </view>
</template>

<style scoped lang="scss">
@import url("./user.scss");
</style>
