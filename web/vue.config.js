// const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require("webpack");
// const path = require('path')

let buildTime = new Date();

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

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ts$|\.js$|\.vue$/,
          use: [
            {
              loader: "./serverLoader.js",
            },
          ],
        },
      ],
    },
    //entry: ["babel-polyfill", "./src/main.js"]
    amd: {
      toUrlUndefined: true,
    },
    node: {
      // Resolve node module use of fs
      fs: "empty",
    },
    plugins: [
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
      new webpack.DefinePlugin({
        BUILDTIME: JSON.stringify(buildTime),
      }),
    ],
  },
};
