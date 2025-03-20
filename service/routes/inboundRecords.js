const express = require("express");
const router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");
const { calculateNewQuantity } = require("../common/common");

const inboundRecordService = require("../services/inboundRecordsService");
const rawMaterialWarehousesService = require("../services/rawMaterialWarehousesService");
const forbiddenExclude = ["isDeleted", "deletedAt", "updatedAt", "createdAt"];
const forbiddenUserExclude = ["beforeQuantity", "beforeUnit", "beforeComputeUnit", "afterQuantity", "afterUnit", "afterComputeUnit"];

// 添加记录 (Create)
router.post("/create", async (req, res) => {
  try {
    if (req.body.type == 'WITHDRAWAL') {
      send.error(req, res, { message: "添加记录时发生错误", detail: '无法使用该接口进行回撤操作' });
    }
    // 调用服务层的方法
    const rawMaterialWarehouse = await inboundRecordService.createInboundRecord(req);
    send.success(req, res, { data: rawMaterialWarehouse });
  } catch (error) {
    console.log('error :>> ', error);
    send.error(req, res, { message: "添加记录时发生错误", detail: error.message });
  }
});

// 获取记录列表 (Read with pagination and filtering)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, order = [['createdAt', 'DESC']], warehouseId = "", rawMaterialId = "" } = req.query;

  const offset = (page - 1) * limit;
  const limitNumber = parseInt(limit);
  // TODO 用户角色权限控制，只能查询自己的，root查询全部

  try {
    // 定义查询条件
    let whereCondition = { isDeleted: false }; // 只查询未被删除的记录

    if (warehouseId && rawMaterialId) {
      // 同时存在 warehouseId 和 rawMaterialId
      whereCondition = {
        ...whereCondition,
        [Op.and]: [
          { warehouseId: warehouseId },
          { rawMaterialId: rawMaterialId },
        ],
      };
    } else if (warehouseId) {
      // 仅有 warehouseId
      whereCondition = {
        ...whereCondition,
        warehouseId: warehouseId,
      };
    } else if (rawMaterialId) {
      // 仅有 rawMaterialId
      whereCondition = {
        ...whereCondition,
        rawMaterialId: rawMaterialId,
      };
    }


    const records = await models.InboundRecord.findAndCountAll({
      // where: whereCondition,
      limit: limitNumber,
      offset: offset,
      order,
      include: [
        {
          where: whereCondition,
          model: models.RawMaterialWarehouse,
          // attributes: ["name"], // 可按需调整返回的字段
          attributes: { exclude: ["updatedAt", "createdAt"] },
          // required: false,
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

    send.success(req, res, {
      data: records.rows,
      meta: {
        totalItems: records.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(records.count / limitNumber),
      },
    });
  } catch (error) {
    console.log('error :>> ', error);
    send.error(req, res, { message: "获取记录列表时发生错误", detail: error.message });
  }
});

// 获取指定记录 (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const record = await models.InboundRecord.findOne({
      where: { id: req.params.id },
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
      send.success(req, res, { data: record });
    } else {
      send.error(req, res, { message: "记录未找到" });
    }
  } catch (error) {
    send.error(req, res, { message: "查询记录时发生错误", detail: error.message });
  }
});

// 回撤操作
router.post("/revoke", async (req, res) => {
  try {
    if (!req.body.inboundRecordId) {
      send.error(req, res, { message: "查询回撤记录时发生错误", detail: '回撤记录时，必须传入回撤记录id' });
      return;
    }
    req.body.type = 'REVOKE'
    // 调用服务层的方法
    const inboundRecord = await inboundRecordService.createInboundRecord(req);
    send.success(req, res, { data: inboundRecord });
  } catch (error) {
    send.error(req, res, { message: "查询回撤记录时发生错误", detail: error.message });
  }
})

// TODO 获取id库的总入出库
router.get("/:rwid/total", async (req, res) => {
  let total = {
    IN: {
      quantity: 0,
      unit: 'TON',
      computeUnit: 1000,
    },
    OUT: {
      quantity: 0,
      unit: 'TON',
      computeUnit: 1000,
    },
    CURRENT: {
      quantity: 0,
      unit: 'TON',
      computeUnit: 1000,
    },
    
  }
  let hasBasis = { IN: false, OUT: false };
  try {


    let RawMaterialWarehouse = await rawMaterialWarehousesService.getRawMaterialWarehouseById(req.params.rwid);
    if (RawMaterialWarehouse) {
      total.CURRENT.quantity = RawMaterialWarehouse.quantity;
      total.CURRENT.unit = RawMaterialWarehouse.unit;
      total.CURRENT.computeUnit = RawMaterialWarehouse.computeUnit;
    }

    const record = await models.InboundRecord.findAndCountAll({
      where: { rawMaterialWarehouseId: req.params.rwid },
      // include: [
      //   {
      //     model: models.RawMaterialWarehouse,
      //     // attributes: ["name"], // 可按需调整返回的字段
      //     where: { isDeleted: false },
      //     attributes: { exclude: ["updatedAt", "createdAt"] },
      //     required: false,
      //     // include: [
      //     //   {
      //     //     model: models.Warehouse,
      //     //     // attributes: ["name"], // 可按需调整返回的字段
      //     //     where: { isDeleted: false },
      //     //     attributes: { exclude: forbiddenExclude },
      //     //     required: false,
      //     //   },
      //     //   {
      //     //     model: models.RawMaterial,
      //     //     where: { isDeleted: false },
      //     //     attributes: { exclude: forbiddenExclude },
      //     //     required: false,
      //     //   }]
      //   },
      // ],
      attributes: { exclude: ["updatedAt", "createdAt", ...forbiddenUserExclude] },
    });
    for (let index = 0; index < record.rows.length; index++) {
      const item = record.rows[index];
      if (item.type === 'IN') {
        if (!hasBasis.IN) {
          total.IN.unit = item.unit;
          total.IN.computeUnit = item.computeUnit;
        }
        hasBasis.IN = true
        total.IN.quantity = calculateNewQuantity(total.IN, item, 'add')
      } else if (item.type === 'OUT' || item.type === 'COMPLETED') {
        if (!hasBasis.OUT) {
          total.OUT.unit = item.unit;
          total.OUT.computeUnit = item.computeUnit;
        }
        hasBasis.OUT = true
        total.OUT.quantity = calculateNewQuantity(total.OUT, item, 'add')
      } else if (item.type === 'WITHDRAWAL') {
        if (!hasBasis.IN) {
          total.IN.unit = item.unit;
          total.IN.computeUnit = item.computeUnit;
        }
        hasBasis.IN = true
        total.IN.quantity = calculateNewQuantity(total.IN, item, 'subtract')
      } else if (item.type === 'SUPPLEMENT') {
        if (!hasBasis.OUT) {
          total.OUT.unit = item.unit;
          total.OUT.computeUnit = item.computeUnit;
        }
        hasBasis.OUT = true
        total.OUT.quantity = calculateNewQuantity(total.OUT, item, 'subtract')
      }
    }
    send.success(req, res, { data: total });
  } catch (error) {
    send.error(req, res, { message: "查询回撤记录时发生错误", detail: error.message });
  }
});

module.exports = router;
