<template>
  <div class="view-warehouse-create">
    <van-form @submit="onSubmit">
      <!-- 公司名称 -->
      <van-field
        v-model="formData.warehouseName"
        name="warehouseName"
        label="仓库名称"
        placeholder="请输入仓库名称"
        :rules="[{ required: true, message: '仓库名称不能为空' }]"
      />

      <!-- 仓库容量 -->
      <van-field
        class="input-field"
        name="capacity"
        ref="capacityField"
        type="number"
        label="数量"
        placeholder="请输入仓库容量"
        readonly
        clickable
        :value="formData.capacity"
        @touchstart.native.stop="showCapacityKeyBoard = true"
        :rules="[
          { required: true, message: '仓库容量不能为空' },
          { type: 'number', message: '仓库容量必须是数字' },
          { validator: validatorWeight, message: '库存格式不正确' }
        ]"
      />
      <van-number-keyboard
        v-model="stringCapacity"
        :show="showCapacityKeyBoard"
        :extra-key="['00', '.']"
        close-button-text="完成"
        theme="custom"
        @input="validateField"
        @blur="showCapacityKeyBoard = false"
      />

      <!-- 状态选择 -->
      <van-field
        class="input-field"
        readonly
        clickable
        name="unit"
        :value="unitValue"
        label="单位"
        placeholder="请输入单位"
        @click="showUnitPicker = true"
      />
      <van-popup v-model="showUnitPicker" position="bottom">
        <van-picker
          value-key="key"
          show-toolbar
          :columns="unitColumns"
          @confirm="onConfirmUnit"
          @cancel="showUnitPicker = false"
        />
      </van-popup>

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
import { Field, Form, Button, Popup, Area, NumberKeyboard, Picker } from 'vant';
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import {
  getDictionaryKey,
  getDictionaryToArray,
  getDictionaryValue
} from '@/utils/dictionary';

export default {
  name: 'view-warehouse-create',
  components: {
    'van-field': Field,
    'van-form': Form,
    'van-button': Button,
    'van-popup': Popup,
    'van-picker': Picker,
    'van-number-keyboard': NumberKeyboard,
    'van-area': Area
  },
  data() {
    return {
      isCreate: true,
      warehouseId: this.$route.query.id, // 获取传入的 id

      unitColumns: [],
      showUnitPicker: false,
      showCapacityKeyBoard: false,

      formData: {
        warehouseName: '',
        unit: '',
        capacity: '',
        address: '',
        areaCode: '',
        detailedAddress: ''
      },
      showArea: false,

      stringCapacity: '0',
      areaList
    };
  },
  created() {
    // 在组件创建时，检查是否有传入的 id
    if (this.warehouseId) {
      this.isCreate = false;
      this.getCompanyData(this.warehouseId); // 通过 ID 获取公司数据
    }
    this.unitColumns = getDictionaryToArray('common.weight', 'value');
  },
  watch: {
    stringCapacity(val) {
      // 将字符串值转换为浮点数或整数
      this.formData.capacity = parseFloat(val) || 0;
    }
  },
  computed: {
    unitValue() {
      return getDictionaryValue('common.weight', this.formData.unit, '');
    }
  },
  methods: {
    validateField() {
      this.$refs.capacityField.validate(); // 假设你在 van-field 上加了 ref="phoneField"
    },
    validatePhone(value) {
      const phonePattern = /^[1][3-9][0-9]{9}$/;
      return phonePattern.test(value);
    },
    validatorWeight: (value) => {
      if (!value) {
        return false;
      }
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return false;
      } else if (numValue <= 0) {
        return false;
      } else if (!/^\d+(\.\d{1,3})?$/.test(value)) {
        return false;
      } else {
        return true;
      }
    },
    onConfirmArea(values) {
      this.formData.address = values.map((item) => item.name).join('-');
      this.formData.areaCode = values[values.length - 1].code;
      this.showArea = false;
    },
    onConfirmUnit(value) {
      this.showUnitPicker = false;
      this.formData.unit = getDictionaryKey('common.weight', value, '');
    },
    async getCompanyData(warehouseId) {
      let id = warehouseId || '-1';
      try {
        let { data: warehouse } = await this.$request.get(
          `/api/warehouses/${id}`
        );
        warehouse.address = warehouse.areaCode ? warehouse.address : '';
        this.stringCapacity = String(warehouse.capacity) || '0';
        this.formData = warehouse;
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
    async createSubmit() {
      // 提交表单
      let params = this.formData;
      try {
        await this.$request.post('/api/warehouses/create', params);
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
      let id = this.warehouseId;
      let params = this.formData;
      try {
        await this.$request.put(`/api/warehouses/update/${id}`, params);
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
.view-warehouse-create {
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
