<script>

import { ref } from 'vue'

export default {
    name: "comp-search",
    props: {
        placeholder: {
            type: String,
            default() {
                return '搜索';
            },
        },
    },
    emits: ['handleSearch'],
    setup(props, ctx) {
        const searchText = ref('');

        function search() {
            ctx.emit('handleSearch', searchText.value);
        }
        return {
            searchText,
            search
        };
    },
};
</script>

<template>
    <view class="search-container">
        <icon class="search-icon" type="search" size="18"/>
        <input class="search-input" :placeholder="placeholder" v-model="searchText" />
        <button class="search-button mini-btn" type="primary" size="mini" @click="search">搜索</button>
    </view>
</template>

<style scoped lang="scss">
.search-container {
    border-radius: 90rpx !important;
    height: 64rpx !important;
    background-color: rgb(220, 220, 220) !important;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.search-container .search-icon {
    margin-left: 20rpx;
}

.search-container .search-input {
    font-size: 28rpx !important;
    background-color: rgb(220, 220, 220) !important;
    color: rgb(116, 116, 116) !important;
    margin: 0rpx 20rpx;
    flex: 1;
}

.search-container .search-button {
    margin-right: 20rpx;
    padding: 0;
    width: 80rpx;
}
</style>
