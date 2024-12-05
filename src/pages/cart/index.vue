<script>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

export default {
  name: "cart",
  setup() {
    const options = ref([
      {
        text: "删除",
        style: {
          backgroundColor: "#dd524d",
        },
      },
    ]);

    const shippingCarInfo = ref({
      number: 2, // 商品合计
      price: 30, // 合计价格
      items: [
        {
          id: 1, // 商品id
          pic: "/static/mario.jpg", // 商品图片
          name: "mario", // 商品名称
          sku: [], // 商品规格
          additions: [], // 商品属性
          number: 1, // 商品数量
          minBuyNumber: 1, // 商品最小购买数量
          stores: 10, // 商品库存
          price: 10, // 商品价格
        },
        {
          id: 2, // 商品id
          pic: "/static/logo.png", // 商品图片
          name: "logo", // 商品名称
          sku: [], // 商品规格
          additions: [], // 商品属性
          number: 1, // 商品数量
          minBuyNumber: 1, // 商品最小购买数量
          stores: 10, // 商品库存
          price: 20, // 商品价格
        },
      ],
    });

    function caculateCarInfo() {
      let totalNum = 0;
      let totalPrice = 0;
      shippingCarInfo.value.items.forEach((item) => {
        totalNum += item.number;
        totalPrice += item.number * item.price;
      });
      shippingCarInfo.value.number = totalNum;
      shippingCarInfo.value.price = totalPrice;
    }

    // 商品数量改变
    function numberChange() {
      caculateCarInfo();
    }

    // 点击商品
    function onClick(event, index) {
      shippingCarInfo.value.items = shippingCarInfo.value.items.filter(
        (item) => item.id !== index
      );
      caculateCarInfo();
    }

    // 购买
    function onSubmit() {
      uni.showToast({
        title: "提交",
        icon: "success",
      });
    }

    onShow(() => {});

    return {
      options,
      shippingCarInfo,
      caculateCarInfo,
      numberChange,
      onClick,
      onSubmit,
    };
  },
};
</script>

<template>
  <view class="container">
    <comp-page-box-empty
      v-if="!shippingCarInfo || shippingCarInfo.number == 0"
      title="您还没有挑选任何商品"
      sub-title="可以去看看有那些想买的～"
      :show-btn="true"
    />
    <view v-else class="order">
      <uni-swipe-action>
        <uni-swipe-action-item
          :index="index"
          v-for="(item, index) in shippingCarInfo.items"
          :key="index"
          @click="onClick($event, item.id)"
          :right-options="options"
        >
          <view class="item">
            <view class="left">
              <image :src="item.pic" mode="aspectFill"></image>
            </view>
            <view class="content">
              <view class="title">{{ item.name }}</view>
              <view class="type">
                <text v-for="(item2, index2) in item.sku" :key="'b' + index2"
                  >{{ item2.optionName }}:{{ item2.optionValueName }}/</text
                >
                <text
                  v-for="(item3, index3) in item.additions"
                  :key="'c' + index3"
                  >{{ item3.pname }}:{{ item3.name }}/</text
                >
              </view>
              <view class="delivery-time">
                <uni-number-box
                  v-model="item.number"
                  :index="index"
                  :min="item.minBuyNumber"
                  :max="item.stores"
                  @change="numberChange"
                ></uni-number-box>
              </view>
            </view>
            <view class="right">
              <view class="price"> ￥{{ item.price }} </view>
            </view>
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>
      <view class="total">
        共 {{ shippingCarInfo.number }} 件商品 合计:
        <text class="total-price"> ￥{{ shippingCarInfo.price }} </text>
      </view>
      <view v-if="shippingCarInfo && shippingCarInfo.number > 0" class="submit">
        <button type="error" @click="onSubmit">提交订单</button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
@import url("./cart.scss");
</style>
