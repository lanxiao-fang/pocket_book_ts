import { defineStore } from 'pinia';
import piniaStore from '@/store/index';
import { AppState } from './types';
import { changeTheme } from '@/theme/index'

export const useAppStore = defineStore(
    // 唯一ID
    'app',
    {
        state: () => ({
            title: '喵喵记账簿',
            theme: '',
        }),
        getters: {},
        actions: {
            updateSettings(partial: Partial<AppState>) {
                this.$patch(partial);
            },

            // 修改主题，明亮/暗黑
            toggleTheme(theme: string) {
                console.log('修改主题为：', theme);
                changeTheme(theme)
                let _theme = localStorage.getItem('data-theme') || 'light'
                this.theme = _theme
            },
        },

        // 持久化
        persist: {
            key: 'theme',
            storage: localStorage,
            paths: ['theme'],
        },
    },
);

export function useAppOutsideStore() {
    return useAppStore(piniaStore);
}
