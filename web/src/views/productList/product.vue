<template>
  <div class="productList-product-page">
    <coo-navbar leftIcon="none" rightIcon="none" title="新增产品" customClass="navbarCustomClass"> </coo-navbar>
    <div class="form-wrapper">
      <van-form>
        <van-field v-model="username" name="产品名称" label="产品名称" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="生产日期" name="生产日期" label="生产日期" placeholder="生产日期" :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field readonly clickable name="picker" :value="pickerValue" label="选择器" placeholder="点击选择城市" @click="showPicker = true" />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      phone: "15816081222",
      password: "root",
      username: "",
      pickerValue: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getCompanyList();
  },
  //方法集合
  methods: {
    getCompanyList() {},
    onConfirm() {},
  },
};
</script>
<style lang="scss" scoped>
.productList-product-page {
  // .form-wrapper {
  // }
  // .navbarCustomClass {
  //   background-color: rgba(0, 0, 0, 0);
  // }
  // .navbarCustomClass::after {
  //   display: none;
  // }
}
//@import url(); 引入公共css类
</style>
