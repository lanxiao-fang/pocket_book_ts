import { defineStore } from 'pinia';
import { UserState } from './types';
import { login as userLogin, logout as userLogout, LoginData, getUserProfile } from '@/api/user/index';
import { setToken, clearToken } from '@/utils/auth';

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        id: '',
        signature: "",
        username: ""
    }),
    getters: {
        userProfile(state: UserState): UserState {
            return { ...state };
        },
    },
    actions: {
        switchRoles() {
            return new Promise((resolve) => {
                this.role = this.role === 'user' ? 'user' : 'admin';
                resolve(this.role);
            });
        },
        // 设置用户的信息
        setInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        },
        // 重置用户信息
        resetInfo() {
            this.$reset();
        },
        // 获取用户信息
        async info() {
            const result = await getUserProfile();
            console.log('信息', result);
            this.setInfo(result);
        },
        // 异步登录并存储token
        async login(loginForm: LoginData) {
            const data = await userLogin(loginForm);
            const token = data?.token;
            if (token) {
                setToken(token);
            }
            return data;
        },
        // Logout
        async logout() {
            //   await userLogout();
            //   this.resetInfo();
            //   clearToken();
            // 路由表重置
            // location.reload();
        },

        // 修改个性签名

    },
});
