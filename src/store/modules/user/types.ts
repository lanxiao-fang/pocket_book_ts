export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
    id?: string;
    username?: string;
    real_name?: string;
    avatar?: string;
    signature?: string;
    password?: string;
    token?: string;
    organization?: string;
    location?: string;
    email?: string;
    auths?: string[];
    is_admin?: number;
    blogJuejin?: string;
    blogZhihu?: string;
    blogGithub?: string;
    profileBio?: string;
    devLanguages?: string;
    role?: RoleType;
}
