<template>
  <div class="view-rawMaterial-index-pages container">
    <van-nav-bar
      :title="currentTitle"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
      fixed
      border
      z-index="100"
      safe-area-inset-top
    >
      <template #right>
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
    <div class="searchBar">
      <transition name="slide-fade">
        <form action="/" v-show="isShowSearch">
          <van-search
            v-model="searchKeyWord"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @input="onSearch"
            @cancel="onCancel"
          />
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="searchStatus"
              :options="statusOptions"
              @change="onRefresh"
            />
          </van-dropdown-menu>
        </form>
      </transition>
    </div>
    <div class="cardList" :class="{ 'search-margin': isShowSearch }">
      <van-pull-refresh v-model="listStatus.refreshing" @refresh="onRefresh">
        <van-list
          v-model="listStatus.loading"
          :finished="listStatus.finished"
          finished-text="没有更多了"
          :error.sync="listStatus.error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          offset="100"
        >
          <div
            :key="item.id"
            v-for="(item, index) in rawMaterials"
            @click="showActionSheet(item, index)"
          >
            <rawMaterialCard :value="item" :title="item"></rawMaterialCard>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-action-sheet
      v-model="isShowActionSheet"
      :actions="actions"
      @select="onSelectAction"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancelAction"
    />
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Search,
  List,
  PullRefresh,
  ActionSheet,
  DropdownMenu,
  DropdownItem
} from 'vant';
import rawMaterialCard from '@/components/card/rawMaterialsCard.vue';
import _ from 'lodash';
import { transformDictionary } from '@/utils/dictionary';

export default {
  name: 'view-rawMaterial-index',
  //import引入的组件需要注入到对象中才能使用
  components: {
    'van-nav-bar': NavBar,
    'van-icon': Icon,
    'van-search': Search,
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'van-action-sheet': ActionSheet,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem,
    rawMaterialCard
  },
  data() {
    //这里存放数据
    return {
      isShowSearch: false,
      isShowActionSheet: false,
      actions: [
        { name: '新增', type: 'create' },
        { name: '修改', type: 'edit' },
        { name: '删除', type: 'delete', color: '#ee0a24' }
      ],
      statusOptions: [],

      searchKeyWord: '',
      searchStatus: '',
      rawMaterials: [],
      selecctEmployee: {},
      selecctEmployeeIndex: -1,

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
      testemployeeCardData: {}
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
    // this.onCancel();
    // this.onLoad();
    this.getStatusOption();
  },
  methods: {
    getStatusOption() {
      let options = transformDictionary('rawMaterial.status', 'text', 'value');
      options.unshift({ text: '全部', value: '' });
      this.statusOptions = options;
    },
    onRefresh() {
      this.listStatus.refreshing = true;
      this.pagesEvent = {
        ...this.pagesEvent,
        totalItems: 0, // 总数据量
        currentPage: 1, // 当前页数
        totalPages: 1 // 总页数
      };
      // 清空列表数据
      this.listStatus.finished = false;
      this.listStatus.error = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.listStatus.loading = true;
      this.onLoad();
    },
    async onLoad() {
      // 刷新逻辑
      if (this.listStatus.refreshing) {
        this.rawMaterials = [];
        this.listStatus.refreshing = false;
      }
      let params = {
        page: this.pagesEvent.currentPage,
        limit: this.pagesEvent.limit,
        keyword: this.searchKeyWord,
        status: this.searchStatus
      };
      try {
        let {
          data: rawMaterials,
          meta: { currentPage, totalItems, totalPages }
        } = await this.$request.get('/api/rawMaterials', params, {
          loading: false
        });
        this.rawMaterials = [...this.rawMaterials, ...rawMaterials];
        this.pagesEvent = {
          ...this.pagesEvent,
          currentPage,
          totalItems,
          totalPages
        };
        if (
          currentPage == totalPages ||
          totalPages == 0 ||
          currentPage >= totalPages
        ) {
          this.listStatus.finished = true;
        } else {
          this.pagesEvent.currentPage += 1;
        }
        this.listStatus.loading = false;
      } catch (error) {
        this.listStatus.error = true;
      }
    },
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },

    onSearch: _.debounce(
      function () {
        this.onRefresh();
      },
      1000,
      {
        leading: true,
        trailing: false
      }
    ),
    onCancel: _.debounce(
      function () {
        this.isShowSearch = false;
        this.searchKeyWord = '';
        // this.onRefresh();
      },
      1000,
      {
        leading: true,
        trailing: false
      }
    ),
    showActionSheet(rawMaterial, index) {
      this.isShowActionSheet = true;
      this.selecctEmployee = rawMaterial;
      this.selecctEmployeeIndex = index;
    },
    onSelectAction(item) {
      this.isShowActionSheet = false;
      console.log('点击选项 ' + item.name);
      if (item.type == 'create') {
        this.$router.push('/rawMaterial/edit');
      } else if (item.type == 'edit') {
        this.$router.push({
          path: '/rawMaterial/edit',
          query: {
            id: this.selecctEmployee.id
          }
        });
      } else {
        // 删除

        this.$request
          .del('/api/rawMaterials/delete/' + this.selecctEmployee.id)
          .then(() => {
            // this.$toast.success({});
            // console.log('删除成功');
            this.$toast.success('删除成功');
            if (this.selecctEmployeeIndex !== -1) {
              this.rawMaterials.splice(this.selecctEmployeeIndex, 1); // 根据索引删除
            }
          })
          .catch((error) => {
            console.log('error :>> ', error);
          });
      }
    },
    onCancelAction() {
      this.isShowActionSheet = false;
      this.selecctEmployee = {};
      this.selecctEmployeeIndex = -1;
    }
  },
  //监控data中的数据变化
  watch: {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.view-rawMaterial-index-pages {
  padding-top: 3rem; // 确保内容整体从 navBar 下开始
  .search-icon {
    margin-right: 30px;
  }
  // .searchBar {
  //   position: sticky;
  //   margin-top: 3rem;
  // }
  .searchBar {
    position: fixed;
    top: 2.8rem; // 紧贴 navbar 之下
    left: 0;
    width: 100%;
    z-index: 99;
  }

  .cardList {
    margin-top: 0rem; // 避免内容直接顶到 searchBar 或 navBar
  }
  .search-margin {
    margin-top: 6rem; // 紧贴 navbar 之下;
  }

  // 添加渐隐过渡效果
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
