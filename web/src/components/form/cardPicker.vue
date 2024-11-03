<template>
  <div class="components-form-cardPicker">
    <van-cell :title="title" class="cardPicker">
      <template #label>
        <div @click="openCardPicker" class="card_container">
          <div class="card_blank" v-if="isPickerValueEmpty">请选择</div>
          <component
            :is="cardComponent"
            :value="pickerValue"
            :isSelected="false"
            v-else
          />
        </div>
      </template>
    </van-cell>
    <van-popup
      v-model="isShowPopup"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <div class="popup-content">
        <div class="popup-header">
          <div class="cancel-button" @click="closePopup">取消</div>
          <span class="popup-title">请选择</span>
          <div class="confirm-button" @click="confirmSelection">确定</div>
        </div>

        <div class="search-bar">
          <van-search
            v-model="searchKeyWord"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @input="onSearch"
            @cancel="onCancel"
          />
        </div>

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
            v-for="(item, index) in selectList"
            :key="index"
            class="list-item"
            @click="selectItem(item)"
          >
            <component
              :is="cardComponent"
              :value="item"
              :isSelected="tempPickerValue && tempPickerValue.id === item.id"
            />
          </div>
        </van-list>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Cell, Popup, List, Search, Button, Icon } from 'vant';
import _ from 'lodash';
import companiesCard from '../card/companiesCard.vue';
import employeesCard from '../card/employeesCard.vue';
import rawMaterialsCard from '../card/rawMaterialsCard.vue';
import productsCard from '../card/productsCard.vue';

export default {
  name: 'components-form-cardPicker',
  components: {
    companiesCard,
    employeesCard,
    rawMaterialsCard,
    productsCard,
    'van-cell': Cell,
    'van-popup': Popup,
    'van-list': List,
    'van-search': Search,
    'van-icon': Icon,
    'van-button': Button
  },
  data() {
    return {
      isShowPopup: false,
      searchKeyWord: '',
      pagesEvent: {
        totalItems: 0, // 总数据量
        currentPage: 1, // 当前页数
        totalPages: 1, // 总页数
        limit: 10 // 每页条数
      },
      listStatus: {
        loading: false,
        finished: false,
        error: false
      },
      selectList: [],

      tempPickerValue: {},
      pickerValue: {}
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    card: {
      type: String,
      default: 'companies'
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    isPickerValueEmpty() {
      return !this.pickerValue || Object.keys(this.pickerValue).length === 0;
    },
    cardComponent() {
      const cardComponents = {
        companies: companiesCard,
        employee: employeesCard,
        rawMaterials: rawMaterialsCard
      };
      return cardComponents[this.card] || companiesCard; // 默认返回 companiesCard
    }
  },
  watch: {
    value(newValue) {
      this.pickerValue = newValue;
      this.tempPickerValue = newValue;
    }
  },
  methods: {
    filteredItems() {
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(this.searchKeyWord.toLowerCase())
      );
    },

    closePopup() {
      this.isShowPopup = false;
    },
    confirmSelection() {
      this.pickerValue = this.tempPickerValue;
      this.$emit('input', this.pickerValue);
      // 处理确认逻辑
      this.closePopup();
    },
    selectItem(item) {
      if (this.tempPickerValue.id === item.id) {
        this.tempPickerValue = {};
      } else {
        this.tempPickerValue = item;
      }
    },
    openCardPicker() {
      this.isShowPopup = true;
    },
    onRefresh() {
      this.selectList = [];
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
        this.searchKeyWord = '';
      },
      1000,
      {
        leading: true,
        trailing: false
      }
    ),
    async onLoad() {
      let params = {
        page: this.pagesEvent.currentPage,
        limit: this.pagesEvent.limit,
        keyword: this.searchKeyWord
      };
      console.log('params :>> ', params, this.card);

      let apiPath = `/api/${this.card}`;

      try {
        let {
          data: selectList,
          meta: { currentPage, totalItems, totalPages }
        } = await this.$request.get(apiPath, params, {
          loading: false
        });
        this.selectList = [...this.selectList, ...selectList];
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
    }
  }
};
</script>

<style lang="scss" scoped>
.components-form-cardPicker {
  ::v-deep .cardPicker {
    padding: 1rem 1.5rem;
    font-size: $font-size-base;
    color: #646566;
    ::v-deep .van-cell__title {
      width: 4rem;
      font-size: $font-size-base;
    }
  }
  .card_container {
    margin: 0rem -0.5rem;
  }

  .card_blank {
    margin-top: 1rem;
    border-radius: 0.5rem;
    background-color: #f7f8fa;
    border: 0.1rem #ebedf0 dashed;
    min-height: 3rem;
    line-height: 3rem;
    text-align: center;
    width: 100%;
  }
  .popup-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  .cancel-button,
  .confirm-button {
    color: #007bff; /* 可根据需要调整颜色 */
  }

  .search-bar {
    background-color: #f7f8fa;
  }

  .van-list {
    flex: 1; /* 使列表占据剩余空间 */
    overflow-y: auto; /* 使列表可滚动 */
  }
  .list-item {
    position: relative; /* 使得子元素的绝对定位相对于此元素 */
    // padding: 0.5rem; /* 根据需要调整内边距 */
    transition: background-color 0.3s; /* 平滑过渡效果 */
  }
}
</style>
