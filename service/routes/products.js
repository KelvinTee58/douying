var express = require("express");
var router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");

// 添加产品 (Create)
router.post("/create", async (req, res) => {
  try {
    const newProduct = await models.Product.create({
      productName: req.body.productName,
      specification: req.body.specification,
      companyId: req.body.companyId,
      rawMaterialId: req.body.rawMaterialId,
      quantity: req.body.quantity,
      unit: req.body.unit,
      remark: req.body.remark,
      isDeleted: false, // 默认设置为未删除
    });
    send.success(req, res, {
      data: newProduct,
    });
  } catch (error) {
    send.error(req, res, {
      message: "添加产品时发生错误",
      data: error,
    });
  }
});

// 获取所有产品 (带分页、关键词查询和规格筛选)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, keyword = '' } = req.query;
  const offset = (page - 1) * limit;
  const limitNumber = parseInt(limit);

  try {
    // 定义关键词查询条件
    const keywordCondition = keyword
      ? {
        [Op.or]: [
          { productName: { [Op.like]: `%${keyword}%` } },
          { specification: { [Op.like]: `%${keyword}%` } }
        ]
      }
      : {};


    // 查询产品列表并分页
    const products = await models.Product.findAndCountAll({
      where: {
        ...keywordCondition,
        isDeleted: false // 只查询未被删除的记录
      },
      limit: limitNumber,
      offset: offset,
      include: [
        {
          model: models.Company,
          as: "company", // 使用别名
          where: { isDeleted: false },
          attributes: {
            exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"],
          },
          required: false // 如果信息不存在，不影响查询结果
        },
        {
          model: models.RawMaterial,
          as: "rawMaterial", // 使用别名
          // where: { isDeleted: false },
          attributes: {
            exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"],
          },
          required: false // 如果信息不存在，不影响查询结果
        },
      ],
      attributes: {
        exclude: ['isDeleted', "deletedAt", "updatedAt", "createdAt"],
      },
    });

    return send.success(req, res, {
      data: products.rows,
      meta: {
        totalItems: products.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(products.count / limitNumber),
      },
    });
  } catch (error) {
    console.error("获取产品列表时发生错误:", error);
    return send.error(req, res, {
      message: "获取产品列表时发生错误",
      data: error,
    });
  }
});

// 获取指定产品 (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const product = await models.Product.findOne({
      where: {
        id: req.params.id,
        isDeleted: false // 只查询未被删除的记录
      },
      include: [
        {
          model: models.Company,
          as: "company", // 使用别名
          where: { isDeleted: false },
          attributes: {
            exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"],
          },
          required: false // 如果信息不存在，不影响查询结果
        },
        {
          model: models.RawMaterial,
          as: "rawMaterial", // 使用别名
          // where: { isDeleted: false },
          attributes: {
            exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"],
          },
          required: false // 如果信息不存在，不影响查询结果
        },
      ],
      attributes: {
        exclude: ['isDeleted', "deletedAt", "updatedAt", "createdAt"],
      },
    });

    if (product) {
      send.success(req, res, { data: product });
    } else {
      send.error(req, res, { message: "产品未找到" });
    }
  } catch (error) {
    send.error(req, res, {
      message: "获取产品时发生错误",
      data: error,
    });
  }
});

// 更新产品信息 (Update)
router.put("/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProducts = await models.Product.update(
      {
        productName: req.body.productName,
        specification: req.body.specification,
        companyId: req.body.companyId,
        rawMaterialId: req.body.rawMaterialId,
        quantity: req.body.quantity,
        unit: req.body.unit,
        remark: req.body.remark,
      },
      {
        where: { id: productId },
        returning: true,
        plain: true
      }
    );
    if (updatedProducts[1]) {
      send.success(req, res, {
        data: updatedProducts[1].dataValues,
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的产品记录",
      });
    }
  } catch (error) {
    console.log('error :>> ', error);
    send.error(req, res, {
      message: "更新产品信息时发生错误",
      data: error,
    });
  }
});

// 删除产品 (Soft Delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await models.Product.update(
      {
        isDeleted: true, // 标记为已删除
        deletedAt: new Date() // 设置删除时间
      },
      {
        where: { id: productId }
      }
    );

    if (result[0] > 0) {
      send.success(req, res, {
        message: "产品已成功删除",
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的产品记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "删除产品时发生错误",
      data: error,
    });
  }
});

module.exports = router;
