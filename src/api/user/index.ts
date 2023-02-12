// 权限问题后期增加
import { get, post } from '@/utils/http';
import { UserState } from '@/store/modules/user/types';

enum URL {
    login = '/api/user/login',
    logout = '/api/user/logout',
    profile = '/api/user/get_userinfo',
    signature = '/api/user/edit_signature',
    pass = '/api/user/modify_pass',
    
}
interface LoginRes {
    token: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface setSignatureData {
    signature: string
}

export interface passData {
    old_pass: string, // 原密码
    new_pass: string, // 新密码
    new_pasa2: string, // 确认新密码
}

const getUserProfile = async () => get<UserState>({ url: URL.profile });
const login = async (data: LoginData) => post<any>({ url: URL.login, data });
const logout = async () => post<LoginRes>({ url: URL.logout });
const setSignature = async (data: setSignatureData) => post<LoginRes>({ url: URL.signature, data })
const setPass = async (data: passData) => post({ url: URL.pass, data })

export { getUserProfile, logout, login, setSignature, setPass };
