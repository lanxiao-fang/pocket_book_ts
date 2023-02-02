<template>
  <div>

    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->

    <template v-if="isTabbarPage">
      <van-tabbar route fixed v-model="active">
        <van-tabbar-item v-for="route in _routes" :key="route.path" :to="route.path">
          <template #icon="props">
            <img :src="props.active ? route.meta[theme] : route.meta.inactiveIcon" />
          </template>
          {{ route.meta.title }}
        </van-tabbar-item>
      </van-tabbar>
    </template>

  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toRaw } from 'vue'
import routes from '@/router/modules/app'
import { useAppStore } from '@/store';
const appStore = useAppStore();

const num = ref(3)
const active = ref(0);
const _routes = ref(routes)
const isTabbarPage = ref(true)
const router = useRouter();
console.log('route changed', router.currentRoute)


const theme = computed(() => {
  return `${appStore.theme}ActiveIcon`
});

// 监听当前页面是否是tabbar页面
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  console.log('watch', newValue, _routes);
  const flag = _routes.value.find(v => v.path === newValue)
  isTabbarPage.value = !!flag
}, { immediate: true })




</script>


<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
