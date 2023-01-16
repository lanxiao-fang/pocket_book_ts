<template>
  <div>

    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->

    <van-tabbar route fixed v-model="active">
      <van-tabbar-item v-for="route in _routes" :key="route.path" :to="route.path">
        <template #icon="props">
          <img :src="props.active ? route.meta[theme] : route.meta.inactiveIcon" />
        </template>
        {{ route.meta.title }}
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>
<script setup lang="ts">
import routes from '@/router/modules/app'
import { useAppStore } from '@/store';
const appStore = useAppStore();

const num = ref(3)
const active = ref(0);
const _routes = ref(routes)

const theme = computed(() => {
  return `${appStore.theme}ActiveIcon`
});


</script>


<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
