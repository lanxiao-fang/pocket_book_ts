<template>
    <div>
        <h2>个人中心页面</h2>
        <button @click="changeTheme('light')">light换肤</button>
        <button @click="changeTheme('pink')">pink换肤</button>
        <button @click="changeTheme('blue')">blue换肤</button>
        <div class="result">换肤结果</div>

    </div>
</template>

<script setup lang="ts">
// import { changeTheme } from '@/theme/index'
import { useAppStore } from '@/store';
const appStore = useAppStore();
const changeTheme = (value: string) => {
    appStore.toggleTheme(value);
}
</script>

<style lang="scss" scoped>
.result {
    color: $theme_color;
}
</style>