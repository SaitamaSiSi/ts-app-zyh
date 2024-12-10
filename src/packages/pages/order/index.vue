<template>
  <view>
    <view class="wrap">
      <u-sticky>
        <view class="u-tabs-box">
          <u-tabs
            activeColor="#f29100"
            ref="tabs"
            :list="list"
            :current="current"
            @change="change"
            :is-scroll="false"
            swiperWidth="750"
          ></u-tabs>
        </view>
      </u-sticky>
      <comp-page-box-empty
        v-if="!orderList || orderList.length == 0"
        title="您还没有相关的订单"
        sub-title="可以去看看有那些想买的～"
        :show-btn="true"
      />
      <view v-else class="page-box">
        <view class="order" v-for="(item, index) in orderList" :key="item.id">
          <view class="top" @click="godetail(item.id, item.status)">
            <view class="left"> 订单号: {{ item.orderNumber }} </view>
            <view class="right">{{ item.statusStr }}</view>
          </view>
          <view
            class="item"
            v-for="(item2, index2) in item.goodsList"
            :key="item2.id"
          >
            <view class="left"
              ><image :src="item2.pic" mode="aspectFill"></image
            ></view>
            <view class="content">
              <view class="title u-line-2">{{ item2.goodsName }}</view>
              <view v-if="item2.property" class="type">{{
                item2.property
              }}</view>
            </view>
            <view class="right">
              <view class="price"> ￥{{ item2.amountSingle }} </view>
              <view class="number">x{{ item2.number }}</view>
            </view>
          </view>
          <view class="total">
            共{{ item.goodsNumber }}件商品 合计:
            <text class="total-price"> ￥{{ item.amountReal }} </text>
          </view>
          <view v-if="item.status == 0" class="bottom">
            <view class="exchange btn" @click="close(item.id)">取消订单</view>
            <view class="evaluate btn u-margin-left-24" @click="pay(index)">
              立即支付
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      listActive: 0,
      orderList: undefined,
      list: [
        {
          name: "待付款",
        },
        {
          name: "待发货",
        },
        {
          name: "待收货",
        },
      ],
      current: 0,
      tabsHeight: 0,
    };
  },
  onLoad(e) {
    if (!e.status) {
      e.status = 0;
    }
    this.current = parseInt(e.status);
    this.change(e.status);
  },
  computed: {
    // 价格小数
    priceDecimal() {
      return (val) => {
        if (val !== parseInt(val)) return val.slice(-2);
        else return "00";
      };
    },
    // 价格整数
    priceInt() {
      return (val) => {
        if (val !== parseInt(val)) return val.split(".")[0];
        else return val;
      };
    },
  },
  methods: {
    async _orderStatistics() {
      this.list[0].count = 0;
      this.list[1].count = 0;
      this.list[2].count = 0;
      this.list.splice(0, 0);
    },
    // 页面数据
    getOrderList() {
      this.orderList = [];
      this.orderList.push({
        id: 1,
        orderNumber: "2023456789",
        statusStr: "待付款",
        amountReal: 100.0,
        goodsList: [
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
        status: this.current,
        goodsNumber: 4,
      });

      this.orderList.push({
        id: 2,
        orderNumber: "2023456798",
        statusStr: "待付款",
        amountReal: 150.0,
        goodsList: [
          {
            id: 1,
            pic: "/static/logo.png",
            goodsName: "商品名称",
            property: "颜色：红色",
            number: 2,
            amountSingle: 150.0,
          },
          {
            id: 2,
            pic: "/static/mario.jpg",
            goodsName: "商品名称",
            property: "颜色：红色",
            number: 2,
            amountSingle: 100.0,
          },
        ],
        status: this.current,
        goodsNumber: 4,
      });

      console.log(this.current)
      if (this.current === 0) {
        this.orderList[0].statusStr = "待付款";
        this.orderList[1].statusStr = "待付款";
      } else if (this.current === 1) {
        this.orderList[0].statusStr = "待发货";
        this.orderList[1].statusStr = "待发货";
      } else if (this.current === 2) {
        this.orderList[0].statusStr = "待收货";
        this.orderList[1].statusStr = "待收货";
      }
    },
    goHome() {
      uni.switchTab({
        url: "../home/index",
      });
    },
    // tab栏切换
    change(index) {
      if (typeof index == "number") {
        this.current = index;
      } else if (typeof index == "object") {
        this.current = index.index;
      }
      this._orderStatistics();
      this.getOrderList();
    },
    async close(orderId) {
      uni.showModal({
        title: "请确认",
        content: "确定要取消该订单吗？",
        success: (res) => {
          if (res.confirm) {
            this._close(orderId);
          }
        },
      });
    },
    _close(orderId) {
      this.orderList = this.orderList.filter((i) => i.id !== orderId);
      uni.showToast({
        title: "已取消" + orderId,
      });
      //this.change(this.current);
    },
    async pay(index) {
      var balance = 0;
      const orderInfo = this.orderList[index];
      const needPay = (orderInfo.amountReal - balance).toFixed(2);
      uni.showModal({
        title: "提示",
        content: "支付功能即将上线，请暂时联系客服人员进行线下支付",
        showCancel: false,
        confirmText: "我知道了",
      });
    },
    godetail(orderId, status) {
      // status不需要，后续通过接口获取，这里仅用于测试
      uni.navigateTo({
        url: `./detail?id=${orderId}&status=${status}`,
      });
    },
  },
};
</script>

<style>
/* #ifndef H5 */
page {
  background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
@import "./order.scss";
</style>
