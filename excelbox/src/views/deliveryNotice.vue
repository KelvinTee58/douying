<template>
  <el-form :model="form" label-position="right" label-width="150px" :inline="true">
    <h3>发货信息</h3>
    <!-- 发货仓库 -->
    <el-form-item label="发货仓库">
      <el-autocomplete v-model="form.wName" :fetch-suggestions="(query, cb) => querySuggestions(query, cb, 'warehouses', 'wName')" placeholder="请输入仓库名称" @select="onSelect('wName')" />
    </el-form-item>

    <!-- 联系人 -->
    <el-form-item label="联系人">
      <el-autocomplete v-model="form.wContacts" :fetch-suggestions="(query, cb) => querySuggestions(query, cb, 'warehouses', 'wContacts')" placeholder="请输入联系人" @select="onSelect('wContacts')" />
    </el-form-item>

    <!-- 送货日期 -->
    <el-form-item label="送货日期">
      <el-date-picker v-model="form.deliveryDate" type="date" placeholder="选择送货日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd" />
    </el-form-item>

    <h3>客户信息</h3>
    <!-- 客户公司 -->
    <el-form-item label="客户公司">
      <el-autocomplete v-model="form.cCompany" :fetch-suggestions="(query, cb) => querySuggestions(query, cb, 'customers', 'cCompany')" placeholder="请输入客户公司" @select="onSelect('cCompany')" />
    </el-form-item>

    <!-- 客户联系人 -->
    <el-form-item label="客户联系人">
      <el-autocomplete v-model="form.cContacts" :fetch-suggestions="(query, cb) => querySuggestions(query, cb, 'customers', 'cContacts')" placeholder="请输入客户联系人" @select="onSelect('cContacts')" />
    </el-form-item>

    <!-- 客户地址 -->
    <el-form-item label="客户地址">
      <el-input v-model="form.cAddress" placeholder="客户地址" />
    </el-form-item>

    <h3>商品信息</h3>
    <div>
      <el-button type="primary" @click="addProduct">新增商品</el-button>
    </div>

    <el-form-item class="form-table">
      <el-table :data="form.tradeList" class="form-table" height="320" border>
        <el-table-column label="编号" prop="tNo" width="50" fixed>
          <template slot-scope="scope">
            {{ scope.row.tNo }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="tSpecification" width="180" fixed>
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.tName" placeholder="商品名称" /> -->
            <el-autocomplete v-model="scope.row.tName" :fetch-suggestions="(query, cb) => querySuggestions(query, cb, 'trade', 'tName')" placeholder="商品名称" />
          </template>
        </el-table-column>
        <el-table-column label="生产日期" prop="tDate" width="180">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.tDate" type="date" placeholder="生产日期" style="width: 100%" format="yyyy/MM/dd" value-format="yyyy/MM/dd" />
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="tSpecification" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.tSpecification" placeholder="规格" /> -->
            <el-autocomplete v-model="scope.row.tSpecification" :fetch-suggestions="(query, cb) => querySuggestions(query, cb, 'trade', 'tSpecifications')" placeholder="请输入商品规格" />
          </template>
        </el-table-column>
        <el-table-column label="件数" prop="tPKGS" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.tPKGS" :min="1" :precision="0" :controls="false" placeholder="件数" />
          </template>
        </el-table-column>
        <el-table-column label="数量(KG)" prop="tTotalWeight" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.tTotalWeight" :min="0" :precision="0" :controls="false" placeholder="数量(KG)" />
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="tUnitPrice" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.tUnitPrice" :min="0" :precision="2" :controls="false" placeholder="单价" />
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="tTotalAmount" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.tTotalAmount" :min="0" :precision="2" :controls="false" placeholder="金额" />
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="tRemarks" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.tRemarks" placeholder="备注" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger" @click="removeProduct(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <h3>合计</h3>
    <!-- 客户公司 -->
    <el-form-item label="合计">
      <el-input-number v-model="form.tTotalAmount" :min="0" :precision="2" :controls="false" placeholder="合计" @blur="gettTotalAmountCN" />
    </el-form-item>

    大写：{{ form.tTotalAmountCN }}

    <h3>车辆信息</h3>
    <el-form-item label="承运车牌">
      <el-input v-model="form.carNumberplate" placeholder="承运车牌" />
    </el-form-item>

    <el-form-item label="承运电话">
      <el-input v-model="form.carPhone" placeholder="承运电话" />
    </el-form-item>

    <div class="button-group">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-form>
</template>

<script>
import axios from "axios";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { number2character } from "../utils";

export default {
  data() {
    return {
      form: {
        wName: "",
        wContacts: "",
        cCompany: "",
        cContacts: "",
        cAddress: "",
        deliveryDate: "",
        carNumberplate: "",
        carPhone: "",
        tTotalAmount: "",
        tTotalAmountCN: "",
        tradeList: [
          {
            tNo: 1, // 编号
            tName: "", // 商品名称
            tDate: "", // 生产日期
            tSpecification: "", // 规格
            tPKGS: "", // 件数
            tTotalWeight: "", // 数量(KG)
            tUnitPrice: "", // 单价
            tTotalAmount: "", // 金额
            tRemarks: "", // 备注
          },
        ],
      },
      dataSource: {},
      // dataSource: {
      //   warehouses: [
      //     { wName: "仓库A", wContacts: "联系人A" },
      //     { wName: "仓库B", wContacts: "联系人B" },
      //   ],
      //   customers: [
      //     { cCompany: "客户A", cContacts: "联系人A", cAddress: "地址A" },
      //     { cCompany: "客户B", cContacts: "联系人B", cAddress: "地址B" },
      //   ],
      //   trade: [{ tName: "速冻菠萝丁12", tSpecifications: "10kg/箱" }],
      // },
    };
  },
  created() {
    this.loadJsonData();
  },
  methods: {
    number2character,
    submit() {
      console.log("submit", JSON.stringify(this.form));
      this.openAlert();
    },
    openAlert() {
      this.$confirm("是否生成出库单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.generateExcel(
            this.form
            //   {
            //   wName: "仓库A",
            //   wContacts: "联系人A",
            //   cCompany: "客户B",
            //   cContacts: "联系人B",
            //   cAddress: "地址B",
            //   deliveryDate: "2024/09/02",
            //   carNumberplate: "122",
            //   carPhone: "133999",
            //   tradeList: [
            //     { tNo: 1, tName: "速冻菠萝丁12", tDate: "2024/09/19", tSpecification: "10kg/箱", tPKGS: "1", tTotalWeight: "10", tUnitPrice: "20", tTotalAmount: "20", tRemarks: "全" },
            //     { tNo: 2, tName: "速冻菠萝丁12", tDate: "2024/09/25", tSpecification: "10kg/箱", tPKGS: "2", tTotalWeight: "20", tUnitPrice: "20", tTotalAmount: "40", tRemarks: "全" },
            //     { tNo: 3, tName: "速冻菠萝丁12", tDate: "2024/09/25", tSpecification: "10kg/箱", tPKGS: "2", tTotalWeight: "20", tUnitPrice: "20", tTotalAmount: "40", tRemarks: "全" },
            //     { tNo: 4, tName: "速冻菠萝丁12", tDate: "2024/09/25", tSpecification: "10kg/箱", tPKGS: "2", tTotalWeight: "20", tUnitPrice: "20", tTotalAmount: "40", tRemarks: "全" },
            //     { tNo: 5, tName: "速冻菠萝丁12", tDate: "2024/09/25", tSpecification: "10kg/箱", tPKGS: "2", tTotalWeight: "20", tUnitPrice: "20", tTotalAmount: "40", tRemarks: "全" },
            //     { tNo: 6, tName: "速冻菠萝丁12", tDate: "2024/09/25", tSpecification: "10kg/箱", tPKGS: "2", tTotalWeight: "20", tUnitPrice: "20", tTotalAmount: "40", tRemarks: "全" },
            //   ],
            // }
          );
        })
        .catch(() => {});
    },
    gettTotalAmountCN() {
      this.form.tTotalAmountCN = "￥" + number2character(this.form.tTotalAmount);
    },
    loadJsonData() {
      axios
        .get("/data/deliveryNotice.json") // 注意这里的路径是相对于public目录的
        .then((response) => {
          console.log("response :>> ", response);
          this.dataSource = response.data;
        })
        .catch((error) => {
          console.error("Error loading JSON data:", error);
        });
    },

    copyRowFromSheet1ToSheet2(worksheet1, worksheet2, worksheetRow, worksheet2Row) {
      const sourceRow = worksheet1.getRow(worksheetRow);
      const targetRow = worksheet2.getRow(worksheet2Row);

      // 复制行的高度
      targetRow.height = sourceRow.height;

      // 复制每个单元格的值和样式
      sourceRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const targetCell = targetRow.getCell(colNumber);

        // 复制单元格的值
        targetCell.value = cell.value;

        // 复制单元格的样式
        targetCell.style = { ...cell.style };

        // 复制边框、填充、字体等其他样式
        targetCell.border = cell.border;
        targetCell.fill = cell.fill;
        targetCell.font = cell.font;
        targetCell.alignment = cell.alignment;
      });
      // 处理合并单元格
      const merges = worksheet1._merges || {}; // 确保 _merges 是一个对象
      Object.keys(merges).forEach((key) => {
        const merge = merges[key];
        const [startCol, startRow, noNeed, endCol, endRow] = merge.range;
        // console.log("merge.range :>> ", merge.range, startCol, startRow, noNeed, endCol, endRow, "worksheetRow", worksheetRow, startRow == worksheetRow);

        // 如果源行包含合并单元格
        if (startRow == worksheetRow) {
          // ExcelJS 使用 0 基索引
          const mergeHeight = endRow - startRow;

          console.log("merge.range in :>> ", `${startCol}${worksheet2Row - 1}${noNeed}${endCol}${worksheet2Row - 1 + mergeHeight}`);
          worksheet2.mergeCells(`${startCol}${worksheet2Row}${noNeed}${endCol}${worksheet2Row + mergeHeight}`);
        }
      });
    },
    copyRows(worksheet1, worksheet2, sourceRows, targetRows) {
      for (let i = 0; i < sourceRows.length; i++) {
        this.copyRowFromSheet1ToSheet2(worksheet1, worksheet2, sourceRows[i], targetRows[i]);
      }
    },
    async generateExcel(formData) {
      const url = "/data/deliveryNotice.xlsx"; // Excel模板的位置
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.getWorksheet("head"); // 假设是第一个工作表

      // 填充基本数据
      worksheet.getCell("C2").value = formData.wName;
      worksheet.getCell("F2").value = formData.wContacts;
      worksheet.getCell("I2").value = formData.cCompany;
      worksheet.getCell("C3").value = formData.cContacts;
      worksheet.getCell("F3").value = formData.cAddress;
      worksheet.getCell("I3").value = formData.deliveryDate;

      const initialRowIndex = 5; // 假设商品条目从第9行开始
      const tradeListLength = formData.tradeList.length;

      // 如果tradeList数据超过了预先的4行，则开始从第5行起向下插入
      const rowsNeeded = Math.max(tradeListLength - 4, 0); // 计算需要增加的行数
      // const sourceRow = worksheet.getRow(initialRowIndex);
      for (let i = 0; i < rowsNeeded; i++) {
        // 插入新的行，向下移动空白行
        // worksheet.insertRow(initialRowIndex + 5 + i, initialRowIndex);
        // worksheet.duplicateRow(initialRowIndex + 1, 1, true);
        this.copyRowFromSheet1ToSheet2(worksheet, worksheet, initialRowIndex, initialRowIndex + 4 + i);
      }
      // worksheet.spliceRows(initialRowIndex + 3, 1);
      // worksheet.duplicateRow(initialRowIndex + 4, rowsNeeded, true);

      // 填充 tradeList 数据
      for (let i = 0; i < tradeListLength; i++) {
        const rowIndex = initialRowIndex + i;
        const item = formData.tradeList[i];
        const row = worksheet.getRow(rowIndex);

        // 填入数据
        row.getCell(1).value = item.tNo;
        row.getCell(2).value = item.tName;
        try {
          console.log("rowIndex :>> ", rowIndex);
          console.log("`B${rowIndex}:C${rowIndex}` :>> ", `B${rowIndex}:C${rowIndex}`);
          worksheet.mergeCells(`B${rowIndex}:C${rowIndex}`);
        } catch (error) {
          console.error("error :>> ", rowIndex, error);
        }

        row.getCell(4).value = item.tDate;
        row.getCell(5).value = item.tSpecification;
        row.getCell(6).value = item.tPKGS;
        row.getCell(7).value = item.tTotalWeight;
        row.getCell(8).value = item.tUnitPrice;
        row.getCell(9).value = item.tTotalAmount;
        row.getCell(10).value = item.tRemarks;
        for (let index = 1; index <= 10; index++) {
          row.getCell(index).alignment = { vertical: "middle", horizontal: "center" };
        }
      }
      const worksheet2 = workbook.getWorksheet("bottom"); // 假设是第一个工作表

      worksheet2.getCell(`B1`).value = formData.tTotalAmountCN;
      worksheet2.getCell(`I1`).value = "￥" + formData.tTotalAmount;

      worksheet2.getCell(`C2`).value = formData.carNumberplate;
      worksheet2.getCell(`F2`).value = formData.carPhone;

      let bottomFrom = 5 + (tradeListLength > 4 ? tradeListLength : 4);
      const sourceRows = [1, 2, 3, 4, 5];
      const targetRows = [bottomFrom, bottomFrom + 1, bottomFrom + 2, bottomFrom + 3, bottomFrom + 4];

      this.copyRows(worksheet2, worksheet, sourceRows, targetRows);

      workbook.removeWorksheet("bottom");

      // 导出 Excel 文件
      const bufferOut = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([bufferOut]), "生成的送货单.xlsx");
    },

    addProduct() {
      this.form.tradeList.push({
        tNo: this.form.tradeList.length + 1, // 编号
        tName: "", // 商品名称
        tDate: "", // 生产日期
        tSpecification: "", // 规格
        tPKGS: "", // 件数
        tTotalWeight: "", // 数量(KG)
        tUnitPrice: "", // 单价
        tTotalAmount: "", // 金额
        tRemarks: "", // 备注
      });
    },
    removeProduct(index) {
      this.form.tradeList.splice(index, 1);
      this.resetNo();
    },
    resetNo() {
      for (let index = 0; index < this.form.tradeList.length; index++) {
        this.form.tradeList[index].tNo = index + 1;
      }
    },
    // 自动补全建议
    querySuggestions(queryString, cb, dataType, key) {
      const results = this.dataSource[dataType].filter((item) => item[key].toLowerCase().includes(queryString.toLowerCase()));
      cb(results.map((item) => ({ value: item[key] })));
    },

    // 通用的选择处理方法
    onSelect(field) {
      const { wName, wContacts, cCompany, cContacts, tName } = this.form;

      // 根据仓库或联系人联动
      if (field === "wName" || field === "wContacts") {
        const warehouse = this.dataSource.warehouses.find((w) => w.wName === wName || w.wContacts === wContacts);
        if (warehouse) {
          if (!this.form.wName) this.form.wName = warehouse.wName;
          if (!this.form.wContacts) this.form.wContacts = warehouse.wContacts;
        }
      }

      // 根据客户公司或客户联系人联动
      if (field === "cCompany" || field === "cContacts") {
        const customer = this.dataSource.customers.find((c) => c.cCompany === cCompany || c.cContacts === cContacts);
        if (customer) {
          if (!this.form.cCompany) this.form.cCompany = customer.cCompany;
          if (!this.form.cContacts) this.form.cContacts = customer.cContacts;
          if (!this.form.cAddress) this.form.cAddress = customer.cAddress;
        }
      }

      // 根据商品联动
      if (field === "tName" || field === "tSpecifications") {
        const trade = this.dataSource.trade.find((t) => t.tName === tName || t.tSpecifications === this.form.tSpecifications);
        if (trade) {
          if (!this.form.tName) this.form.tName = trade.tName;
          if (!this.form.tSpecifications) this.form.tSpecifications = trade.tSpecifications;
        }
      }
    },
  },
};
</script>

<style scoped>
.el-form {
  max-width: 90vw;
  margin: 0 auto;
  .form-table {
    max-width: 1200px;
    width: 100%;
  }
}
.button-group {
  margin: 20px auto 100px;
  text-align: center;
}
</style>
