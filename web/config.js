const NODE_ENV = process.env.NODE_ENV;

console.log("当前环境：", NODE_ENV == "localhost" ? "本地开发环境" : NODE_ENV == "development" ? "开发环境" : "部署环境");

const tempConfig = {
  // localFileUrl: "http://localhost:8080",
  imageUrl: "http://localhost:3000",
  requestUrl: "http://127.0.0.1:3000",
  // useSdcard: false,
};
const devConfig = {
  // localFileUrl: "http://localhost:8080",
  imageUrl: "http://localhost:3000",
  requestUrl: "http://127.0.0.1:3000",
  // useSdcard: true,
};
const prodConfig = {
  // localFileUrl: "http://localhost:8080",
  imageUrl: "http://localhost:3000",
  requestUrl: "http://127.0.0.1:3000",
  // useSdcard: true,
};

/** 项目配置 */
const config = NODE_ENV == "localhost" ? tempConfig : NODE_ENV == "development" ? devConfig : prodConfig;
console.log("项目配置", config);
module.exports = config;
