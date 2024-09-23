import axios from "axios";
import store from "@/store/index";

let refreshTime = 3;
console.log("store", store);

// 正在进行中的请求列表
// let reqList = [];

// import { config } from "localforage";
const requestTimeout = 60; // 设定超时时间
// 设置请求超时
// 通过axios.defaults.timeout设置默认的请求超时时间。例如超过了60s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 1000 * requestTimeout;

// 是否开启全局loading
function globalLoading(loading = true) {
  // console.log("globalLoading", this, loading);
  if (loading) {
    // 全局loadding
    window.$cooToast({
      // id: 'tempToast',
      content: "加载中",
      type: "loading",
      duration: 1000 * requestTimeout,
    });
  }
}

// 获取请求地址前缀
function getRequestUrl(url, fullUrl = false) {
  if (fullUrl) {
    return url;
  } else {
    // return "reqUrl" + url;
    // return "/api" + url;
    return url;
  }
}

// 重刷token
function refreshAccessToken() {
  // 刷新次数超过三次退出
  if (refreshTime <= 0) {
    window.$cooToast({
      content: "获取用户令牌失败",
      duration: 2000,
      type: "fail",
    });
    refreshTime = 3;
    store.dispatch("user/loginout");
    return;
  }
  refreshTime--;
  let refreshToken = store.getters["user/getRefreshToken"];
  console.log("refreshToken refreshToken", refreshToken);
  try {
    // 重刷token
    axios
      .post("/api/users/token", { refreshToken: refreshToken })
      .then((response) => {
        let resData2 = response.data;
        console.log("refresh token response", resData2.data.accessToken);
        if (response.status == 200 && resData2.status == 0) {
          // 成功刷新token
          store.dispatch("user/updateAccessToken", resData2.data.accessToken);
        } else {
          // 不成功刷新token
          store.dispatch("user/updateAccessToken", null);
        }
        // refreshTime = 3;
      })
      .catch((error) => {
        // 刷新AccessToken 出现问题
        // 如果刷新token使用的refreshToken有问题（status == 403）
        // 报错后退出登录
        // 否则可以刷新3次
        if (error.data.status == 403) {
          window.$cooToast({
            content: "登录过期，请重新登录",
            duration: 1000,
            type: "fail",
          });
          refreshTime = 3;
          store.dispatch("user/loginout");
        } else {
          refreshAccessToken();
        }
      });
  } catch (error) {
    console.log("refreshtoken error", error);
    store.dispatch("user/loginout");
    // 不成功刷新token
    refreshTime = 3;
  }
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    let token = store.getters["user/getAccessToken"];
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    let resData = response.data;
    if (response.status === 200 && resData.status == "0") {
      // const { data } = response;
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    let resData = error.response;
    // 拦截token 失效为401
    if (resData.status == 403 || resData.status == 401) {
      // console.log("refreshToken");
      refreshAccessToken();
    }
    if (!resData.data.message) {
      resData.data.message = `status:${resData.status};message:${error.message}`;
    }
    console.log("interceptors.response error", resData);
    return Promise.reject(resData);
  }
);

/**
 * 错误处理
 * @param {*} error 错误信息
 * @param {*} pure 是否为纯净模式
 * @param {*} pure 是否为纯净模式
 * @returns
 */
function errorHandler(error, pure = false) {
  if (pure) {
    return;
  }
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展

  if (error.status) {
    switch (error.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        this.$router.replace({
          path: "/login",
          query: {
            redirect: this.$router.currentRoute.fullPath,
          },
        });
        break;
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        window.$cooToast({
          content: "登录过期，请重新登录",
          duration: 1000,
          type: "fail",
        });
        // 清除token
        // localStorage.removeItem('token')
        // store.commit('loginSuccess', null)
        // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        // setTimeout(() => {
        //   router.replace({
        //     path: '/login',
        //     query: {
        //       redirect: router.currentRoute.fullPath
        //     }
        //   })
        // }, 1000)
        break;
      // 404请求不存在
      case 404:
        window.$cooToast({
          content: "网络请求不存在",
          duration: 2000,
          type: "fail",
        });
        break;
      // 其他错误，直接抛出错误提示
      default:
        console.log("cooToast", error.data.message);
        window.$cooToast({
          content: error.data.message,
          duration: 2000,
          type: "fail",
        });
    }
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求时选项配置]
 *  << pure 是否纯净模式错误信息直接返回不做处理(默认为false)；
 *  loading 是否纯开启全局loading(默认为true)；
 *  fullUrl 是否是完整url，外部url，不走内部服务(默认为false)；>>
 */
export function get(
  url,
  params,
  option = {
    pure: false,
    loading: true,
    fullUrl: false,
  }
) {
  let that = this;
  return new Promise((resolve, reject) => {
    globalLoading.apply(that, [option.loading]); // 开启loading
    axios
      .get(getRequestUrl(url, option.fullUrl), {
        params: params,
      })
      .then((res) => {
        // errorHandler(res, option.pure);
        window.$cooToastHide(); // 结束关闭loading
        resolve(res.data);
      })
      .catch((err) => {
        window.$cooToastHide(); // 结束关闭loading
        errorHandler.apply(that, [err, option.pure]);
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求时选项配置]
 *  << pure 是否纯净模式错误信息直接返回不做处理(默认为false)；
 *  loading 是否纯开启全局loading(默认为true)；
 *  fullUrl 是否是完整url，外部url，不走内部服务(默认为false)；>>
 */
export function post(
  url,
  params,
  option = {
    pure: false,
    loading: true,
    fullUrl: false,
  }
) {
  let that = this;

  return new Promise((resolve, reject) => {
    globalLoading.apply(that, [option.loading]); // 开启loading
    axios
      .post(getRequestUrl(url, option.fullUrl), params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        window.$cooToastHide(); // 结束关闭loading
        resolve(res.data);
      })
      .catch((err) => {
        window.$cooToastHide(); // 结束关闭loading
        errorHandler.apply(that, [err, option.pure]);
        reject(err.data);
      });
  });
}
