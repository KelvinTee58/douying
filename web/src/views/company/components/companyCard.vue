<template>
  <div class="view-company-component-companyCard">
    <div class="card">
      <div class="card-image">
        <!-- 替换成随机图片 -->
        <!-- <img src="https://picsum.photos/400/400" alt="Random Hotel Image" /> -->
        <i class="ri-building-line remixicon"></i>
      </div>
      <div class="card-info">
        <h2 class="card-title">{{ companyInfo.companyName || '公司名称' }}</h2>
        <p class="card-location">
          <van-icon name="location-o" />
          {{ companyInfo.address || '' }}
          {{ companyInfo.detailedAddress || '' }}
        </p>
        <div class="card-footer">
          <span class="card-price">{{
            companyInfo.contactPerson || '未知联系人'
          }}</span>
          <span class="card-price">{{
            companyInfo.contactPhone || '暂无电话'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  components: {
    'van-icon': Icon
  },
  name: 'view-company-component-companyCard',
  props: {
    companyInfo: {
      type: Object,
      default: () => {}
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
    width: 6rem;
    // height: 6rem;
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
        background: url('https://source.unsplash.com/1600x900/?trash') no-repeat
          center;
        background-size: contain;
        cursor: pointer;
      }
    }

    .card-title {
      padding-left: 0.875rem;
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
</style>
