<script>

export default {
    name: "comp-loading",
    props: {
        text: {
            type: String,
            default: "加载中...",
        },
        size: {
            type: Number,
            default: 30
        }
    },
    setup(props, ctx) {
        return {
        };
    },
};
</script>

<template>
    <view class="uni-row container">
        <view style="flex: 1" />
        <view class="loading-spinner" :style="{ width: `${size}rpx`, height: `${size}rpx` }" />
        <text :style="{ fontSize: `${size}rpx` }">{{ text }}</text>
        <view style="flex: 1" />
    </view>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    width: 100%;
}

.loading-spinner {
    display: inline-block;
    border-radius: 50%;
    border: 5px solid rgba(0, 0, 0, 0.2);
    /* 灰色部分 */
    border-top-color: #3498db;
    /* 蓝色部分 */
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
