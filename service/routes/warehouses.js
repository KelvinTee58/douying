var express = require("express");
var router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");

// 添加仓库 (Create)
router.post("/create", async (req, res) => {
  try {
    console.log('req.body :>> ', req.body);
    const newWarehouse = await models.Warehouse.create({
      warehouseName: req.body.warehouseName,
      address: req.body.address,
      detailedAddress: req.body.detailedAddress,
      unit: req.body.unit,
      areaCode: req.body.areaCode, // 添加 areaCode 字段
      capacity: req.body.capacity,
      isDeleted: false, // 默认设置为未删除
    });
    send.success(req, res, {
      data: newWarehouse,
    });
  } catch (error) {
    console.log('error :>> ', error);
    send.error(req, res, {
      message: "添加仓库时发生错误",
      data: error,
    });
  }
});

// 获取所有仓库 (带分页和关键词查询)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, keyword = '' } = req.query;
  const offset = (page - 1) * limit;
  const limitNumber = parseInt(limit);

  try {
    // 定义关键词条件，仅保留 warehouseName
    const keywordCondition = keyword
      ? {
        warehouseName: { [Op.like]: `%${keyword}%` }
      }
      : {};

    // 查询仓库列表并分页
    const warehouses = await models.Warehouse.findAndCountAll({
      where: {
        ...keywordCondition,
        isDeleted: false // 只查询未被删除的记录
      },
      limit: limitNumber,
      offset: offset,
      attributes: {
        exclude: ['isDeleted', 'deletedAt', 'updatedAt', 'createdAt']
      },
    });

    // 返回分页结果，包括总数、当前页和总页数
    return send.success(req, res, {
      data: warehouses.rows,
      meta: {
        totalItems: warehouses.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(warehouses.count / limitNumber)
      }
    });
  } catch (error) {
    console.error("获取仓库列表时发生错误:", error);
    return send.error(req, res, { message: "获取仓库列表时发生错误", data: error });
  }
});

// 获取指定仓库 (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const warehouse = await models.Warehouse.findOne({
      where: {
        id: req.params.id,
        isDeleted: false // 只查询未被删除的仓库
      },
      attributes: {
        exclude: ['isDeleted', 'deletedAt', 'updatedAt', 'createdAt'] // 排除这些字段
      }
    });

    if (warehouse) {
      send.success(req, res, { data: warehouse }); // 使用自定义成功响应
    } else {
      send.error(req, res, { message: "仓库未找到" }); // 使用自定义错误响应
    }
  } catch (error) {
    send.error(req, res, { message: "获取仓库时发生错误", data: error }); // 使用自定义错误响应
  }
});

// 更新仓库信息 (Update)
router.put("/update/:id", async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const updatedWarehouse = await models.Warehouse.update(
      {
        warehouseName: req.body.warehouseName,
        address: req.body.address,
        detailedAddress: req.body.detailedAddress,
        unit: req.body.unit,
        areaCode: req.body.areaCode, // 支持 areaCode 的更新
        capacity: req.body.capacity,
      },
      {
        where: { id: warehouseId },
        returning: true, // 返回更新后的记录
      }
    );
    console.log('updatedWarehouse :>> ', warehouseId, updatedWarehouse);
    if (updatedWarehouse[1]) {
      send.success(req, res, {
        data: updatedWarehouse[1].dataValues, // 更新后的仓库数据
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的仓库记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "更新仓库信息时发生错误",
      data: error,
    });
  }
});

// 删除仓库 (Soft Delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const result = await models.Warehouse.update(
      {
        isDeleted: true, // 标记为已删除
        deletedAt: new Date() // 设置删除时间
      },
      {
        where: { id: warehouseId }
      }
    );

    if (result[0] > 0) {
      send.success(req, res, {
        message: "仓库已成功删除",
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的仓库记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "删除仓库时发生错误",
      data: error,
    });
  }
});

module.exports = router;
