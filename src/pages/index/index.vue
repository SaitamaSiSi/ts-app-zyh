<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="text-area">
      <text class="title">{{ '用户名:' }}</text>
      <input v-model="userId" placeholder="请输入用户名" />
    </view>
    <view class="text-area">
      <text class="title">{{ '密码:' }}</text>
      <input v-model="userPwd" type="password" placeholder="请输入密码" />
    </view>
    <view>
      <button type="primary" @click="Login">登录</button>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'
import { AuthLoginApi } from '@/api/core/auth'
import * as TestModels from '@/models/jsModels/EditBayonetSchedule'
import {
  HexDataStr
} from '@/models/jsModels/Utilities'

export default {
  name: 'index-page',
  components: {
  },
  onLoad(options) {
    console.log('Login => ', options)
  },
  setup() {
    const title = ref('欢迎使用');
    const userId = ref('vben');
    const userPwd = ref('123456');

    function MyTest() {
      var byteArray = new Uint8Array([255, 128, 0, 1])
      var hexString = HexDataStr(byteArray, byteArray.length)
      console.log(hexString)
    }

    async function Login() {
      // MyTest()

      if (userId.value === 'vben' && userPwd.value === '123456') {
        uni.switchTab({
          url: '/pages/newHome/index'
        })
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
      } else {
        uni.showModal({
          title: '登录失败',
          content: '用户名或密码错误',
        });
      }

      // uni.showLoading({
      //   title: '登陆中'
      // });
      // var loginRes = await AuthLoginApi({ username: userId.value, password: userPwd.value })
      // uni.hideLoading();
      // if (loginRes != null && loginRes.status === 1) {
      //   uni.switchTab({
      //     url: '/pages/homeMain/index'
      //   })
      // } else {
      //   uni.showModal({
      //     title: '登录失败',
      //     content: loginRes.data.desc,
      //     showCancel: false,
      //     success: function (res) {
      //       if (res.confirm) {
      //         // 
      //       } else if (res.cancel) {
      //         //
      //       }
      //     }
      //   })
      // }

      // uni.showActionSheet({
      //   itemList: ['1', '2', '3'],
      //   success: function (res) {
      //     console.log(res.tapIndex)
      //   },
      //   fail: function(res) {
      //   }
      // })
    }

    return {
      title,
      userId,
      userPwd,
      Login
    };
  }
};

</script>

<style>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
