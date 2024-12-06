<template>
  <view v-if="htmlContent" class="about">
    <view class="content">
      <u-parse :content="htmlContent"></u-parse>
    </view>
  </view>
</template>

<script>
import { GetQrcodeApi } from "@/api/core/qrcode";
export default {
  data() {
    return {
      key: undefined,
      htmlContent: undefined,
    };
  },
  created() {},
  mounted() {},
  onReady() {},
  onLoad(e) {
    this.key = e.key;
    this._getAboutPage();
  },
  onShow() {},
  methods: {
    async _getAboutPage() {
      if (this.key === "qrcode") {
        uni.showLoading({
          title: "获取二维码中...",
        });
        var qrcodeRes = await GetQrcodeApi({});
        uni.hideLoading();
        console.log('qrcodeRes => ', qrcodeRes);
        if (qrcodeRes && qrcodeRes.status === 1) {
          this.htmlContent = `
          <div style="color: red">
            <h1>关于Qr Code二维码</h1>
            <p>该二维码可以直接用于登录账户, 非常重要, 请妥善保存 !</p>
            <img src="data:image/png;base64,${qrcodeRes.data.Url}" alt="QR Code" />
          </div>
          `
        } else {
          uni.showToast({
            title: "获取二维码失败",
          });
        }
      } else {
        this.htmlContent = `
        <div class="container">
          <h1>关于我们</h1>
          <p>欢迎来到我们的小程序！我们是一个专注于提供高质量服务和产品的团队。我们的目标是满足客户的需求，并为他们提供最佳的用户体验。</p>
          <p>我们的团队由一群充满激情和创造力的专业人士组成，他们致力于通过不断的学习和创新来提升我们的服务和产品。</p>
          <div class="team">
            <div class="team-member">
              <img src="/static/mario.jpg" alt="团队成员1" width="100rpx" height="100rpx">
              <h3>张三</h3>
              <p>CEO & 创始人</p>
            </div>
            <div class="team-member">
              <img src="/static/mario.jpg" alt="团队成员2" width="100rpx" height="100rpx">
              <h3>李四</h3>
              <p>CTO & 技术总监</p>
            </div>
            <div class="team-member">
              <img src="/static/mario.jpg" alt="团队成员3" width="100rpx" height="100rpx">
              <h3>王五</h3>
              <p>CMO & 市场总监</p>
            </div>
          </div>
        </div>
      `;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.about {
  .content {
    padding: 32rpx;
  }
}
</style>
