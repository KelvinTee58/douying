<template>
  <div class="view-company-index-pages container">
    <van-nav-bar
      :title="currentTitle"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
      >s
      <template #right>
        <van-icon name="plus" size="18" class="search-icon" />
        <van-icon
          name="search"
          size="18"
          @click="isShowSearch = true"
          v-show="!isShowSearch"
        />
        <van-icon
          name="cross"
          size="18"
          @click="onCancel"
          v-show="isShowSearch"
        />
      </template>
    </van-nav-bar>
    <form action="/" v-show="isShowSearch">
      <van-search
        v-model="searchKeyWord"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @input="onSearch"
        s
        @cancel="onCancel"
      />
    </form>
    <div class="cardList">
      <!-- <companyCard :companyInfo="testCompanyCardData"></companyCard> -->

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <companyCard
          :companyInfo="testCompanyCardData"
          v-for="item in list"
          :key="item"
          :title="item"
        ></companyCard>
      </van-list>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Search, List } from 'vant';
import companyCard from './components/companyCard.vue';
export default {
  name: 'view-company-index',
  //import引入的组件需要注入到对象中才能使用
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-search': Search,
    'van-list': List,
    companyCard
  },
  data() {
    //这里存放数据
    return {
      isShowSearch: false,
      searchKeyWord: '',

      list: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,

      listStatus: {
        loading: false,
        finished: false,
        error: false,
        refreshing: false
      },
      pagesEvent: {
        totalItems: 0, // 总数据量
        currentPage: 1, // 当前页数
        totalPages: 1, // 总页数
        limit: 10 // 每页条数
      },
      testCompanyCardData: {}
    };
  },
  //监听属性 类似于data概念
  computed: {
    currentTitle() {
      // 从路由信息中获取标题
      return this.$route.meta.title || ''; // 如果没有设置meta.title，则使用默认标题
    }
  },
  mounted() {
    //生命周期 - 创建完成（可以访问当前this实例）
    this.onCancel();
    // this.onLoad();
  },
  methods: {
    onRefresh() {
      // 清空列表数据
      this.listStatus.finished = false;
      this.listStatus.error = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.listStatus.loading = true;
      this.onLoad();
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
      let params = {
        page: this.pagesEvent.currentPage,
        limit: this.pagesEvent.limit
      };
      try {
        let companies = await this.$request.get('/api/companies', params);
        console.log('companies :>> ', companies);
        // this.loginIn(logininfo.data);

        // Toast.success({
        //   message: '欢迎您，' + logininfo.data.user.name,
        //   duration: 2000
        // });
        setInterval(() => {
          this.$router.replace({ path: '/index' });
        }, 2000);
      } catch (error) {
        this.listStatus.error = true;
      }
    },
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },

    onSearch(val) {
      // Toast(val);
      console.log('val :>> ', val);
    },
    onCancel() {
      // Toast('取消');
      this.isShowSearch = false;
      this.searchKeyWord = '';
    }
  },
  //监控data中的数据变化
  watch: {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.view-company-index-pages {
  .search-icon {
    margin-right: 30px;
  }
}
</style>
