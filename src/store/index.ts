import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
// import { useUserStore } from './modules/user';

// 持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { useAppStore };
export default pinia;
