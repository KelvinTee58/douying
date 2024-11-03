<template>
  <div class="view-product-create">
    <van-form @submit="onSubmit">
      <!-- 联系人姓名 -->
      <van-field
        required
        class="input-field"
        v-model="formData.productName"
        name="productName"
        label="名称"
        placeholder="请输入项目名称"
        :rules="[{ required: true, message: '项目名称不能为空' }]"
      />

      <!-- 库存数量 -->
      <van-field
        required
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

      <!-- 单位选择 -->
      <van-field
        required
        class="input-field"
        readonly
        clickable
        name="unit"
        :value="unitValue"
        label="单位"
        placeholder="请输入单位"
        @click="showUnitPicker = true"
        :rules="[{ required: true, message: '数量单位不能为空' }]"
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
        required
        name="specification"
        :value="specificationValue"
        label="规格"
        placeholder="请选择产品规格"
        @click="showSpecificationPicker = true"
        :rules="[{ required: true, message: '产品规格不能为空' }]"
      />
      <van-popup v-model="showSpecificationPicker" position="bottom">
        <van-picker
          value-key="key"
          show-toolbar
          :columns="specificationColumns"
          @confirm="onConfirmSpecification"
          @cancel="showSpecificationPicker = false"
        />
      </van-popup>
      <van-field
        v-show="showSpecificationField"
        required
        class="input-field"
        v-model="formData.specification"
        name="specification"
        label="其他规格"
        placeholder="请输入产品其他规格"
        :rules="[{ required: true, message: '产品其他规格不能为空' }]"
      />

      <cardPicker
        title="公司"
        :value="formData.company"
        @input="cardPickerInput('companyId', $event)"
        card="Companies"
      />

      <cardPicker
        title="原料"
        :value="formData.rawMaterial"
        @input="cardPickerInput('rawMaterialId', $event)"
        card="rawMaterials"
      />

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
  name: 'view-product-create',
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
      specificationColumns: [],
      unitColumns: [],
      showSpecificationPicker: false,
      showSpecificationField: false,
      showUnitPicker: false,
      showQuantityKeyBoard: false,

      formData: {
        productName: '',
        quantity: '',
        unit: '',
        specification: '', // 性别字段
        remark: ''
      },

      stringQuantity: '0',
      specificationValue: '',

      productId: this.$route.query.id // 获取传入的 id
    };
  },
  computed: {
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
    if (this.productId) {
      this.isCreate = false;
      this.getProductIdData(this.productId); // 通过 ID 获取公司数据
    }
    this.specificationColumns = getDictionaryToArray(
      'product.specification',
      'value'
    );
    this.specificationValue = getDictionaryValue(
      'product.specification',
      this.formData.specification,
      '其他'
    );
    this.showSpecificationField =
      this.specificationValue === '其他' ? true : false;

    this.specificationColumns = [...this.specificationColumns, '其他'];
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
    async getProductIdData(productId) {
      let id = productId || '-1';
      try {
        let { data: product } = await this.$request.get(`/api/products/${id}`);
        this.stringQuantity = String(product.quantity) || '0';
        if (!product.company || !product.company.id) {
          product.companyId = '';
        }
        if (!product.rawMaterial || !product.rawMaterial.id) {
          product.rawMaterialId = '';
        }
        this.formData = product;
        console.log('product :>> ', product);
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
    onConfirmSpecification(value) {
      console.log('value :>> ', value);
      this.showSpecificationPicker = false;
      this.showSpecificationField = value === '其他' ? true : false;

      this.specificationValue = value;
      this.formData.specification = getDictionaryKey(
        'product.specification',
        value,
        ''
      );
    },
    onConfirmUnit(value) {
      this.showUnitPicker = false;
      this.formData.unit = getDictionaryKey('common.weight', value, '');
    },
    cardPickerInput(key, value) {
      this.formData[key] = value.id || null;
      if (key == 'companyId') {
        this.formData.company = value || {};
      } else if (key == 'rawMaterialId') {
        this.formData.rawMaterial = value || {};
      }
      // this.formData.companyId = value.id;
      //
    },
    async createSubmit() {
      let params = this.formData;
      try {
        await this.$request.post('/api/products/create', params);
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
      let id = this.productId;
      let params = this.formData;
      try {
        await this.$request.put(`/api/products/update/${id}`, params);
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
.view-product-create {
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
