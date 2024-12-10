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
                <u-text :lines="3" :size="12" :text="item.comment" />
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
    height: 100rpx;
    margin: 0rpx 10%;
    background-color: white;
}

</style>
