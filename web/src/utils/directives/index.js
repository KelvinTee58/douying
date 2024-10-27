/**
 * 参考：
 * 主要：https://blog.csdn.net/icemwj/article/details/130238856
 * https://juejin.cn/post/7067051410671534116#heading-0
 * https://juejin.cn/post/6953879183600648229#heading-1
 *
 */
// 导入指令文件
import longpress from './longpress'; // 长按指令
// import debounce from './debounce'; // 函数防抖指令
// import throttle from './throttle'; // 函数节流指令
// import clickOut from './clickOut'; // 点击元素外部指令
// import scrollPop from './scrollPop'; // 弹窗限制外部滚动指令
// import focus from './focus'; // 聚焦指令
import copy from './copy'; // 复制粘贴指令
// import permission from './permission'; // 权限校验指令
import waterMarker from './waterMarker'; // 实现页面水印效果
// import draggable from './draggable'; // 拖拽指令
// import emoji from './emoji'; // 禁止表情及特殊字符

// 集成一起
const directives = {
  longpress,
  // debounce,
  // throttle,
  // clickOut,
  // scrollPop,
  // focus,
  copy,
  // permission,
  waterMarker
  // draggable,
  // emoji
};

// 批量注册
const install = function (Vue) {
  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key]);
  });
};

export default install;
