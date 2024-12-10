<template>
  <view class="address-list">
    <page-box-empty
      v-if="!siteList"
      title="暂无收货记录"
      sub-title="赶快添加一个收货地址吧～"
      :show-btn="false"
    />
    <u-swipe-action>
      <u-swipe-action-item
        v-for="(res, index) in siteList"
        :key="res.id"
        :show="res.show"
        :index="index"
        :options="options"
        @click="click"
        @open="open"
      >
        <view class="item">
          <view class="top">
            <view class="name">{{ res.linkMan }}</view>
            <view class="phone">{{ res.mobile }}</view>
            <view v-if="res.isDefault" class="tag">
              <text class="red">默认</text>
            </view>
          </view>
          <view class="bottom">
            {{ res.provinceStr }}{{ res.cityStr }}{{ res.areaStr }}
            {{ res.address }}
            <u-icon
              name="checkbox-mark"
              :size="40"
              color="#19be6b"
              @click="sel(index)"
            ></u-icon>
          </view>
        </view>
      </u-swipe-action-item>
    </u-swipe-action>
    <view class="addSite" @tap="toAddSite(-1)">
      <view class="add">
        <u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon
        >新建收货地址
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      siteList: undefined,
      options: [
        {
          text: "编辑",
          style: {
            backgroundColor: "#19be6b",
          },
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
    };
  },
  onLoad() {},
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      this.siteList = [
        {
          show: false,
          id: 1,
          linkMan: "法外狂徒",
          mobile: "13800000000",
          provinceStr: "重庆市",
          cityStr: "重庆市",
          areaStr: "南岸区",
          address: "弹子石新街56号",
          isDefault: true,
        },
        {
          show: false,
          id: 2,
          linkMan: "张三",
          mobile: "13800000001",
          provinceStr: "四川省",
          cityStr: "广安市",
          areaStr: "邻水县卓家湾",
          address: "卓家湾9号",
          isDefault: false,
        },
        {
          show: false,
          id: 3,
          linkMan: "李四",
          mobile: "13800000002",
          provinceStr: "重庆市",
          cityStr: "重庆市",
          areaStr: "南岸区",
          address: "赵家街10号",
          isDefault: false,
        },
      ];
    },
    toAddSite(index) {
      const item = index == -1 ? null : this.siteList[index];
      uni.navigateTo({
        url: "./addSite?id=" + (item ? item.id : ""),
      });
    },
    open(index) {
      this.siteList.forEach((ele) => {
        ele.show = false;
      });
      this.siteList[index].show = true;
    },
    click(event) {
      const item = this.siteList[event.index];
      if (event.index == 0) {
        // 编辑
        this.toAddSite(event.index);
      }
      if (event.index == 1) {
        // 删除
        uni.showModal({
          title: "请确认",
          content: "确定要删除吗？",
          success: (res) => {
            if (res.confirm) {
              this._deleteItem(item);
            }
          },
        });
      }
    },
    _deleteItem(item) {
      this.siteList = this.siteList.filter((ele) => ele.id != item.id);
      uni.showToast({
        title: "删除成功",
      });
    },
    sel(index) {
      this.siteList.forEach((ele) => {
        ele.isDefault = false;
      });

      const item = this.siteList[index];
      item.isDefault = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./address.scss";
</style>
