<template>
  <div class="view-rawMaterial-create">
    <van-form @submit="onSubmit">
      <!-- 联系人姓名 -->
      <van-field
        class="input-field"
        v-model="formData.materialName"
        name="materialName"
        label="名称"
        placeholder="请输入原料名称"
        :rules="[{ required: true, message: '原料名称不能为空' }]"
      />

      <!-- 库存数量 -->
      <van-field
        class="input-field"
        name="quantity"
        ref="quantityField"
        type="number"
        label="数量"
        placeholder="请输入库存数量"
        readonly
        clickable
        :value="formData.quantity"
        @touchstart.native.stop="showQuantityKeyBoard = true"
        :rules="[
          { required: true, message: '库存数量不能为空' },
          { type: 'number', message: '库存数量必须是数字' },
          { validator: validatorWeight, message: '库存格式不正确' }
        ]"
      />
      <van-number-keyboard
        v-model="stringQuantity"
        :show="showQuantityKeyBoard"
        :extra-key="['00', '.']"
        close-button-text="完成"
        theme="custom"
        @input="validateField"
        @blur="showQuantityKeyBoard = false"
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

      <!-- 状态选择 -->
      <van-field
        class="input-field"
        readonly
        clickable
        name="status"
        :value="statusValue"
        label="状态"
        placeholder="请选择原料状态"
        @click="showStatusPicker = true"
      />
      <van-popup v-model="showStatusPicker" position="bottom">
        <van-picker
          value-key="key"
          show-toolbar
          :columns="statusColumns"
          @confirm="onConfirmStatus"
          @cancel="showStatusPicker = false"
        />
      </van-popup>

      <cardPicker
        title="公司"
        :value="formData.Company"
        @input="cardPickerInput"
      ></cardPicker>

      <van-field
        class="input-field"
        v-model="formData.remark"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注"
        show-word-limit
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
import {
  Field,
  Form,
  Button,
  Popup,
  Picker,
  NumberKeyboard,
  Toast
} from 'vant';
import {
  getDictionaryKey,
  getDictionaryToArray,
  getDictionaryValue
} from '@/utils/dictionary';
import cardPicker from '@/components/form/cardPicker.vue';

export default {
  name: 'view-rawMaterial-create',
  components: {
    cardPicker,
    'van-field': Field,
    'van-form': Form,
    'van-button': Button,
    'van-popup': Popup,
    'van-picker': Picker,
    'van-number-keyboard': NumberKeyboard
  },
  data() {
    return {
      isCreate: true,
      statusColumns: [],
      unitColumns: [],
      showStatusPicker: false,
      showUnitPicker: false,
      showQuantityKeyBoard: false,

      formData: {
        materialName: '',
        quantity: '',
        unit: '',
        status: '', // 性别字段
        remark: ''
      },

      stringQuantity: '0',

      rawMaterialId: this.$route.query.id // 获取传入的 id
    };
  },
  computed: {
    statusValue() {
      return getDictionaryValue('rawMaterial.status', this.formData.status, '');
    },
    unitValue() {
      return getDictionaryValue('common.weight', this.formData.unit, '');
    }
  },
  watch: {
    stringQuantity(val) {
      // 将字符串值转换为浮点数或整数
      this.formData.quantity = parseFloat(val) || 0;
    }
  },
  created() {
    if (this.rawMaterialId) {
      this.isCreate = false;
      this.getRawMaterialIdData(this.rawMaterialId); // 通过 ID 获取公司数据
    }
    this.statusColumns = getDictionaryToArray('rawMaterial.status', 'value');
    this.unitColumns = getDictionaryToArray('common.weight', 'value');
  },
  methods: {
    validateField() {
      this.$refs.quantityField.validate(); // 假设你在 van-field 上加了 ref="phoneField"
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
    async getRawMaterialIdData(rawMaterialId) {
      let id = rawMaterialId || '-1';
      try {
        let { data: rawMaterial } = await this.$request.get(
          `/api/rawMaterials/${id}`
        );
        this.stringQuantity = String(rawMaterial.quantity) || '0';
        if (!rawMaterial.Company || !rawMaterial.Company.id) {
          rawMaterial.companyId = '';
        }
        this.formData = rawMaterial;
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
    onConfirmStatus(value) {
      this.showStatusPicker = false;
      this.formData.status = getDictionaryKey('rawMaterial.status', value, '');
    },
    onConfirmUnit(value) {
      this.showUnitPicker = false;
      this.formData.unit = getDictionaryKey('common.weight', value, '');
    },
    cardPickerInput(value) {
      this.formData.companyId = value.id;
      this.formData.Company = value;
    },
    async createSubmit() {
      let params = this.formData;
      try {
        await this.$request.post('/api/rawMaterials/create', params);
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
      let id = this.rawMaterialId;
      let params = this.formData;
      try {
        await this.$request.put(`/api/rawMaterials/update/${id}`, params);
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
.view-rawMaterial-create {
  padding: 1rem;
  font-size: $font-size-base;
  .form-button {
    margin-top: 3rem;
  }
  ::v-deep .card_blank {
    font-size: $font-size-base;
    height: 5rem;
    line-height: 5rem;
  }
  .input-field {
    padding: 1rem 1.5rem;
    ::v-deep .van-field__label {
      width: 4rem;
      font-size: $font-size-base;
    }
    ::v-deep .van-field__control {
      font-size: $font-size-base;
    }
  }
}
</style>
