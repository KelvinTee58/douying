const models = require("../models");
const rawMaterialWarehousesService = require("./rawMaterialWarehousesService");

const inboundRecordsService = {
  // 禁止的类型，可根据需求添加更多逻辑约束
  forbiddenTypes: [],
  // 创建 inboundRecord
  async createInboundRecord(data) {
    try {
      const { rawMaterialWarehouseId, warehouseId, rawMaterialId, ...rest } = data;

      const rawMaterialWarehouse = await rawMaterialWarehousesService.getOrCreateRawMaterialWarehouses(rawMaterialId, data);
      let finalRawMaterialWarehouseId = rawMaterialWarehouse.id;

      if (!finalRawMaterialWarehouseId) {
        throw new Error("缺少 rawMaterialWarehouseId 或 warehouseId 和 rawMaterialId");
      }

      return await models.InboundRecords.create({
        rawMaterialWarehouseId: finalRawMaterialWarehouseId,
        ...rest,
      });
    } catch (error) {
      if (error.message)
        throw new Error(`创建入库记录失败: ${error.message}`);
      else
        throw new Error(error);
    }
  },
};

module.exports = inboundRecordsService;
