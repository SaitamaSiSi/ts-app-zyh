<template>
  <view>
    <live-player
      src="https://domain/pull_stream"
      autoplay
      @statechange="statechange"
      @error="error"
      style="width: 300px; height: 225px"
    />
  </view>
</template>
  
  <script>
export default {
  data() {
    return {
      liveSrc: ""
    };
  },
  created() {},
  mounted() {},
  onReady() {},
  onLoad(e) {},
  onShow() {},
  methods: {
    statechange(e) {
      console.log("live-player code:", e.detail.code);
    },
    error(e) {
      console.error("live-player error:", e.detail.errMsg);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
  