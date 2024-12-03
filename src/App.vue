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
    userInfo: {
      id: '124',
      name: '张三',
      age: 18
    },
    shopingCart: [],
  },
};
</script>
<style>
@import './common/uni.css';
</style>
