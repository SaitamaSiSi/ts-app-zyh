<template>
  <view>
		<view class="wrap">
		</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      listActive: 0,
      orderList: undefined,
      dataList: undefined,
      list: [
        {
          name: "待付款",
          count: 0,
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
    console.log('onLoad => ', e);
    if (!e.status) {
      e.status = 0;
    }
    this.current = e.status;
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
      // if (res.code == 0) {
      //   this.list[0].count = res.data.count_id_no_pay;
      //   this.list[1].count = res.data.count_id_no_transfer;
      //   this.list[2].count = res.data.count_id_no_confirm;
      //   this.list.splice(0, 0);
      // } else {
      //   uni.showToast({
      //     title: "获取订单统计失败",
      //     icon: "none",
      //   });
      // }
    },
    // 页面数据
    async getOrderList() {
      this.orderList = null;
    },
    goHome() {
      uni.switchTab({
        url: "../home/index",
      });
    },
    // tab栏切换
    change(index) {
      this.current = index;
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
    async _close(orderId) {
      uni.showToast({
        title: "已取消" + orderId,
      });
      this.change(this.current);
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
    godetail(orderId) {
      uni.navigateTo({
        url: "./detail?id=" + orderId,
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
.order {
  width: 710rpx;
  background-color: #ffffff;
  margin: 20rpx auto;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  font-size: 28rpx;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .store {
        margin: 0 10rpx;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .right {
      color: $u-type-warning-dark;
    }
  }
  .item {
    display: flex;
    margin: 20rpx 0 0;
    .left {
      margin-right: 20rpx;
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }
    }
    .content {
      .title {
        font-size: 28rpx;
        line-height: 50rpx;
      }
      .type {
        margin: 10rpx 0;
        font-size: 24rpx;
        color: $u-tips-color;
      }
      .delivery-time {
        color: #e5d001;
        font-size: 24rpx;
      }
    }
    .right {
      margin-left: 10rpx;
      padding-top: 20rpx;
      text-align: right;
      .decimal {
        font-size: 24rpx;
        margin-top: 4rpx;
      }
      .number {
        color: $u-tips-color;
        font-size: 24rpx;
      }
    }
  }
  .total {
    margin-top: 20rpx;
    text-align: right;
    font-size: 24rpx;
    .total-price {
      font-size: 32rpx;
    }
  }
  .bottom {
    display: flex;
    margin-top: 40rpx;
    padding: 0 10rpx;
    justify-content: end;
    align-items: center;
    .btn {
      line-height: 52rpx;
      width: 160rpx;
      border-radius: 26rpx;
      border: 2rpx solid $u-border-color;
      font-size: 26rpx;
      text-align: center;
      color: $u-type-info-dark;
    }
    .evaluate {
      color: $u-type-warning-dark;
      border-color: $u-type-warning-dark;
    }
  }
}
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
}
.swiper-box {
  flex: 1;
}
.swiper-item {
  height: 100%;
}

</style>
