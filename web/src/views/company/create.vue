<template>
  <div class="view-company-create">
    <van-form @submit="onSubmit">
      <!-- 公司名称 -->
      <van-field
        v-model="formData.companyName"
        name="companyName"
        label="公司"
        placeholder="请输入公司名称"
        :rules="[{ required: true, message: '公司名称不能为空' }]"
      />

      <!-- 联系人姓名 -->
      <van-field
        v-model="formData.contactPerson"
        name="contactPerson"
        label="联系人"
        placeholder="请输入联系人姓名"
        :rules="[{ required: true, message: '联系人姓名不能为空' }]"
      />

      <!-- 联系电话 -->
      <van-field
        v-model="formData.contactPhone"
        name="contactPhone"
        label="电话"
        placeholder="请输入联系电话"
        :rules="[
          { required: true, message: '联系电话不能为空' },
          { validator: validatePhone, message: '请输入正确的电话号码' }
        ]"
      />

      <!-- 地区选择 -->
      <van-field
        readonly
        clickable
        name="area"
        :value="formData.address"
        label="地区"
        placeholder="点击选择省市区"
        @click="showArea = true"
        :rules="[{ required: true, message: '请选择地区' }]"
      />

      <!-- 地区选择弹窗 -->
      <van-popup v-model="showArea" position="bottom" round>
        <van-area
          :area-list="areaList"
          @confirm="onConfirmArea"
          @cancel="showArea = false"
          :columns-placeholder="['请选择', '请选择', '请选择']"
        />
      </van-popup>

      <!-- 详细地址 -->
      <van-field
        v-model="formData.detailedAddress"
        name="detailedAddress"
        label="详细地址"
        placeholder="请输入详细地址"
        :rules="[{ required: true, message: '详细地址不能为空' }]"
      />
      <!-- 提交按钮 -->
      <div class="form-button">
        <van-button round block type="info" native-type="submit">
          {{ isCreate ? '新建' : '修改' }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Field, Form, Button, Popup, Area } from 'vant';
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';

export default {
  name: 'view-company-create',
  components: {
    'van-field': Field,
    'van-form': Form,
    'van-button': Button,
    'van-popup': Popup,
    'van-area': Area
  },
  data() {
    return {
      isCreate: true,
      companyId: this.$route.query.id, // 获取传入的 id
      formData: {
        companyName: '',
        contactPerson: '',
        contactPhone: '',
        address: '',
        areaCode: '',
        detailedAddress: ''
      },
      showArea: false,
      areaList
    };
  },
  created() {
    // 在组件创建时，检查是否有传入的 id
    if (this.companyId) {
      this.isCreate = false;
      this.getCompanyData(this.companyId); // 通过 ID 获取公司数据
    }
  },
  methods: {
    validatePhone(value) {
      const phonePattern = /^[1][3-9][0-9]{9}$/;
      return phonePattern.test(value);
    },
    onConfirmArea(values) {
      this.formData.address = values.map((item) => item.name).join('-');
      this.formData.areaCode = values[values.length - 1].code;
      this.showArea = false;
    },
    async getCompanyData(companyId) {
      let id = companyId || '-1';
      try {
        let { data: company } = await this.$request.get(`/api/companies/${id}`);
        console.log('company :>> ', company);
        company.address = company.areaCode ? company.address : '';
        this.formData = company;
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
    async createSubmit() {
      // 提交表单
      let params = this.formData;
      try {
        await this.$request.post('/api/companies/create', params);
        Toast.success({
          message: '新增成功',
          duration: 2000
        });
        this.$router.go(-1); // 返回上一页
      } catch (error) {
        console.error('error :>> ', error);
      }
    },
    async editSubmit() {
      let id = this.companyId;
      let params = this.formData;
      try {
        await this.$request.put(`/api/companies/update/${id}`, params);
        this.$toast.success({
          message: '修改成功',
          duration: 2000
        });
        this.$router.go(-1); // 返回上一页
      } catch (error) {
        console.error('error :>> ', error);
      }
    },
    async onSubmit() {
      if (!this.isCreate) {
        this.editSubmit();
      } else {
        this.createSubmit();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.view-company-create {
  padding: 1rem;
  font-size: $font-size-base;
  .form-button {
    margin-top: 3rem;
  }
  ::v-deep .van-field__label {
    width: 4rem;
    font-size: $font-size-base;
  }
  ::v-deep .van-field__control {
    font-size: $font-size-base;
  }
  ::v-deep .van-cell {
    padding: 1rem 1.5rem;
  }
  ::v-deep .van-address-edit-detail {
    .van-cell {
      padding: 0rem;
    }
  }
}
</style>
