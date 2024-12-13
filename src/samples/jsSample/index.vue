<script>
import { ref, watch } from 'vue';

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
    ClickA1() {
      console.log("click A1");
      var that = this
      uni.scanCode({
        onlyFromCamera: false,
        success(res) {
          console.log(`scanType:${res.scanType}`)
          console.log(`charSet:${res.charSet}`)
          console.log(`errMsg:${res.errMsg}`)
          console.log(`rawData:${res.rawData}`)
          console.log(`result:${res.result}`)
          if (res.scanType == "QR_CODE") {
            if (res.charSet == "UTF-8") {
              let object = JSON.parse(res.result.replace(/\'/g, '"'))
              that.name = object.name
              that.serial_number = object.serial_number
              that.location = object.location
              that.status = object.status
            }
          }
        }
      })
    },
    ClickRefesh() {

    },
  }
};
</script>

<template>
  <view class="content">
    <view>
      <form @submit="formSubmit" @reset="formReset">
        <view style='display:flex;flex-direction:column;'>
          <view>设备名称:<label>{{ name }}</label></view>
          <view>设备序列:<label>{{ serial_number }}</label></view>
          <view>设备位置:<label>{{ location }}</label></view>
          <view>设备状态:<label>{{ status }}</label></view>
        </view>
      </form>
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
