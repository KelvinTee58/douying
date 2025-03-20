<!--  -->
<template>
  <div class="view-index-components-homepages">
    <div class="header">
      <h2 class="title">管理</h2>
      <div class="menu" @click="openMenu">
        <van-icon name="ellipsis" />
      </div>
    </div>
    <div class="card-warpper">
      <div @click="jumpToNext('/company')">
        <Inner-card
          title="公司"
          icon="ri-building-line"
          iconSource="remixicon"
        />
      </div>
      <div @click="jumpToNext('/employee')">
        <Inner-card title="员工" icon="ri-user-5-line" iconSource="remixicon" />
      </div>
      <div @click="jumpToNext('/rawMaterial')">
        <Inner-card title="原料" icon="ri-leaf-line" iconSource="remixicon" />
      </div>
      <div @click="jumpToNext('/warehouse')">
        <Inner-card title="仓库" icon="ri-home-8-line" iconSource="remixicon" />
      </div>
      <div @click="jumpToNext('/product')">
        <Inner-card title="产品" icon="ri-box-3-line" iconSource="remixicon" />
      </div>
    </div>
  </div>
</template>

<script>
import InnerCard from '@/components/card/InnerCard.vue';
import { Icon } from 'vant';
export default {
  name: 'view-index-components-homepages',
  components: {
    [Icon.name]: Icon,
    InnerCard
  },
  methods: {
    jumpToNext(path) {
      console.log('path :>> ', path);
      this.$router.push(path);
    },
    openMenu() {}
  }
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.view-index-components-homepages {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem 1rem;
    // background: #fff;
    .title {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  .card-warpper {
    padding: 1rem;
    // overflow-x: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    // -webkit-overflow-scrolling: touch;
    padding-bottom: 25px;
    row-gap: 1rem;
    column-gap: 1rem;
  }
}
.view-index-components-homepages .card-warpper::-webkit-scrollbar {
  display: none;
}
// .navbarCustomClass {
//   background-color: rgba(0, 0, 0, 0);
// }
// .navbarCustomClass::after {
//   display: none;
// }
.find-more {
  text-align: center;
  border: 1px solid #000;
  font-size: 1.4rem;
  line-height: 2.5rem;
  border-radius: 1.4rem;
  width: 20rem;
  margin: 1rem auto 0;
}
</style>
