/* 
ed: 
<template>
  <button v-longpress="{fn: longpress, time: 2000}">长按</button>
</template>

<script>
export default {
  methods: {
    longpress () {
      console.log('长按指令生效')
    }
  }
}
</script> 
*/

/**
 * 长按指令
 * 需求：当用户按下鼠标左键或移动端单指触碰，并按住按钮几秒钟时，视为一次长按，触发对应的函数。
 * 思路：
 *    1. 定义一个计时器，n 秒后执行函数，n 作为参数。
 *    2. 当用户按下按钮时触发 mousedown 或 touchstart 事件，启动计时器。
 *    3. 如果 click、mouseup、touchend 或 touchcancel 事件在 n 秒内被触发，则清除计时器，视为普通点击事件。
 *    4. 如果计时器没有在 n 秒内清除，则视为一次长按，触发对应的函数。
 */
const longpress = {
  bind(el, { value: { fn, time } }) {
    if (typeof fn !== 'function') return;

    el._timer = null;

    el._start = (e) => {
      if (
        (e.type === 'mousedown' && e.button && e.button !== 0) ||
        (e.type === 'touchstart' && e.touches && e.touches.length > 1)
      )
        return;

      // 开始计时
      if (el._timer === null) {
        el._timer = setTimeout(() => {
          fn();
        }, time);

        // 禁用右键默认菜单
        el.addEventListener('contextmenu', (e) => e.preventDefault());

        // 检测触摸移动，移动则取消长按
        el.addEventListener('touchmove', el._cancel);
      }
    };

    // 取消长按
    el._cancel = () => {
      if (el._timer !== null) {
        clearTimeout(el._timer);
        el._timer = null;
        el.removeEventListener('touchmove', el._cancel); // 移除触摸移动监听
      }
    };

    // 绑定事件
    el.addEventListener('mousedown', el._start);
    el.addEventListener('touchstart', el._start);
    el.addEventListener('click', el._cancel);
    el.addEventListener('mouseout', el._cancel);
    el.addEventListener('touchend', el._cancel);
    el.addEventListener('touchcancel', el._cancel);
  },

  unbind(el) {
    // 解绑事件
    el.removeEventListener('mousedown', el._start);
    el.removeEventListener('touchstart', el._start);
    el.removeEventListener('click', el._cancel);
    el.removeEventListener('mouseout', el._cancel);
    el.removeEventListener('touchend', el._cancel);
    el.removeEventListener('touchcancel', el._cancel);
  }
};

export default longpress;
