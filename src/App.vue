<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<script lang="ts">
export default {
  globalData: {
    version: "1.0.0", // getApp().globalData.version
  },
  methods: {
    checkHasLogined() {
      // getApp().checkHasLogined()
      return true
    }
  }
};
</script>

<style lang="scss">
@import "uview-plus/index.scss";
</style>
