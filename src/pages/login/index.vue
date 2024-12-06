<template>
  <view>
    <u-empty mode="permission" text="请先登陆" marginTop="88rpx"></u-empty>
    <view class="form-box">
      <u-form ref="uForm" label-width="130rpx" :model="form">
        <u-form-item label="登录方式" required>
          <u-radio-group v-model="loginType">
            <u-radio name="account" label="账号登录" />
            <u-radio name="qrcode" label="qrcode登录" />
          </u-radio-group>
        </u-form-item>
        <template v-if="loginType === 'account'">
          <u-form-item label="手机号码" prop="mobile" required>
            <u-input
              v-model="form.mobile"
              type="number"
              clearable
              maxlength="11"
              focus
              placeholder="请输入手机号码"
            />
          </u-form-item>
          <u-form-item label="密码" prop="pwd" required>
            <u-input
              v-model="form.pwd"
              type="password"
              clearable
              placeholder="请输入密码"
            />
          </u-form-item>
        </template>
        <template v-if="loginType === 'qrcode'">
          <u-form-item label="Qrcode" prop="qrcode" required>
            <u-input
              v-model="form.qrcode"
              type="password"
              clearable
              placeholder="请输入qrcode"
            />
          </u-form-item>
        </template>
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
import { AuthLoginApi } from "@/api/core/auth";
import { VertyQrcodenApi } from "@/api/core/qrcode";
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
        qrcode: [
          {
            required: true,
            message: "不能为空",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
      },
      loginType: "account",
      form: {
        mobile: "vben",
        pwd: "123456",
        qrcode: "123456",
      }
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
    submit() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          console.log('red => ', res);
          if (this.loginType === "qrcode") {
            this.qrcodeLogin();
          } else if (this.loginType === "account") {
            this.accountLogin();
          }
        })
        .catch((errors) => {});
    },
    async qrcodeLogin() {
      uni.showLoading({
        title: "登陆中...",
      });
      var qrcodeRes = await VertyQrcodenApi({ VertyValue: this.form.qrcode });

      uni.hideLoading();
      if (
        qrcodeRes != null &&
        qrcodeRes.status === 1 &&
        qrcodeRes.data.IsVerty
      ) {
        uni.switchTab({
          url: "/pages/home/index",
        });
        uni.showToast({
          title: "登录成功",
          icon: "success",
        });
      } else {
        const that = this;
        uni.showModal({
          title: "登录失败, 是否进行静态校验 ?",
          content: 'qrcode校验失败',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              if (that.form.qrcode === "123456") {
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
                  content: "qrcode错误",
                });
              }
            } else if (res.cancel) {
            }
          },
        });
      }
    },
    async accountLogin() {
      uni.showLoading({
        title: "登陆中...",
      });
      var loginRes = await AuthLoginApi({
        username: this.form.mobile,
        password: this.form.pwd,
      });

      uni.hideLoading();
      if (loginRes != null && loginRes.status === 1) {
        uni.switchTab({
          url: "/pages/home/index",
        });
        uni.showToast({
          title: "登录成功",
          icon: "success",
        });
      } else {
        const that = this;
        uni.showModal({
          title: "登录失败, 是否进行静态校验 ?",
          content: loginRes.data.desc,
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              if (that.form.mobile === "vben" && that.form.pwd === "123456") {
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
            } else if (res.cancel) {
            }
          },
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
