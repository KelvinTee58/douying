const express = require("express");
const router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");
const rawMaterialWarehouseService = require("../services/rawMaterialWarehousesService");

// 添加记录 (Create)
router.post("/create", async (req, res) => {
  try {
    // const newRecord = await models.rawMaterialWarehouse.create({
    //   warehouseId: req.body.warehouseId,
    //   rawMaterialId: req.body.rawMaterialId,
    //   quantity: req.body.quantity,
    //   unit: req.body.unit,
    //   computeUnit: req.body.computeUnit,
    //   remark: req.body.remark,
    //   isDeleted: false, // 默认未删除
    // });

    // 调用服务层的方法
    const rawMaterialWarehouse = await rawMaterialWarehouseService.getOrCreateRawMaterialWarehouse(
      warehouseId,
      rawMaterialId
    );
    send.success(req, res, { data: rawMaterialWarehouse });
  } catch (error) {
    send.error(req, res, { message: "添加记录时发生错误", detail: error.message });
  }
});

// 获取记录列表 (Read with pagination and filtering)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, warehouseId = "", rawMaterialId = "" } = req.query;
  const offset = (page - 1) * limit;
  const limitNumber = parseInt(limit);

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


    const records = await models.RawMaterialWarehouse.findAndCountAll({
      where: whereConditions,
      limit: limitNumber,
      offset: offset,
      include: [
        {
          model: models.Warehouse,
          // attributes: ["name"], // 可按需调整返回的字段
          where: { isDeleted: false },
          attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
          required: false,
        },
        {
          model: models.RawMaterial,
          where: { isDeleted: false },
          attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
          required: false,
        },
      ],
      attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
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
    send.error(req, res, { message: "获取记录列表时发生错误", detail: error.message });
  }
});

// 获取指定记录 (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const record = await models.RawMaterialWarehouse.findOne({
      where: { id: req.params.id, isDeleted: false },
      include: [
        {
          model: models.Warehouse,
          where: { isDeleted: false },
          attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
          required: false,
        },
        {
          model: models.RawMaterial,
          where: { isDeleted: false },
          attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
          required: false,
        },
      ],
      attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
    });

    if (record) {
      send.success(req, res, { data: record });
    } else {
      send.error(req, res, { message: "记录未找到" });
    }
  } catch (error) {
    send.error(req, res, { message: "获取记录时发生错误", detail: error.message });
  }
});

// 更新记录 (Update)
router.put("/update/:id", async (req, res) => {
  try {
    const recordId = req.params.id;
    const [updatedCount, updatedRows] = await models.RawMaterialWarehouse.update(
      {
        warehouseId: req.body.warehouseId,
        rawMaterialId: req.body.rawMaterialId,
        quantity: req.body.quantity,
        unit: req.body.unit,
        computeUnit: req.body.computeUnit,
        remark: req.body.remark,
      },
      {
        where: { id: recordId, isDeleted: false },
        returning: true, // 返回更新后的记录
      }
    );

    if (updatedCount > 0) {
      send.success(req, res, { data: updatedRows[0] });
    } else {
      send.error(req, res, { message: "未找到指定的记录" });
    }
  } catch (error) {
    send.error(req, res, { message: "更新记录时发生错误", detail: error.message });
  }
});

// 删除记录 (Soft Delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    const recordId = req.params.id;
    const [deletedCount] = await models.RawMaterialWarehouse.update(
      {
        isDeleted: true, // 标记为已删除
        deletedAt: new Date(), // 设置删除时间
      },
      {
        where: { id: recordId, isDeleted: false },
      }
    );

    if (deletedCount > 0) {
      send.success(req, res, { message: "记录已成功删除" });
    } else {
      send.error(req, res, { message: "未找到指定的记录" });
    }
  } catch (error) {
    send.error(req, res, { message: "删除记录时发生错误", detail: error.message });
  }
});

module.exports = router;
