const config = require("./config");

module.exports = {
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: process.env.VUE_APP_FLAG,
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: true,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  /* webpack-dev-server 相关配置 */
  // configureWebpack: {
  //   module: {
  //     rules: [
  //       {
  //         test: /\.ts$|\.js$|\.vue$/,
  //         use: [
  //           {
  //             loader: "./serverLoader.js",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   //entry: ["babel-polyfill", "./src/main.js"]
  //   amd: {
  //     toUrlUndefined: true,
  //   },
  //   node: {
  //     // Resolve node module use of fs
  //     fs: "empty",
  //   },
  //   plugins: [
  //     new webpack.DefinePlugin({
  //       CESIUM_BASE_URL: JSON.stringify("./"),
  //     }),
  //     new webpack.DefinePlugin({
  //       BUILDTIME: JSON.stringify(buildTime),
  //     }),
  //   ],
  // },
  css: {
    loaderOptions: {
      scss: {
        // 全局sass变量
        //sass-loader 8.0.0以前版本 , v8 - prependData, v10+ - additionalData
        // additionalData: `@import "~@/style/index.scss";`,
        prependData: `@import "~@/style/index.scss";`,
      },
      sass: {
        // 全局sass变量
        //sass-loader 8.0.0以前版本 , v8 - prependData, v10+ - additionalData
        // additionalData: `@import "~@/style/index.scss";`,
        prependData: `@import "~@/style/index.scss";`,
      },
    },
  },
  // css: {
  //   extract: false,
  //   loaderOptions: {
  //     scss: {
  //       // 全局引入变量和 mixin
  //       additionalData: `
  //         @import "@/style/index.scss";
  //       `,
  //     },
  //   },
  // },
  devServer: {
    proxy: {
      "/api": {
        target: config.requestUrl, // 需要代理的后端接口
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
        pathRewrite: {
          //重写匹配的字段，如果不需要在请求路径上，重写为""
          "/api": "",
        },
      },
      "/image": {
        target: config.imageUrl, // 需要代理的后端接口
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
        pathRewrite: {
          //重写匹配的字段，如果不需要在请求路径上，重写为""
          "/image": "",
        },
      },
    },
  },
};
