<script>

import { ref } from 'vue'

export default {
    name: "comp-product-list",
    props: {
        productList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    emits: ['handleClick', 'handleAdd'],
    setup(props, ctx) {
        const searchText = ref('');

        function onClick(item) {
            ctx.emit('handleClick', item);
        }

        function addClick(item) {
            ctx.emit('handleAdd', item);
        }

        return {
            searchText,
            onClick,
            addClick
        };
    },
};
</script>

<template>
    <view class="container">
        <view class="product-card" v-for="(item, index) in productList" :key="index">
            <view class="card-head"  @click="onClick(item)">
                <image class="card-head-img" mode="fill" :src="item.url" />
            </view>
            <view class="card-body"  @click="onClick(item)">
                <text class="card-body-text">{{ item.comment }}</text>
            </view>
            <view class="card-actions">
                <view class="card-actions-item">
                    <text class="card-actions-item-text">￥{{ item.price }}</text>
                </view>
                <view style="flex: 1" />
                <view class="card-actions-item" @click="addClick(item)">
                    <icon type="search" size="14" />
                    <text class="card-actions-item-text">添加</text>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.container {
    overflow: hidden;
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: rgb(220, 220, 220);
}

.product-card {
    width: 50%;
    margin: 10rpx auto 10rpx 0;
    background-color: rgb(220, 220, 220);
}

.card-actions {
    width: 80%;
    margin: 0rpx 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 50rpx;
    border-top: 1rpx #eee solid;
    background-color: white;
}

.card-actions-item {
    width: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.card-actions-item-text {
    font-size: 24rpx;
    color: red;
    margin-left: 5rpx;
    font-weight: bold;
}

.card-head {
    width: 80%;
    margin: 0rpx 10%;
    height: 300rpx;
    background-color: white;
}

.card-head-img {
    width: 100%;
    height: 100%
}

.card-body {
    width: 80%;
    margin: 0rpx 10%;
    background-color: white;
}

.card-body-text {
    font-size: 24rpx;
    padding: 10rpx;
    height: 90rpx;
    overflow: hidden;
    word-break: break-all;
    /* break-all(允许在单词内换行。) */
    text-overflow: ellipsis;
    /* 超出部分省略号 */
    display: -webkit-box;
    /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical;
    /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3;
    /** 显示的行数 **/
}

</style>
