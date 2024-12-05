import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

export function userSetup() {
  const userDetail = ref({
    id: 0, // 用户id
    name: '碳酸教父', // 用户名
    avatarUrl: '/static/mario.jpg', // 头像
    version: '0.0.0.0' // 版本
  });

  function go(url: string) {
    uni.navigateTo({
      url: url
    })
  }

  function UserInfoClick() {
    uni.showToast({
      title: '用户设置'
    })
  }

  onShow(() => {
    // 如果未登录
    if (false) {
      uni.redirectTo({
        url: '/pages/index/index?id=123'
      })
    }
  });

  return {
    userDetail,
    go,
    UserInfoClick
  };
}