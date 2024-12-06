<template>
  <view>
    <u-empty mode="permission" text="请先登陆" marginTop="88rpx"></u-empty>
    <view class="form-box">
      <u-form ref="uForm" label-width="130rpx" :model="form">
        <u-form-item label="手机号码" prop="mobile" required>
          <u-input
            v-model="form.mobile"
            type="number"
            clearable
            maxlength="11"
            focus
            placeholder="请输入手机号码"
          ></u-input>
        </u-form-item>
        <u-form-item label="密码" prop="pwd" required>
          <u-input
            v-model="form.pwd"
            type="password"
            clearable
            placeholder="请输入密码"
          ></u-input>
        </u-form-item>
      </u-form>
    </view>
    <view class="submit">
      <u-button type="success" @click="submit">登陆</u-button>
      <view class="text-btns">
        <view @click="goReg">注册新账户</view>
        <view @click="goResetpwd">忘记登陆密码？</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        mobile: [
          {
            required: true,
            message: "不能为空",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
        pwd: [
          {
            required: true,
            message: "不能为空",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
      },
      form: {
        mobile: 'vben',
        pwd: '123456',
      },
    };
  },
  created() {},
  mounted() {},
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  onLoad(e) {},
  onShow() {},
  methods: {
    async submit() {
      if (this.form.mobile === "vben" && this.form.pwd === "123456") {
        uni.switchTab({
          url: "/pages/home/index",
        });
        uni.showToast({
          title: "登录成功",
          icon: "success",
        });
      } else {
        uni.showModal({
          title: "登录失败",
          content: "用户名或密码错误",
        });
      }
    },
    goReg() {
        uni.redirectTo({
          url: "/pages/login/reg",
        });
    },
    goResetpwd() {
        uni.navigateTo({
          url: "/pages/login/resetpwd",
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "./login.scss";
</style>
