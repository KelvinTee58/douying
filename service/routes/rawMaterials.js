var express = require("express");
var router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");

// 添加原料 (Create)
router.post("/create", async (req, res) => {
  try {
    const newRawMaterial = await models.RawMaterial.create({
      materialName: req.body.materialName,
      companyId: req.body.companyId,
      quantity: req.body.quantity,
      unit: req.body.unit,
      status: req.body.status,
      remark: req.body.remark,
      isDeleted: false, // 默认设置为未删除
    });
    send.success(req, res, {
      data: newRawMaterial,
    });
  } catch (error) {
    send.error(req, res, {
      message: "添加原料时发生错误",
      data: error,
    });
  }
});

// 获取所有原料 (带分页和关键词查询)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, keyword = '', status } = req.query;
  const offset = (page - 1) * limit;
  const limitNumber = parseInt(limit);

  try {
    // 定义关键词条件
    const keywordCondition = keyword
      ? { materialName: { [Op.like]: `%${keyword}%` } }
      : {};

    // 定义状态筛选条件
    const statusCondition = status
      ? { status: status }
      : {};

    // 查询原料列表并分页
    const rawMaterials = await models.RawMaterial.findAndCountAll({
      where: {
        ...keywordCondition,
        ...statusCondition,
        isDeleted: false // 只查询未被删除的记录
        // 不需要 isDeleted 字段的过滤
      },
      limit: limitNumber,
      offset: offset,
      include: [{
        model: models.Company,
        where: { isDeleted: false },
        attributes: {
          exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"],
        },
        required: false // 如果信息不存在，不影响查询结果
      }],
      attributes: {
        exclude: ['isDeleted', 'deletedAt', 'updatedAt', 'createdAt'] // 按需排除字段
      },
    });

    // 返回分页结果，包括总数、当前页和总页数
    return send.success(req, res, {
      data: rawMaterials.rows,
      meta: {
        totalItems: rawMaterials.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(rawMaterials.count / limitNumber)
      }
    });
  } catch (error) {
    console.error("获取原料列表时发生错误:", error);
    return send.error(req, res, { message: "获取原料列表时发生错误", data: error });
  }
});

// 获取指定原料 (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const rawMaterial = await models.RawMaterial.findOne({
      where: {
        id: req.params.id,
        isDeleted: false // 只查询未被删除的记录
      },
      include: [{
        model: models.Company,
        where: {
          isDeleted: false // 仅包含未删除的公司
        },
        attributes: {
          exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"],
        },
        required: false // 如果公司信息不存在，不影响查询结果
      }],
      attributes: {
        exclude: ['isDeleted', "deletedAt", "updatedAt", "createdAt"],
      }
    });

    if (rawMaterial) {
      send.success(req, res, { data: rawMaterial });
    } else {
      send.error(req, res, { message: "原料未找到" });
    }
  } catch (error) {
    send.error(req, res, { message: "获取原料时发生错误", data: error });
  }
});

// 更新原料信息 (Update)
router.put("/update/:id", async (req, res) => {
  try {
    const rawMaterialId = req.params.id;
    const updatedRawMaterial = await models.RawMaterial.update(
      {
        materialName: req.body.materialName,
        companyId: req.body.companyId,
        quantity: req.body.quantity,
        unit: req.body.unit,
        status: req.body.status,
        remark: req.body.remark,
      },
      {
        where: { id: rawMaterialId },
        returning: true, // 返回更新后的记录
      }
    );

    if (updatedRawMaterial[1]) {
      send.success(req, res, {
        data: updatedRawMaterial[1].dataValues,
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的原料记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "更新原料信息时发生错误",
      data: error,
    });
  }
});

// 删除原料 (Soft Delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    const rawMaterialId = req.params.id;
    const result = await models.RawMaterial.update(
      {
        isDeleted: true, // 标记为已删除
        deletedAt: new Date() // 设置删除时间
      },
      {
        where: { id: rawMaterialId }
      }
    );

    if (result[0] > 0) {
      send.success(req, res, {
        message: "原料已成功删除",
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的原料记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "删除原料时发生错误",
      data: error,
    });
  }
});


module.exports = router;
