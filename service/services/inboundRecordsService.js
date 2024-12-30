const models = require("../models");
const rawMaterialWarehousesService = require("./rawMaterialWarehousesService");
const { calculateNewQuantity } = require("../common/common");

const inboundRecordsService = {
  // 禁止的类型，可根据需求添加更多逻辑约束
  forbiddenTypes: [],
  // 创建 inboundRecord
  async createInboundRecord(req) {
    try {
      let { userId, name } = req.user;
      const { rawMaterialWarehouseId, ...rest } = req.body;

      // 获得rawMaterialWarehouse，没有就创建一个
      const rawMaterialWarehouse = await rawMaterialWarehousesService.getOrCreateRawMaterialWarehouse(rawMaterialWarehouseId, req.body);
      let finalRawMaterialWarehouseId = rawMaterialWarehouse.id;

      let newQuantity = rawMaterialWarehouse.quantity
      let rwParams = {
        quantity: rawMaterialWarehouse.quantity,
      };
      let iRParmas = {
        ...rest,
        operator: userId,
        operatorName: name,
        beforeQuantity: rawMaterialWarehouse.quantity,
        beforeUnit: rawMaterialWarehouse.unit,
        beforeComputeUnit: rawMaterialWarehouse.computeUnit,
      }
      let currentRW = {
        quantity: rawMaterialWarehouse.quantity,
        computeUnit: rawMaterialWarehouse.computeUnit,
      }
      let addRW = {
        quantity: rest.quantity,
        computeUnit: rest.computeUnit,
      }
      let type = rest.type;
      if (type === 'IN') {
        // 入库
        newQuantity = calculateNewQuantity(currentRW, addRW, 'add');
        rwParams.quantity = newQuantity;

        iRParmas.afterQuantity = newQuantity;
        iRParmas.afterUnit = rawMaterialWarehouse.unit
        iRParmas.afterComputeUnit = rawMaterialWarehouse.computeUnit
      } else if (type === 'OUT' || type === 'WITHDRAWAL') {
        // 出库，或者回撤（回撤要需要修改库存，但是不计入生产数量）
        newQuantity = calculateNewQuantity(currentRW, addRW, 'subtract');
        rwParams.quantity = newQuantity;

        iRParmas.afterQuantity = newQuantity;
        iRParmas.afterUnit = rawMaterialWarehouse.unit
        iRParmas.afterComputeUnit = rawMaterialWarehouse.computeUnit
      } else if (type === 'COMPLETED') {
        rwParams.quantity = 0;
        // 完成，全部出库
        iRParmas = {
          ...iRParmas,
          quantity: rawMaterialWarehouse.quantity,
          unit: rawMaterialWarehouse.unit,
          computeUnit: rawMaterialWarehouse.computeUnit,
          afterQuantity: 0,
        }
      }
      await models.RawMaterialWarehouse.update(rwParams, {
        where: {
          id: finalRawMaterialWarehouseId,
        },
      });
      let ir = await models.InboundRecord.create({
        ...iRParmas,
        rawMaterialWarehouseId: finalRawMaterialWarehouseId,
      });
      return ir;
    } catch (error) {
      console.log('error :>> ', error);
      if (error.message)
        throw new Error(`创建入库记录失败: ${error.message}`);
      else
        throw new Error(error);
    }
  },
};

module.exports = inboundRecordsService;
