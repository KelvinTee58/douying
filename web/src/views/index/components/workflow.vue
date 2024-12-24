<!--  -->
<template>
  <div class="view-index-components-homepages">
    <div class="batch-switch-wrapper">
      <div class="batch-switch-name"></div>
      <div class="batch-switch-btn"></div>
    </div>
    <van-collapse v-model="activeName">
      <van-collapse-item title="标题1" name="1">
        <template #title>
          <div>标题1</div>
        </template>
        内容
      </van-collapse-item>
      <van-collapse-item title="标题1" name="2">
        <template #title>
          <div>标题1></div>
        </template>
        内容
      </van-collapse-item>
    </van-collapse>
    <div @click="jumpToNext('/company')">
      <Inner-card
        title="入料记录"
        icon="ri-file-list-line"
        iconSource="remixicon"
      />
    </div>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant';
import InnerCard from '@/components/card/InnerCard.vue';
export default {
  name: 'view-index-components-homepages',
  components: {
    'van-collapse': Collapse,
    'van-collapse-item': CollapseItem,
    InnerCard
  },
  data() {
    return {
      activeName: []
    };
  },
  props: {},
  methods: {
    jumpToNext(path) {
      console.log('path :>> ', path);
      this.$router.push(path);
    },
    async getProducingList() {
      try {
        let { data: company } = await this.$request.get(`/api/companies/${id}`);
        console.log('company :>> ', company);
        company.address = company.areaCode ? company.address : '';
        this.formData = company;
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.view-index-components-homepages {
  padding: 1rem;
  // overflow-x: scroll;
  // display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
