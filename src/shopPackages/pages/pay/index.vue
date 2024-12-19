<template>
  <view class="to-pay-order">
    <uni-section
      class="shop-section"
      title="配送地址"
      type="line"
    ></uni-section>
    <u-cell
      v-if="!defaultAddress"
      icon="map"
      title="新增收货地址"
      @click="addAddress"
    ></u-cell>
    <u-cell
      v-else
      icon="map"
      :title="defaultAddress.info.linkMan + ' ' + defaultAddress.info.mobile"
      :label="
        defaultAddress.info.provinceStr +
        defaultAddress.info.cityStr +
        defaultAddress.info.areaStr +
        defaultAddress.info.address
      "
      @click="selAddress"
    ></u-cell>
    <uni-section
      class="shop-section"
      title="商品信息"
      type="line"
    ></uni-section>
    <view class="order">
      <view class="item" v-for="(item, index) in goodsList" :key="'a' + index">
        <view class="left"
          ><image :src="item.pic" mode="aspectFill"></image
        ></view>
        <view class="content">
          <view class="title u-line-2">{{ item.goodsName }}</view>
          <view class="right">
            <view class="price"> ￥{{ item.price }} </view>
            <view class="number">x{{ item.number }}</view>
          </view>
        </view>
      </view>
      <view class="total">
        共 {{ goodsNumber }} 件商品 合计:
        <text class="total-price"> ￥{{ goodsPrice }} </text>
      </view>
    </view>
    <uni-section
      class="shop-section"
      title="订单备注"
      type="line"
    ></uni-section>
    <view class="remark">
      <u-input
        v-model="remark"
        type="textarea"
        :auto-height="true"
        clearable
        placeholder="订单备注(选填)"
      />
    </view>
    <template v-if="orderInfo">
      <uni-section
        class="shop-section"
        title="合计"
        type="line"
      ></uni-section>
      <u-cell
        title="商品金额"
        :value="'¥' + orderInfo.amountTotle"
        :arrow="false"
      ></u-cell>
      <u-cell
        title="配送费"
        :value="'¥' + orderInfo.amountLogistics"
        :arrow="false"
      ></u-cell>
      <u-cell
        title="总计"
        :value="'¥' + orderInfo.amountReal"
        :arrow="false"
      ></u-cell>
    </template>
    <view class="submit safe-area-inset-bottom">
      <u-button type="success" @click="submit" :disabled="!canSubmit"
        >提交订单</u-button
      >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mod: undefined,
      defaultAddress: undefined,
      goodsList: undefined,
      goodsNumber: 0,
      goodsPrice: 0,
      remark: "",
      canSubmit: false,
      orderInfo: undefined,
    };
  },
  onLoad(e) {
    this.mod = e.mod;
    if (e.mod == "cart") {
      this.readCart();
    }
    if (e.mod == "buy") {
      // this.goodsList = uni.getStorageSync("goodsList");
      this.goodsList = [
        {
          key: 1,
          goodsId: 123,
          goodsName: "牛腩肉",
          number: 1,
          pic: "/static/logo.png",
          price: 50,
        },
      ];
      this.goodsList.forEach((ele) => {
        this.goodsNumber += ele.number;
        this.goodsPrice += ele.price;
      });
      this.calculatePrice();
    }
  },
  onShow() {
    this._defaultAddress();
  },
  methods: {
    addAddress() {
      uni.navigateTo({
        url: "/packages/pages/address/addSite",
      });
    },
    selAddress() {
      uni.navigateTo({
        url: "/packages/pages/address/index",
      });
    },
    _defaultAddress() {
      this.defaultAddress = {
        info: {
          linkMan: "张三",
          mobile: "13800000000",
          provinceStr: "广东省",
          cityStr: "广州市",
          areaStr: "海珠区",
          address: "XX路XX号XX小区XX栋XX单元XX室",
        },
      };
      this.calculatePrice();
    },
    readCart() {
      this.goodsList = [
        {
          key: 1,
          goodsId: 123,
          goodsName: "牛腩肉",
          number: 3,
          pic: "/static/logo.png",
          price: 150,
        },
        {
          key: 2,
          goodsId: 456,
          goodsName: "牛肠头",
          number: 2,
          pic: "/static/logo.png",
          price: 200,
        },
      ];
      this.goodsNumber = 2;
      this.goodsPrice = 350;
      this.calculatePrice();
    },
    calculatePrice() {
      this.canSubmit = false;
      if (!this.goodsList || this.goodsList.length == 0) {
        return;
      }
      this.canSubmit = true;
      this.orderInfo = {
        amountTotle: 150,
        amountLogistics: 20,
        amountReal: 170,
      };
    },
    submit() {
      this.canSubmit = false;
      if (!this.goodsList || this.goodsList.length == 0) {
        return;
      }
      uni.showToast({
        title: "下单成功",
      });
    },
    pay(orderInfo) {
      uni.showToast({
        title: "支付成功 => " + orderInfo.amountReal,
      });
      uni.redirectTo({
        url: "/packages/pages/order/index?status=1",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./pay.scss";
</style>
