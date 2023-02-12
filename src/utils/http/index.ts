import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { showMessage } from './status';
import { IResponse } from './type';
import { getToken } from '@/utils/auth';
import router from '@/router/index'

import { showToast, closeToast } from 'vant';
import 'vant/es/toast/style';

import loadingGif from '../../images/loading.gif'
import { reject } from 'lodash';


// 如果请求花费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 5000;
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false;
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
// 允许跨域
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL + '',
});

function showLoading(show: Boolean = true) {
  if (!show) return
  showToast({
    message: '',
    duration: 0,
    icon: loadingGif,
    className: "loading-gif"
  });

}

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config) => {
    showLoading()
    const token = getToken();
    if (token) {
      config.headers.Authorization = token
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers.authorization) {
      localStorage.setItem('token', response.headers.authorization)
    } else if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    const { data } = response
    if (data.code != 200) {
      data.msg && showToast(data.msg)
      if (data.code == 401) {
        router.push('/login')
      }
      return Promise.reject(data)
    }
    console.log(response.data);
    closeToast()
    return Promise.resolve(response.data);
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showToast(showMessage(response.status))
      return Promise.reject(response.data);
    }
    // closeToast()
    showToast(showMessage('网络连接异常,请稍后再试!'))
  },
);



// T使用泛型，在函数执行时可对反省进行类型确认推断，默认是any
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    // AxiosResponse是axios提供的一个接口，看相关源码知道AxiosResponse接口里的data属性也是某个接口类型T
    // 所以采用AxiosResponse<IResponse>写法 ， IResponse代替interface AxiosResponse<T = any, D = any> {} 中的T
    axiosInstance.request<any, AxiosResponse<IResponse>>(conf).then((res: AxiosResponse<IResponse>) => {
      console.log('4444444', res);
      resolve(res.data as T);
    }).catch(error => {
      reject(error)
    })
  });
};


export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' });
}

export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' });
}

export default request;
export type { AxiosInstance, AxiosResponse };
/**
 * @description: 用户登录案例
 * @params {ILogin} params
 * @return {Promise}
 */
// export const login = (params: ILogin): Promise<IResponse> => {
//     return axiosInstance.post('user/login', params).then(res => res.data);
// };
