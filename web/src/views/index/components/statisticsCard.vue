<template>
  <div class="components-statistics-card">
    <div class="card-wrapper">
      <div class="card-title">{{ title }}</div>
      <slot name="statistics">
        <div class="statistics">
          <span>{{ statistics | million }}</span>
          <div class="unit">{{ unit }}</div>
        </div>
      </slot>

      <slot name="trend">
        <div class="trend-wrapper">
          <div class="card-trend">
            <span>{{ trend }}</span>
            <!-- <coo-icon :name="trendIcon"></coo-icon> -->
            <i :class="trendIcon"></i>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    trend: {
      default: '',
      type: String
    },
    statistics: {
      default: '',
      type: String
    },
    unit: {
      default: '',
      type: String
    },
    trendStatus: {
      default: '',
      type: String
    }
  },
  //局部过滤器
  filters: {
    million(value) {
      //过万处理
      let num;
      if (value > 9999 && value <= 99999999) {
        //大于9999显示x.xx万
        num = Math.floor(value / 1000) / 10 + '万';
      } else if (value > 99999999) {
        num = Math.floor(value / 10000000) / 10 + '亿';
      } else if (value < 9999 && value > -9999) {
        num = value;
      } else if (value < -9999 && value >= -99999999) {
        //小于-9999显示-x.xx万
        num = -(Math.floor(Math.abs(value) / 1000) / 10) + '万';
      } else if (value < -99999999) {
        //小于-99999999-x.xx万
        num = -(Math.floor(Math.abs(value) / 10000000) / 10) + '亿';
      }
      return num;
    }
  },
  //监听属性 类似于data概念
  computed: {
    trendIcon() {
      if (this.trendStatus == 'up') {
        return 'ri-arrow-right-up-line';
      } else if (this.trendStatus == 'down') {
        return 'ri-arrow-right-down-line';
      } else {
        return 'ri-pulse-line';
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.components-statistics-card {
  display: inline-block;
  color: #fff;
  .card-wrapper {
    // background: $primary;
    background: #1989fa;
    width: 35vw;
    max-width: 9rem;
    border-radius: 1rem;
    padding: 1rem;
    .card-title {
      font-size: 1.8rem;
      letter-spacing: 0.5rem;
    }
    .statistics {
      padding: 0.4rem 0rem;
      font-weight: bolder;
      font-size: 2.2rem;
      line-height: 2.2rem;
      .unit {
        display: inline-block;
        padding-left: 0.4rem;
        font-weight: lighter;
        font-size: 1.2rem;
        line-height: 1.2rem;
      }
    }
    .trend-wrapper {
      // color: ;
      // background-color: $success;
      color: #fff;
      display: inline-block;
      border-radius: 1rem;
      min-width: 5rem;
      text-align: center;
      font-size: 1.6rem;
      background-color: rgba(10, 171, 98, 0);
      border: 1px solid #fff;
      span {
        vertical-align: middle;
      }
    }
    .trend-wrapper__up {
      background-color: rgb(255, 51, 0);
      border-color: rgb(255, 51, 0);
    }
    .trend-wrapper__down {
      background-color: rgb(10, 171, 98);
      border-color: rgb(10, 171, 98);
    }
  }
}
</style>
