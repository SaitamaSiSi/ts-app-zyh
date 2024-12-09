<template>
  <view v-if="goodsDetail" class="goods-detail">
    <u-swiper
      class="swiper"
      :list="goodsDetail.pics"
      name="pic"
      :title="true"
      height="600"
    ></u-swiper>
    <view class="title">
      {{ goodsDetail.basicInfo.name }}
      <text></text>
    </view>
    <view class="title-sub">{{ goodsDetail.basicInfo.name }}</view>
    <view class="amount">
      <text>Ұ</text>
      {{ goodsDetail.basicInfo.price }}
    </view>
    <u-subsection title="商品介绍" :right="false"></u-subsection>
    <view class="content">
      <u-parse :content="goodsDetail.content"></u-parse>
    </view>
    <view class="navigation safe-area-inset-bottom">
      <view class="right">
        <view class="cart btn u-line-1" @click="addCart">加入购物车</view>
        <view class="buy btn u-line-1" @click="buy">立即购买</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsDetail: undefined
    };
  },
  onLoad(e) {
    this._goodsDetail(e.id);
  },
  onShow() {},
  created() {},
  methods: {
    _goodsDetail(goodId) {
      // 返回
      // uni.navigateBack();
      this.goodsDetail = {
        basicInfo: {
          id: goodId,
          name: "牛腩肉",
          pic: "/static/logo.png",
          price: 100,
          buyNumber: 1, // 购买数量
        },
        pics: ["/static/logo.png", "/static/mario.jpg"],
        content: `<p>该商品为1斤每件,来自四川广安邻水县</p>`,
      };
    },
    addCart() {
      if (!getApp().checkHasLogined()) {
        uni.navigateTo({
          url: "/pages/login/index",
        });
        return;
      }
      uni.showModal({
        title: "提示",
        content: `已加入购物车,${this.goodsDetail.basicInfo.id},${this.goodsDetail.basicInfo.buyNumber}件`,
        showCancel: false,
        confirmText: "我知道了",
      });
    },
    buy() {
      if (!getApp().checkHasLogined()) {
        uni.navigateTo({
          url: "/pages/login/index",
        });
        return;
      }

      // 直接加入购物车
      const goodsList = [
        {
          goodsId: this.goodsDetail.basicInfo.id,
          goodsName: this.goodsDetail.basicInfo.name,
          number: this.goodsDetail.basicInfo.buyNumber,
          pic: this.goodsDetail.basicInfo.pic,
          price: this.goodsDetail.basicInfo.price
        },
      ];
      console.log(goodsList);
      // uni.setStorageSync("goodsList", goodsList); // uni.getStorageSync("goodsList", goodsList);
      // uni.navigateTo({
      //   url: "../to-pay-order/index?mod=buy",
      // });
    },
  },
};
</script>
<style scoped lang="scss">
@import "./details.scss";
</style>
