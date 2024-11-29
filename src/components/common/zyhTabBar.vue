<template>
    <view class="tab-bar">
        <view v-for="(item, index) in list" :key="index" calss="tab-bar-item" @click="switchTab(item, index)">
            <image class="tab_img" :src="selected === index ? item.selectedIconPath : item.iconPath"></image>
            <view class="tab_text" :style="{color:selected===index?selectedColor : color}">{{ item.text }}</view>
        </view>
    </view>
</template>

<script>

export default {
    props: {
        selected: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            color: "#333333",
            selectedColor: "#d4327a",
            list: []
        }
    },
    methods: {
        switchTab(item, index) {
            this.$emit("update:selected", index);
            uni.switchTab({
                url: item.pagePath
            });
        }
    }
}

</script>

<style scoped>

</style>


