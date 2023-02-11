// 权限问题后期增加
import { get, post } from '@/utils/http';
import { UserState } from '@/store/modules/user/types';

enum URL {
    login = '/api/user/login',
    logout = '/api/user/logout',
    profile = '/api/user/get_userinfo',
}
interface LoginRes {
    token: string;
}

export interface LoginData {
    username: string;
    password: string;
}

const getUserProfile = async () => get<UserState>({ url: URL.profile });
const login = async (data: LoginData) => post<any>({ url: URL.login, data });
const logout = async () => post<LoginRes>({ url: URL.logout });
export { getUserProfile, logout, login };
