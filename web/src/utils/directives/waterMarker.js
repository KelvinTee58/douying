/* 
ed: 
<div
style="width: 100%; height: 300px"
v-waterMarker="{text: 'xxx版权所有', textColor: 'rgba(180, 180, 180, 0.5)'}"
>
内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
</div>
 */

/**
 * v-waterMarker 实现页面水印指令
 * @param {*} str 水印文字
 * @param {*} parentNode 父元素
 * @param {*} font 字体
 * @param {*} textColor 文字颜色
 * 例子:
 * <div style="width: 100%; height: 300px" v-waterMarker="{text: 'xxx版权所有', textColor: 'rgba(180, 180, 180, 0.5)'}"></div>
 */
function addWaterMarker(str, parentNode, font, textColor) {
  // 水印文字，父元素，字体，文字颜色
  var can = document.createElement('canvas');
  parentNode.appendChild(can);
  can.width = 200;
  can.height = 150;
  can.style.display = 'none';
  var cans = can.getContext('2d');
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = font || '16px Microsoft JhengHei';
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
  cans.textAlign = 'left';
  cans.textBaseline = 'Middle';
  cans.fillText(str, can.width / 10, can.height / 2);
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
}

const waterMarker = {
  bind: function (el, binding) {
    addWaterMarker(
      binding.value.text,
      el,
      binding.value.font,
      binding.value.textColor
    );
  }
};

export default waterMarker;
