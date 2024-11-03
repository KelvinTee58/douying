<template>
  <div class="components-card-productsCard">
    <div class="card" :class="{ selected: isSelected }">
      <div class="card-image">
        <!-- 替换成随机图片 -->
        <!-- <img src="https://picsum.photos/400/400" alt="Random Hotel Image" /> -->
        <i class="ri-box-3-line remixicon"></i>
      </div>
      <div class="card-info">
        <div class="card-footer">
          <span class="card-price">
            <h2 class="card-title">
              {{ value.productName || '产品名称' }} |
              {{ value.specification | specificationFilter }}
            </h2>
          </span>
        </div>
        <div class="card-footer">
          <p class="card-location">
            <van-icon name="points" />
            {{ value.quantity || 0 }} {{ value.unit | unitFilter }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
import { getDictionaryValue } from '@/utils/dictionary';
export default {
  components: {
    'van-icon': Icon
  },
  name: 'components-card-productsCard',
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    specificationFilter(value) {
      return getDictionaryValue('product.specification', value, value);
    },
    unitFilter(value) {
      return getDictionaryValue('common.weight', value, '');
    }
  },
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
.components-card-productsCard {
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 100%;
    margin: 0.5rem;
    padding: 0.7rem 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .card-image {
      width: 5rem;
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        object-fit: cover;
      }
      .remixicon {
        font-size: 5rem;
      }
    }

    .card-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
      margin-left: 0.2rem;
      max-width: calc(100% - 6rem);

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .card-type {
          font-size: 0.875rem;
          font-weight: bold;
          color: #1989fa;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
        }

        .card-delete {
          width: 1rem;
          height: 1rem;
          background: url('https://source.unsplash.com/1600x900/?trash')
            no-repeat center;
          background-size: contain;
          cursor: pointer;
        }
      }

      .card-title {
        font-size: 1.25rem;
        font-weight: bold;
        color: #333;
        margin: 0.25rem 0;
      }

      .card-location {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        color: #999;

        .card-location-icon {
          width: 0.875rem;
          height: 0.875rem;
          background: url('https://source.unsplash.com/1600x900/?location')
            no-repeat center;
          background-size: contain;
          margin-right: 0.25rem;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.875rem;

        .card-price {
          font-size: 1rem;
          font-weight: bold;
          color: #1989fa;
        }

        .card-button {
          padding: 0.5rem 1rem;
          background-color: #1989fa;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: #0056b3;
          }
        }
      }
    }
  }
  .selected {
    background-color: #f7f8fa;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0rem 0.5rem;
      border-radius: 0.5rem;
      background: linear-gradient(
        to right,
        rgba(#007bff, 0) 0%,
        rgba(#007bff, 0.5) 100%
      );
      z-index: 10; /* 放在下面 */
    }
  }
  .success-icon {
    margin-left: 0.5rem; /* 图标与文本之间的间距 */
    z-index: 20; /* 确保图标在上面 */
    position: absolute;
    right: 3rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    line-height: 3rem;
  }
}
</style>
