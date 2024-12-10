<template>
  <view v-if="orderDetail" class="to-pay-order">
    <uni-section
      class="shop-section"
      title="配送地址"
      type="line"
    ></uni-section>
    <u-cell
      v-if="orderDetail.logistics"
      icon="map"
      :arrow="false"
      hover-class="none"
      :title="
        orderDetail.logistics.linkMan + ' ' + orderDetail.logistics.mobile
      "
      :label="
        orderDetail.logistics.provinceStr +
        orderDetail.logistics.cityStr +
        orderDetail.logistics.areaStr +
        orderDetail.logistics.address
      "
    ></u-cell>
    <uni-section
      class="shop-section"
      title="商品信息"
      type="line"
    ></uni-section>
    <view class="order">
      <view
        class="item"
        v-for="(item, index) in orderDetail.goods"
        :key="'a' + index"
      >
        <view class="left"
          ><image :src="item.pic" mode="aspectFill"></image
        ></view>
        <view class="content">
          <view class="title u-line-2">{{ item.goodsName }}</view>
          <view class="type">{{ item.property }}</view>
        </view>
        <view class="right">
          <view class="price"> ￥{{ item.amountSingle }} </view>
          <view class="number">x{{ item.number }}</view>
        </view>
      </view>
      <view class="total">
        共 {{ orderDetail.orderInfo.goodsNumber }} 件商品 合计:
        <text class="total-price">
          ￥{{ orderDetail.orderInfo.amountReal }}
        </text>
      </view>
    </view>
    <uni-section
      v-if="orderDetail.orderInfo.remark"
      class="shop-section"
      title="订单备注"
      type="line"
    ></uni-section>
    <view v-if="orderDetail.orderInfo.remark" class="remark">
      {{ orderDetail.orderInfo.remark }}
    </view>
    <uni-section
      class="shop-section"
      title="合计"
      type="line"
    ></uni-section>
    <u-cell
      title="商品金额"
      :value="'¥' + orderDetail.orderInfo.amount"
      :arrow="false"
    ></u-cell>
    <u-cell
      title="配送费"
      :value="'¥' + orderDetail.orderInfo.amountLogistics"
      :arrow="false"
    ></u-cell>
    <u-cell
      title="总计"
      :value="'¥' + orderDetail.orderInfo.amountReal"
      :arrow="false"
    ></u-cell>
    <template v-if="orderDetail.logisticsTraces">
      <uni-section
        class="shop-section"
        title="配送信息"
        type="line"
      ></uni-section>
      <view class="logisticsTraces">
        <u-steps
          :current="orderDetail.logisticsTraces.length - 1"
          direction="column"
        >
          <u-steps-item
            v-for="(item, index) in orderDetail.logisticsTraces"
            :key="index"
            :title="item.AcceptStation"
            :desc="item.AcceptTime"
          />
        </u-steps>
      </view>
    </template>
    <view
      v-if="orderDetail.orderInfo.status == 2"
      class="submit safe-area-inset-bottom"
    >
      <u-button type="success" @click="orderDelivery">确认收货</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderDetail: undefined,
    };
  },
  created() {},
  mounted() {},
  onReady() {},
  onLoad(e) {
    this._orderDetail(e.id, e.status);
  },
  onShow() {},
  methods: {
    async _orderDetail(orderId, status) {
      this.orderDetail = {
        logistics: {
          linkMan: "法外狂徒",
          mobile: "13000000000",
          provinceStr: "广东省",
          cityStr: "深圳市",
          areaStr: "南山区",
          address: "腾讯大厦",
        },
        goods: [
          {
            id: 1,
            pic: "/static/mario.jpg",
            goodsName: "商品名称",
            property: "颜色：红色",
            number: 2,
            amountSingle: 100.0,
          },
          {
            id: 2,
            pic: "/static/logo.png",
            goodsName: "商品名称",
            property: "颜色：红色",
            number: 2,
            amountSingle: 100.0,
          },
        ],
        orderInfo: {
          id: orderId,
          goodsNumber: 2,
          remark: "隐秘快递包装发货，谢谢",
          amount: 150.0,
          amountLogistics: 20.0,
          amountReal: 170.0,
          status: status,
        },
        logisticsTraces: undefined,
      };
      if (status == 2) {
        this.orderDetail.logisticsTraces = [
          {
            AcceptStation: "已发货",
            AcceptTime: "2020-03-05 17:48:06",
          },
          {
            AcceptStation: "派送中",
            AcceptTime: "2021-03-05 17:48:06",
          },
          {
            AcceptStation: "待签收",
            AcceptTime: "2022-03-05 17:48:06",
          },
        ]
      }
    },
    async orderDelivery() {
      uni.showModal({
        title: "请确认",
        content: "确定要确认收货吗？",
        success: (res) => {
          if (res.confirm) {
            this._orderDelivery();
          }
        },
      });
    },
    _orderDelivery() {
      uni.showToast({
        title: "已收到货",
      });
      // this._orderDetail(this.orderDetail.orderInfo.id);
    },
  },
};
</script>
<style scoped lang="scss">
@import "./detail.scss";
</style>
