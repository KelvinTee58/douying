const { defineConfig } = require('@vue/cli-service');
const config = require('./config');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: process.env.VUE_APP_FLAG,
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: true,
  devServer: {
    proxy: {
      '/api': {
        target: config.requestUrl, // 需要代理的后端接口
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
        pathRewrite: {
          //重写匹配的字段，如果不需要在请求路径上，重写为""
          '/api': ''
        }
      }
      // '/image': {
      //   target: config.imageUrl, // 需要代理的后端接口
      //   changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
      //   pathRewrite: {
      //     //重写匹配的字段，如果不需要在请求路径上，重写为""
      //     '/image': ''
      //   }
      // }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 只在生产环境中生效
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              // 删除 console 语句
              drop_console: true,
              // 删除 debugger 语句
              drop_debugger: true
            }
          },
          parallel: true // 启用多进程并行运行，提升构建速度
        })
      ];
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
});
