import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
} from "vue";
import type { UserApi } from '@/api/type/UserApi';

export function userMainSetup() {
  const userInfo = ref({} as UserApi.UserInfo);
  const pageInfo = ref({
    porductCollectNum: 0,
    storeCollectNum: 0,
    historyNum: 0
  })

  userInfo.value.realName = "碳酸教父"

  //通过组合式API的形式去使用生命周期
  onBeforeMount(() => {
    console.log("onBeforeMount");
  });
  onMounted(() => {
    console.log("onMounted");
  });
  onBeforeUpdate(() => {
    console.log("onBeforeUpdate");
  });
  onUpdated(() => {
    console.log("onUpdated");
  });
  onBeforeUnmount(() => {
    console.log("onBeforeUnmount");
  });
  onUnmounted(() => {
    console.log("onUnmounted");
  });

  function UserInfoClick() {
    uni.showToast({
      title: '用户设置'
    })
  }

  function OtherClick() {
    uni.showModal({
      title: '提示',
      content: '未实现，不一定保留',
      showCancel: false
    })
    // uni.redirectTo({
    //   url: '/pages/index/index?id=123'
    // })
  }

  return {
    userInfo,
    pageInfo,
    UserInfoClick,
    OtherClick
  };
}