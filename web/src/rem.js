// 做rem 配置手机格式  兼容处理
function setHtml() {
  //获取设备宽度
  var deviceWidth = document.documentElement.offsetWidth;
  //给html标签设置fontSize，就是给rem赋值
  document.documentElement.style.fontSize = (deviceWidth / 375) * 10 + "px";
}

//窗口大小变化的时候执行
window.onresize = setHtml;
//页面初始加载时也要触发
setHtml();
