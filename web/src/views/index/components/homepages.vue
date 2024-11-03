<!--  -->
<template>
  <div class="view-index-components-homepages">
    <statistics-card
      title="总量"
      trend="3.4"
      trendStatus="up"
      statistics="123456789"
      :unit="'KG'"
    >
    </statistics-card>
    <statistics-card
      title="芒果"
      trend="3.4"
      trendStatus="up"
      statistics="44"
      :unit="'KG'"
    >
    </statistics-card>
    <statistics-card
      title="木瓜"
      trend="3.4"
      trendStatus="none"
      statistics="5999"
      :unit="'KG'"
    >
    </statistics-card>
    <statistics-card
      title="菠萝"
      trend="3.4"
      trendStatus="down"
      statistics="22"
      :unit="'KG'"
    >
    </statistics-card>
    <!-- <div class="find-more" @click="findMore">查看更多</div> -->
  </div>
</template>

<script>
import statisticsCard from '@/components/card/statisticsCard.vue';
export default {
  name: 'view-index-components-homepages',
  components: {
    statisticsCard
  },
  props: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.view-index-components-homepages {
  margin: 1rem;
  // overflow-x: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  // -webkit-overflow-scrolling: touch;
  padding-bottom: 25px;
  row-gap: 1rem;
  column-gap: 1rem;
}
.view-index-components-homepages::-webkit-scrollbar {
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
