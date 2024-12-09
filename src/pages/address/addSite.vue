<template>
  <view class="wrap">
    <view class="top">
      <u-form ref="uForm" label-width="auto" :model="form">
        <u-form-item label="收货人" prop="linkMan" required>
          <up-input
            v-model="form.linkMan"
            clearable
            placeholder="请输入收货人"
          />
        </u-form-item>
        <u-form-item label="手机号码" prop="mobile" required>
          <up-input
            v-model="form.mobile"
            type="number"
            clearable
            placeholder="请输入手机号码"
          />
        </u-form-item>
        <u-form-item label="所在地区" prop="areaDisplay" required>
          <view @click="showRegion = true">
            <up-input
              v-model="form.areaDisplay"
              type="select"
              !clearable
              placeholder="省市区县、乡镇等"
            />
          </view>
          <comp-city-select
            :value="showRegion"
            :area-code="areaCode"
            @city-change="cityChange"
            @city-close="showRegion = false"
          />
        </u-form-item>
        <u-form-item
          label="详细地址"
          label-position="top"
          prop="address"
          required
        >
          <up-textarea
            v-model="form.address"
            type="textarea"
            :auto-height="true"
            clearable
            placeholder="请输入详细地址"
          />
        </u-form-item>
        <u-form-item label="设置默认地址">
          <u-switch v-model="form.isDefault" active-color="#19be6b"></u-switch>
        </u-form-item>
      </u-form>
    </view>
    <view class="submit">
      <u-button type="success" @click="submit">保存</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showRegion: false,
      rules: {
        linkMan: [
          {
            required: true,
            message: "不能为空",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
        mobile: [
          {
            required: true,
            message: "不能为空",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
        areaDisplay: [
          {
            required: true,
            message: "不能为空",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
        address: [
          {
            required: true,
            message: "不能为空",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
      },
      form: {
        id: "",
        linkMan: "",
        mobile: "",
        areaDisplay: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        address: "",
        isDefault: true,
      },
      areaCode: [], // 省市区的初始化，例如 ['123', '456', '789']
    };
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  onLoad(e) {
    if (e.id) {
      this._addressDetail(e.id);
    }
  },
  mounted() {},
  methods: {
    _addressDetail(id) {
      this.form = {
        id: id,
        areaDisplay: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        linkMan: "张三",
        mobile: "13800000001",
        address: "卓家湾9号",
        isDefault: true,
      };

      this.areaCode = ["1", "2", "5"];
      this.form.areaDisplay = "重庆市" + "重庆市" + "南岸区";
    },
    cityChange(e) {
      console.log("cityChange => ", e);
      this.form.provinceId = e.province.value;
      this.form.cityId = e.city.value;
      this.form.districtId = e.area.value;
      this.form.areaDisplay = e.province.label + e.city.label + e.area.label;
    },
    submit() {
      console.log("form => ", this.form);
      this.$refs.uForm
        .validate()
        .then((res) => {
          this._submit();
        })
        .catch((errors) => {});
    },
    _submit() {
      if (this.form.id) {
        // 修改
        uni.showToast({
          title: "修改成功",
        });
      } else {
        // 添加
        uni.showToast({
          title: "添加成功",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./addSite.scss";
</style>
