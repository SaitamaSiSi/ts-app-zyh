<template>
  <view>
    <canvas
      style="width: 300px; height: 300px; margin: auto; display: block"
      canvas-id="firstCanvas"
      id="firstCanvas"
      @touchstart="touchStartCallback"
      @touchmove="touchMoveCallback"
      @touchend="touchEndCallback"
      @touchcancel="touchCancelCallback"
      @tap="tapCallback"
      @longtap="longTapCallback"
      @error="errorCallback"
    ></canvas>
    <u-button @click="clearDraw">清空</u-button>
    <u-button @click="baseDraw">基本绘制</u-button>
    <u-button @click="drawText">绘制文本</u-button>
    <u-button @click="drawImg(1)">绘制图片</u-button>
    <u-button @click="drawImg(2)">绘制svg</u-button>
    <u-button @click="drawImg(3)">绘制gif</u-button>
    <u-button @click="drawVideo">绘制Video</u-button>
    <u-button @click="drawBezier">绘制贝塞尔曲线</u-button>
    <u-button @click="drawAnimation">绘制动画</u-button>
    <video
      id="tempVideo"
      style="display: none"
      autoplay
      muted
      loop
      @play="videoPlay"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      intervalStopList: [],
      videoTemp: null, // 后续需要改变方法
    };
  },
  onReady: function (e) {
    this.ctx = uni.createCanvasContext("firstCanvas", this);
    this.videoTemp = uni.createVideoContext("tempVideo", this);
  },
  methods: {
    errorCallback: function (e) {
      console.error(e.detail.errMsg);
    },
    /**
     * 图片地址转换为base64格式图片
     * @param {string} url 图片地址 可网络地址、本地相对路径
     * @param {string} type base64图片类型 默认png
     */
    urlToBase64(url, type = "png") {
      let promises;

      // 网络地址 或者h5端本地相对路径 可使用request方式
      promises = new Promise((resolve, reject) => {
        uni.request({
          url: url,
          method: "GET",
          responseType: "arraybuffer",
          success: (res) => {
            const base64 = `data:image/${type};base64,${uni.arrayBufferToBase64(
              res.data
            )}`;
            resolve(base64);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });

      // // #ifdef APP
      // if (!url.startsWith("http")) {
      //   // app真机本地相对路径
      //   promises = new Promise((resolve, reject) => {
      //     uni.compressImage({
      //       src: url,
      //       quality: 100, // 图片质量压缩0~100，100表示图片质量保持原样
      //       success: (res) => {
      //         const tempUrl = res.tempFilePath; // 使用compressImage获取到安卓本地路径file:///...
      //         plus.io.resolveLocalFileSystemURL(tempUrl, (entry) => {
      //           entry.file((e) => {
      //             let fileReader = new plus.io.FileReader();
      //             fileReader.onload = (r) => {
      //               console.log("r => ", r);
      //               resolve(r.target.result);
      //             };
      //             fileReader.readAsDataURL(e);
      //           });
      //         });
      //       },
      //       fail: (err) => {
      //         reject(err);
      //       },
      //     });
      //   });
      // }
      // // #endif

      return promises;
    },
    clearDraw() {
      this.ctx.draw();
      this.intervalStopList.forEach((item) => {
        clearInterval(item);
      });
    },
    baseDraw() {
      this.ctx.setStrokeStyle("#00ff00");
      this.ctx.setLineWidth(5);
      this.ctx.rect(0, 0, 300, 300);
      this.ctx.stroke();
      this.ctx.setStrokeStyle("#ff0000");
      this.ctx.setLineWidth(2);
      this.ctx.moveTo(160, 100);
      this.ctx.arc(100, 100, 60, 0, 2 * Math.PI, true);
      this.ctx.moveTo(140, 100);
      this.ctx.arc(100, 100, 40, 0, Math.PI, false);
      this.ctx.moveTo(85, 80);
      this.ctx.arc(80, 80, 5, 0, 2 * Math.PI, true);
      this.ctx.moveTo(125, 80);
      this.ctx.arc(120, 80, 5, 0, 2 * Math.PI, true);
      this.ctx.stroke();
      this.ctx.draw();
    },
    drawText() {
      // 设置字体样式
      this.ctx.font = "bold 20px Arial";
      this.ctx.setFontSize(18);
      // 设置文本颜色
      this.ctx.fillStyle = "blue";
      // 绘制文本
      this.ctx.fillText("绿灯闪烁 尽快通行", 80, 250);
      this.ctx.draw(true);
    },
    async drawImg(flag) {
      switch (flag) {
        case 1: {
          // jpg
          uni.getImageInfo({
            // src: "http://192.168.1.134:5000/api/file/v1/jpg.jpg",
            // src: "http://192.168.1.134:5000/api/file/v1/png.png",
            src: "http://192.168.1.134:5000/api/file/v1/bmp.bmp",
            success: (img) => {
              this.ctx.drawImage(img.path, 0, 0, 300, 200);
              this.ctx.draw(true);
            },
            fail: (err) => {
              console.log(err);
            },
            complete: () => {
              console.log("complete");
            },
          });
          break;
        }
        case 2: {
          // svg
          var svgData = await this.urlToBase64(
            "http://192.168.1.134:5000/api/file/v1/svg.svg",
            "svg+xml"
          );
          this.ctx.drawImage(svgData, 0, 0, 300, 200);
          this.ctx.draw(true);
          break;
        }
        case 3: {
          // gif
          break;
        }
      }
    },
    videoPlay() {
      const that = this;
      var intervalNum = setInterval(function () {
        that.ctx.drawImage(that.videoTemp, 0, 0);
        that.ctx.draw();
      }, 20);
      this.intervalStopList.push(intervalNum);
    },
    drawVideo() {
      this.videoTemp.src = "http://192.168.1.134:5000/api/file/v1/mp4.pm4";
      this.videoTemp.play();
    },
    drawBezier() {
      // Draw points
      this.ctx.beginPath();
      this.ctx.arc(20, 20, 2, 0, 2 * Math.PI);
      this.ctx.setFillStyle("red");
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(200, 20, 2, 0, 2 * Math.PI);
      this.ctx.setFillStyle("lightgreen");
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(20, 100, 2, 0, 2 * Math.PI);
      this.ctx.arc(200, 100, 2, 0, 2 * Math.PI);
      this.ctx.setFillStyle("blue");
      this.ctx.fill();

      this.ctx.setFillStyle("black");
      this.ctx.setFontSize(12);

      // Draw guides
      this.ctx.beginPath();
      this.ctx.moveTo(20, 20);
      this.ctx.lineTo(20, 100);
      this.ctx.lineTo(150, 75);

      this.ctx.moveTo(200, 20);
      this.ctx.lineTo(200, 100);
      this.ctx.lineTo(70, 75);
      this.ctx.setStrokeStyle("#AAAAAA");
      this.ctx.stroke();

      // Draw quadratic curve
      this.ctx.beginPath();
      this.ctx.moveTo(20, 20);
      this.ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
      this.ctx.setStrokeStyle("black");
      this.ctx.stroke();

      // 二
      // Draw points
      this.ctx.beginPath();
      this.ctx.arc(20, 120, 2, 0, 2 * Math.PI);
      this.ctx.setFillStyle("red");
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(200, 120, 2, 0, 2 * Math.PI);
      this.ctx.setFillStyle("lightgreen");
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(20, 200, 2, 0, 2 * Math.PI);
      this.ctx.setFillStyle("blue");
      this.ctx.fill();

      this.ctx.setFillStyle("black");
      this.ctx.setFontSize(12);

      // Draw guides
      this.ctx.beginPath();
      this.ctx.moveTo(20, 120);
      this.ctx.lineTo(20, 200);
      this.ctx.lineTo(200, 120);
      this.ctx.setStrokeStyle("#AAAAAA");
      this.ctx.stroke();

      // Draw quadratic curve
      this.ctx.beginPath();
      this.ctx.moveTo(20, 120);
      this.ctx.quadraticCurveTo(20, 200, 200, 120);
      this.ctx.setStrokeStyle("black");
      this.ctx.stroke();

      this.ctx.draw();
    },
    drawAnimation() {},
    touchStartCallback() {
      // 手指触摸动作开始
      console.log("touchStartCallback");
    },
    touchMoveCallback() {
      // 手指触摸后移动
      console.log("touchMoveCallback");
    },
    touchEndCallback() {
      // 手指触摸动作结束
      console.log("touchEndCallback");
    },
    touchCancelCallback() {
      // 手指触摸动作被打断，如来电提醒，弹窗
      console.log("touchCancelCallback");
    },
    tapCallback() {
      // 手指触摸后触发，移动则不会触发
      console.log("tapCallback");
    },
    longTapCallback() {
      // 手指触摸后，超过500ms后触发
      console.log("longTapCallback");
    },
  },
};
</script>

<style scoped lang="scss">
@import url("./canvasD.scss");
</style>
