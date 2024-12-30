const express = require("express");
const router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");
const inboundRecordService = require("../services/inboundRecordsService");
let forbiddenExclude = ["isDeleted", "deletedAt", "updatedAt", "createdAt"];
let forbiddenUserExclude = ["beforeQuantity", "beforeUnit", "beforeComputeUnit", "afterQuantity", "afterUnit", "afterComputeUnit"];
// 添加记录 (Create)
router.post("/create", async (req, res) => {
  try {
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

  try {
    // 定义查询条件
    let whereCondition = {}; // 只查询未被删除的记录

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
      where: whereCondition,
      limit: limitNumber,
      offset: offset,
      order,
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
    send.error(req, res, { message: "获取记录时发生错误", data: error });
  }
});


module.exports = router;
