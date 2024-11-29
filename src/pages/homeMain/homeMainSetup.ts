import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
} from "vue";

export function homeMainSetup() {
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

    return {
    };
}