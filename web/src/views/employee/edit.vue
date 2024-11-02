<template>
  <div class="view-employee-create">
    <van-form @submit="onSubmit">
      <!-- 联系人姓名 -->
      <van-field
        v-model="formData.employeeNumber"
        required
        name="employeeNumber"
        label="员工号"
        placeholder="请输入员工号"
        :rules="[{ required: true, message: '员工号不能为空' }]"
      />

      <van-field
        v-model="formData.name"
        required
        name="name"
        label="姓名"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '姓名不能为空' }]"
      />

      <!-- 联系电话 -->
      <van-field
        v-model="formData.phone"
        name="phone"
        label="电话"
        placeholder="请输入联系电话"
        :rules="[{ validator: validatePhone, message: '请输入正确的电话号码' }]"
      />

      <!-- 性别选择 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="genderValue"
        label="性别"
        placeholder="点击选择性别"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

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
import { Field, Form, Button, Popup, Picker } from 'vant';
import { Toast } from 'vant';
import { getDictionaryValue } from '@/utils/dictionary';

export default {
  name: 'view-employee-create',
  components: {
    'van-field': Field,
    'van-form': Form,
    'van-button': Button,
    'van-popup': Popup,
    'van-picker': Picker
  },
  data() {
    return {
      isCreate: true,
      columns: ['男', '女'], // 只提供男和女
      showPicker: false,
      formData: {
        employeeNumber: '',
        name: '',
        phone: '',
        gender: '' // 性别字段
      },
      employeeId: this.$route.query.id // 获取传入的 id
    };
  },
  created() {
    if (this.employeeId) {
      this.isCreate = false;
      this.getEmployeeData(this.employeeId); // 通过 ID 获取公司数据
    }
  },
  computed: {
    genderValue() {
      return getDictionaryValue('employee.gender', this.formData.gender, '');
    }
  },
  methods: {
    validatePhone(value) {
      if (value === '') return true;
      const phonePattern = /^[1][3-9][0-9]{9}$/;
      return phonePattern.test(value);
    },
    async getEmployeeData(employeeId) {
      let id = employeeId || '-1';
      try {
        let { data: employee } = await this.$request.get(
          `/api/employees/${id}`
        );
        this.formData = employee;
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
    onConfirm(value) {
      this.formData.gender = value[0] === '男' ? 'M' : 'F'; // 将选择的性别转换为 M 或 F
      this.showPicker = false;
    },
    async createSubmit() {
      let params = this.formData;
      if (params.gender && !['M', 'F'].includes(params.gender)) {
        // 验证性别值
        Toast.fail('请选择有效的性别');
        return;
      }
      try {
        await this.$request.post('/api/employees/create', params);
        Toast.success({
          message: '新增成功',
          duration: 2000
        });
        this.$router.go(-1);
      } catch (error) {
        console.error('error :>> ', error);
      }
    },
    async editSubmit() {
      let id = this.employeeId;
      let params = this.formData;
      if (params.gender && !['M', 'F'].includes(params.gender)) {
        // 验证性别值
        Toast.fail('请选择有效的性别');
        return;
      }
      try {
        await this.$request.put(`/api/employees/update/${id}`, params);
        Toast.success({
          message: '修改成功',
          duration: 2000
        });
        this.$router.go(-1);
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
.view-employee-create {
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
