/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';


import { AutoImportDeps } from './autoImport';
import { AutoRegistryComponents } from './component'
import { ConfigImageminPlugin } from "./imagemin";
import { ConfigCompressPlugin } from './compress'


export function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue支持
    vue(),
    // setup语法糖组件名支持
    vueSetupExtend(),
  ];


  vitePlugins.push(AutoImportDeps())


  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents());

  vitePlugins.push(ConfigImageminPlugin())

  vitePlugins.push(ConfigCompressPlugin())

  return vitePlugins;
}