<template>
  <view>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          style="width: 100%; height: 300px"
          :latitude="latitude"
          :longitude="longitude"
          :markers="covers">
        </map>
      </view>
    </view>
  </view>
</template>
  
  <script>
export default {
  data() {
    return {
      id: 0, // 使用 marker点击事件 需要填写id
      title: "map",
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
          id: 0,
          width: 20,
          height: 30,
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: "../../../static/mario.jpg",
        },
        {
          id: 1,
          width: 20,
          height: 30,
          latitude: 39.9,
          longitude: 116.39,
          iconPath: "../../../static/setting.ico",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  onReady() {},
  onLoad(e) {},
  onShow() {
    /* 需要配置权限，并且在后台开通API
"permission": {
				"scope.userLocation": {
					"desc": "你的位置信息将用于小程序位置接口的效果展示"
				}
			},
			"requiredPrivateInfos": [
				"getLocation"
			]
    */
    uni.getLocation({
        geocode:true,
        type: 'wgs84',
        success: (res) => {
          console.log(res,'获取当前位置')
        },
        fail:(res) =>{
          console.log('fail',res)
        }
      })
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
  