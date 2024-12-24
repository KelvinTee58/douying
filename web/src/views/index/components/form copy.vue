<template>
  <div>
    <label for="arrowCount">输入箭头数量：</label>
    <input
      id="arrowCount"
      type="number"
      v-model.number="arrowCount"
      min="1"
      placeholder="请输入数量"
    />
    <div class="arrow-container">
      <div v-for="n in arrowCount" :key="n" class="arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicArrowAnimation',
  data() {
    return {
      arrowCount: 5 // 默认显示 5 个箭头
    };
  }
};
</script>

<style scoped>
/* 整体样式 */
.arrow-container {
  display: flex;
  align-items: center;
  gap: 10px; /* 箭头间距 */
  margin-top: 20px;
}

/* 箭头样式 */
.arrow {
  width: 20px;
  height: 20px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  transform: rotate(45deg);
  animation: moveArrow 1s infinite ease-in-out;
}

/* 动态时间间隔 */
.arrow:nth-child(n) {
  animation-delay: calc((n - 1) * 0.2s);
}

/* 动画效果 */
@keyframes moveArrow {
  0% {
    opacity: 0.2;
    transform: translateX(0) rotate(45deg);
  }
  25% {
    opacity: 1;
    transform: translateX(10px) rotate(45deg);
  }
  50% {
    opacity: 0.2;
    transform: translateX(20px) rotate(45deg);
  }
  75% {
    opacity: 1;
    transform: translateX(10px) rotate(45deg);
  }
  100% {
    opacity: 0.2;
    transform: translateX(0) rotate(45deg);
  }
}
</style>
