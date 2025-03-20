const models = require("../models");
const rawMaterialWarehousesService = require("./rawMaterialWarehousesService");
const { calculateNewQuantity, compareQuantities } = require("../common/common");

const forbiddenExclude = ["isDeleted", "deletedAt", "updatedAt", "createdAt"];
const forbiddenUserExclude = ["beforeQuantity", "beforeUnit", "beforeComputeUnit", "afterQuantity", "afterUnit", "afterComputeUnit"];

const inboundRecordsService = {
  // 禁止的类型，可根据需求添加更多逻辑约束
  forbiddenTypes: [],
  async getInboundRecords(id) {
    try {
      const record = await models.InboundRecord.findOne({
        where: { id },
        include: [
          {
            model: models.RawMaterialWarehouse,
            // attributes: ["name"], // 可按需调整返回的字段
            where: { isDeleted: false },
            attributes: { exclude: ["updatedAt", "createdAt"] },
            required: false,
            // include: [
            //   {
            //     model: models.Warehouse,
            //     // attributes: ["name"], // 可按需调整返回的字段
            //     where: { isDeleted: false },
            //     attributes: { exclude: forbiddenExclude },
            //     required: false,
            //   },
            //   {
            //     model: models.RawMaterial,
            //     where: { isDeleted: false },
            //     attributes: { exclude: forbiddenExclude },
            //     required: false,
            //   }]
          },
        ],
        attributes: { exclude: ["updatedAt", "createdAt", ...forbiddenUserExclude] },
      });
      if (record) {
        return record;
      } else {
        throw new Error('记录未找到');
      }
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  },
  // 创建 inboundRecord
  async createInboundRecord(req) {

    try {
      let { userId, name } = req.user;
      let { rawMaterialWarehouseId, inboundRecordId, type, ...rest } = req.body;

      let getInboundRecordsRES;

      if (inboundRecordId && type === 'REVOKE') {
        getInboundRecordsRES = await this.getInboundRecords(inboundRecordId)
        rawMaterialWarehouseId = getInboundRecordsRES.rawMaterialWarehouseId
        rest.productionBatch = getInboundRecordsRES.productionBatch;
      }

      // console.log('getInboundRecordsRES :>> ', getInboundRecordsRES.rawMaterialWarehouseId, rawMaterialWarehouseId);
      // 获得rawMaterialWarehouse，没有就创建一个
      const rawMaterialWarehouse = await rawMaterialWarehousesService.getOrCreateRawMaterialWarehouse(rawMaterialWarehouseId, req.body);
      let finalRawMaterialWarehouseId = rawMaterialWarehouse.id;

      console.log('createInboundRecord 22:>> ');
      let newQuantity = rawMaterialWarehouse.quantity
      let rwParams = {
        quantity: rawMaterialWarehouse.quantity,
      };
      let iRParmas = {
        ...rest,
        type,
        operator: userId,
        operatorName: name,
        beforeQuantity: rawMaterialWarehouse.quantity,
        beforeUnit: rawMaterialWarehouse.unit,
        withdrawalId: rest.withdrawalId || [],
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
      if (type === 'IN') {
        // 入库
        newQuantity = calculateNewQuantity(currentRW, addRW, 'add');
        rwParams.quantity = newQuantity;

        iRParmas.afterQuantity = newQuantity;
        iRParmas.afterUnit = rawMaterialWarehouse.unit
        iRParmas.afterComputeUnit = rawMaterialWarehouse.computeUnit
      }
      else if (type === 'OUT') {
        // 出库
        newQuantity = calculateNewQuantity(currentRW, addRW, 'subtract');
        rwParams.quantity = newQuantity;

        if (newQuantity == 0) {
          iRParmas.type = 'COMPLETED'
        }
        iRParmas.afterQuantity = newQuantity;
        iRParmas.afterUnit = rawMaterialWarehouse.unit
        iRParmas.afterComputeUnit = rawMaterialWarehouse.computeUnit
      } else if (type === 'REVOKE') {
        // 回撤（回撤要需要修改库存，但是不计入生产数量）
        // let getInboundRecordsRES = this.getInboundRecords(inboundRecordId)
        console.log('11 :>> ', getInboundRecordsRES.quantity, getInboundRecordsRES.computeUnit);
        console.log('22 :>> ', rest.quantity, rest.computeUnit);
        console.log('33 :>> ', rawMaterialWarehouse.quantity, rawMaterialWarehouse.computeUnit);
        if (compareQuantities(rest, getInboundRecordsRES) == 1) {
          throw new Error('回撤数量不能大于记录数量');
        }
        if (getInboundRecordsRES.type === 'IN') {
          if (compareQuantities(rest, rawMaterialWarehouse) == 1) {
            throw new Error('回撤数量不能大于库存数量');
          }
          // 按照数量撤回-减去
          newQuantity = calculateNewQuantity(currentRW, addRW, 'subtract');
          rwParams.quantity = newQuantity;

          iRParmas.afterQuantity = newQuantity;
          iRParmas.afterUnit = rawMaterialWarehouse.unit;
          iRParmas.afterComputeUnit = rawMaterialWarehouse.computeUnit
          iRParmas.type = 'WITHDRAWAL'
          iRParmas.remark = '回撤入库：-' + rest.quantity + rawMaterialWarehouse.unit + (rest.remark ? '，' + rest.remark : '')
        } else if (getInboundRecordsRES.type === 'OUT') {
          newQuantity = calculateNewQuantity(currentRW, addRW, 'add');
          rwParams.quantity = newQuantity;

          iRParmas.afterQuantity = newQuantity;
          iRParmas.afterUnit = rawMaterialWarehouse.unit;
          iRParmas.afterComputeUnit = rawMaterialWarehouse.computeUnit;
          iRParmas.type = 'SUPPLEMENT'
          iRParmas.remark = '回撤出库：+' + rest.quantity + rawMaterialWarehouse.unit + (rest.remark ? '，' + rest.remark : '')
        } else {
          throw new Error('该记录无法回撤');
        }

      } else if (type === 'COMPLETED') {
        if (rwParams.quantity == 0 || type === 'COMPLETED') {
          throw new Error('该记录已完成，无法再次完成');
        }
        // 完成，全部出库
        iRParmas = {
          ...iRParmas,
          quantity: rawMaterialWarehouse.quantity,
          unit: rawMaterialWarehouse.unit,
          computeUnit: rawMaterialWarehouse.computeUnit,
          afterQuantity: 0,
          afterUnit: rawMaterialWarehouse.unit,
          afterComputeUnit: rawMaterialWarehouse.computeUnit
        }
        // 完成逻辑
        rwParams.quantity = 0;
      }
      await models.RawMaterialWarehouse.update(rwParams, {
        where: {
          id: finalRawMaterialWarehouseId,
        },
      });
      console.log('Creating InboundRecord with params:', {
        ...iRParmas,
        rawMaterialWarehouseId: finalRawMaterialWarehouseId,
      });
      let ir = await models.InboundRecord.create({
        ...iRParmas,
        rawMaterialWarehouseId: finalRawMaterialWarehouseId,
      });
      // 更新原始记录的 withdrawalId
      if (type === 'REVOKE' && getInboundRecordsRES) {
        await models.InboundRecord.update(
          {
            withdrawalId: [...(getInboundRecordsRES.withdrawalId || []), ir.id]
          },
          {
            where: { id: inboundRecordId }
          }
        );
      }
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
