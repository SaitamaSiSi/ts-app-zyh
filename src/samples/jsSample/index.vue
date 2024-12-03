<script>
import { ref, watch } from 'vue';
const otp = require('../otp/otp.js')
const TOTP = otp.TOTP

export default {
  name: 'jsSample',
  components: {
  },
  props: {
  },
  setup() {
    return {
    };
  },
  data() {
    return {
      scanCharSet: "",
      scanSecret: "",
      scanPwd: "",

      name: "",
      serial_number: "",
      location: "",
      status: ""
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
    },
    parseOtpAuthUrl(url) {
      const regex = /^(otpauth:\/\/totp\/[^?]+?\?secret=)([a-zA-Z2-7]+)/;
      const match = url.match(regex);
      return match ? match[2] : null;
    },
    ClickA1() {
      console.log("click A1");
      var that = this
      wx.scanCode({
        onlyFromCamera: false,
        success(res) {
          console.log(`scanType:${res.scanType}`)
          console.log(`charSet:${res.charSet}`)
          console.log(`errMsg:${res.errMsg}`)
          console.log(`rawData:${res.rawData}`)
          console.log(`result:${res.result}`)
          that.scanCharSet = res.charSet
          if (res.scanType == "QR_CODE") {
            if (res.charSet == "UTF-8") {
              let object = JSON.parse(res.result.replace(/\'/g, '"'))
              that.name = object.name
              that.serial_number = object.serial_number
              that.location = object.location
              that.status = object.status
            } else if (res.charSet == "ISO8859-1") {
              const secret = that.parseOtpAuthUrl(res.result);
              if (secret) {
                that.scanSecret = secret;
                var totp = new TOTP({ secret: secret });
                var temp = totp.gen()
                console.log('temp:', temp)
              }
            }
          }
        }
      })
    },
    ClickRefesh() {

    },
    ClickB1() {
    },
    ClickC1() {
    },
    ClickA2() {
    },
    ClickB2() {
    },
    ClickC2() {
    },
  }
};
</script>

<template>
  <view class="content">
    <view>
      <form @submit="formSubmit" @reset="formReset">
        <view v-if="scanCharSet == 'UTF-8'" style='display:flex;flex-direction:column;'>
          <view>设备名称:<label>{{ name }}</label></view>
          <view>设备序列:<label>{{ serial_number }}</label></view>
          <view>设备位置:<label>{{ location }}</label></view>
          <view>设备状态:<label>{{ status }}</label></view>
        </view>
        <view v-else-if="scanCharSet == 'ISO8859-1'" style='display:flex;flex-direction:column;'>
          <view>Secret:<label>{{ scanSecret }}</label></view>
          <view>当前密码:<label>{{ scanPwd }}</label></view>
          <button type="primary" @click="ClickRefesh">刷新</button>
        </view>
      </form>
    </view>
    <view style='display:flex;flex-direction:row;'>
      <button type="primary" @click="ClickA1">A1</button>
      <button type="primary" @click="ClickB1">B1</button>
      <button type="primary" @click="ClickC1">C1</button>
    </view>
    <view style='display:flex;flex-direction:column;'>
      <button type="primary" @click="ClickA2">A2</button>
      <button type="primary" @click="ClickB2">B2</button>
      <button type="primary" @click="ClickC2">C2</button>
    </view>
    <view style="display: flex;">
      <uni-button type="primary" style="flex: 1;background-color: red;">设置</uni-button>
      <uni-button type="primary" style="flex: 2;background-color: green;">设置</uni-button>
      <uni-button type="primary" style="flex: 3;background-color: yellow;">设置</uni-button>
    </view>
  </view>
</template>

<style scoped>
.content {
  width: 100%;
}
</style>
