<template>
  <div class="components-statistics-card">
    <div class="card-wrapper">
      <slot name="Icon">
        <i :class="icon" class="remixicon" v-if="iconSource == 'remixicon'" />
        <van-icon :name="icon" class="remixicon" v-else />
      </slot>
      <div class="card-title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  components: { 'van-icon': Icon },

  props: {
    title: {
      default: '',
      type: String
    },
    icon: {
      default: 'home-o',
      type: String
    },
    iconSource: {
      default: 'default',
      type: String
    }
  }
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
    border-radius: 1.2rem;
    padding: 1rem;
    text-align: center;
    .card-title {
      font-size: 1rem;
    }
    // letter-spacing: 0.5rem;
    .remixicon {
      font-size: 3rem;
    }
  }
}
</style>
