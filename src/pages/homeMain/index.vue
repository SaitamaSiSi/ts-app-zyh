<script>

import { ref } from 'vue'
import { homeMainSetup } from './homeMainSetup';

export default {
  name: "home",
  setup() {
    async function ScanClick() {
      await wx.scanCode({
        onlyFromCamera: false,
        success: function (res) {
          // success
          console.log(`scanType:${res.scanType}`)
          console.log(`charSet:${res.charSet}`)
          console.log(`errMsg:${res.errMsg}`)
          console.log(`rawData:${res.rawData}`)
          console.log(`result:${res.result}`)
          if (res.scanType == "QR_CODE") {
            if (res.charSet == "UTF-8") {
              let object = JSON.parse(res.result.replace(/\'/g, '"'))
              console.log(object)
              uni.showModal({
                title: '扫码结果',
                content: `设备编号:${object.serial_number}\r\n设备名称:${object.name}\r\n设备位置:${object.location}\r\n设备状态:${object.status}`,
                showCancel: false
              })
            }
          } else {
            uni.showToast({
              title: '未知二维码',
              icon: 'error'
            })
          }
        },
        fail: function () {
          // fail
          uni.showToast({
            title: 'fail',
            icon: 'error'
          })
        },
        complete: function () {
          // complete
          uni.showToast({
            title: 'complete',
            icon: 'error'
          })
        }
      })
    }
    function SearchClick() {
      uni.showToast({
        title: '搜索',
        icon: 'success'
      })
    }

    function StoreClick(item) {
      uni.showModal({
        title: '跳转店家页面',
        content: `【${item.name}】店铺,地址在【${item.address}】`,
        showCancel: false
      })
    }

    const scrollList = ref([])
    for (var i = 0; i < 30; i++) {
      scrollList.value.push({
        name: `店家${i}`,
        address: `地址${i}`
      })
    }

    return { scrollList, ScanClick, SearchClick, StoreClick, ...homeMainSetup() };
  },
};
</script>

<template>
  <view class="container">
    <view class="row-style">
      <image class="scan-btn" src="/static/setting.ico" />
      <div style="flex-grow: 1;" />
      <image class="scan-btn" src="/static/setting.ico" @click="ScanClick" />
      <button class="search-btn" type="primary" @click="SearchClick">搜索</button>
    </view>
    <view class="row-style">
      <text class="item-style">{{ `筛选项1` }}</text>
      <text class="item-style">{{ `筛选项2` }}</text>
      <text class="item-style">{{ `筛选项3` }}</text>
    </view>
    <scroll-view class="scroll-view-style" scroll-y="true">
      <view class="scroll-row-style" v-for="(item, index) in scrollList" :key=index>
        <view class="scroll-item-style" @click="StoreClick(item)">
          <image class="btn-img" src="/static/setting.ico" />
          <view class="vertical-text">
            <text class="btn-text">{{ item.name }}</text>
            <text class="btn-text">{{ item.address }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style>
.container {
  width: 100%;
  height: 100%;
  background-color: rgb(112, 161, 235);
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
  flex: 1;
  font-size: 24rpx;
  text-align: center;
}

.scan-btn {
  height: 40rpx;
  width: 40rpx;
  margin: 30rpx 20rpx 30rpx 10rpx;
}

.earch-btn {
  height: 50rpx;
  width: 50rpx;
}

.scroll-view-style {
  height: 100%;
}

.scroll-row-style {
  height: 100%;
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

.btn-text {
  font-size: 18rpx;
}
</style>
