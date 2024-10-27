/* 
  ed:
  <div>
	<!-- 显示 -->
    <button v-permission="'1'">权限按钮1</button>
    <!-- 不显示 -->
    <button v-permission="'10'">权限按钮2</button>
 </div> 
 */

/**
 * v-permission 权限校验指令
 */
function checkArray(key) {
  let arr = ['1', '2', '3', '4'];
  let index = arr.indexOf(key);
  if (index > -1) {
    return true; // 有权限
  } else {
    return false; // 无权限
  }
}

const permission = {
  inserted: function (el, binding) {
    let permission = binding.value; // 获取到 v-permission 的值
    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      console.log(`请设置操作权限标签值`);
    }
  }
};

export default permission;
