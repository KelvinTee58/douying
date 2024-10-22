<template>
  <div class="views-company-index">
    <div class="controlPanel">
      <van-button plain type="info" icon="plus"></van-button>
      <van-button plain type="info" icon="setting-o"></van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
export default {
  name: 'view-company-index',
  //import引入的组件需要注入到对象中才能使用
  components: {
    vanButton: Button
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.views-company-index {
  .controlPanel {
    margin: 10px;
    text-align: right;
    .van-button {
      margin-left: 10px;
    }
  }
}
</style>
