var express = require("express");
var router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");

// 添加公司 (Create)
router.post("/create", async (req, res) => {
  try {
    const newCompany = await models.Company.create({
      companyName: req.body.companyName,
      contactPerson: req.body.contactPerson,
      contactPhone: req.body.contactPhone,
      address: req.body.address,
      detailedAddress: req.body.detailedAddress,
      areaCode: req.body.areaCode // 添加 areaCode 字段
    });
    send.success(req, res, {
      data: newCompany,
    });
  } catch (error) {
    send.error(req, res, {
      message: "添加公司时发生错误",
      data: error,
    });
  }
});

// 获取所有公司 (带分页和关键词查询)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, keyword = '' } = req.query;
  const offset = (page - 1) * limit;
  const limitNumber = parseInt(limit);

  try {
    // 定义关键词条件
    const keywordCondition = keyword
      ? {
        [Op.or]: [
          { companyName: { [Op.like]: `%${keyword}%` } },
          { contactPerson: { [Op.like]: `%${keyword}%` } },
          { contactPhone: { [Op.like]: `%${keyword}%` } }
        ]
      }
      : {};

    // 查询公司列表并分页
    const companies = await models.Company.findAndCountAll({
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
      data: companies.rows,
      meta: {
        totalItems: companies.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(companies.count / limitNumber)
      }
    });
  } catch (error) {
    console.error("获取公司列表时发生错误:", error);
    return send.error(req, res, { message: "获取公司列表时发生错误", data: error });
  }
});

// 获取指定公司 (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const company = await models.Company.findOne({
      where: {
        id: req.params.id,
        isDeleted: false // 只查询未被删除的公司
      },
      attributes: {
        exclude: ['isDeleted', 'deletedAt', 'updatedAt', 'createdAt'] // 排除这些字段
      }
    });

    if (company) {
      send.success(req, res, { data: company }); // 使用自定义成功响应
    } else {
      send.error(req, res, { message: "公司未找到" }); // 使用自定义错误响应
    }
  } catch (error) {
    send.error(req, res, { message: "获取公司时发生错误", data: error }); // 使用自定义错误响应
  }
});

// 更新公司信息 (Update)
router.put("/update/:id", async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedCompany = await models.Company.update(
      {
        companyName: req.body.companyName,
        contactPerson: req.body.contactPerson,
        contactPhone: req.body.contactPhone,
        address: req.body.address,
        detailedAddress: req.body.detailedAddress,
        areaCode: req.body.areaCode // 支持 areaCode 的更新
      },
      {
        where: { id: companyId },
        returning: true, // 返回更新后的记录
      }
    );
    console.log('updatedCompany :>> ', companyId, updatedCompany);
    if (updatedCompany[1]) {
      send.success(req, res, {
        data: updatedCompany[1].dataValues, // 更新后的公司数据
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的公司记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "更新公司信息时发生错误",
      data: error,
    });
  }
});
// 删除公司 (Soft Delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    const companyId = req.params.id;
    const result = await models.Company.update(
      {
        isDeleted: true, // 标记为已删除
        deletedAt: new Date() // 设置删除时间
      },
      {
        where: { id: companyId }
      }
    );

    if (result[0] > 0) {
      send.success(req, res, {
        message: "公司已成功删除",
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的公司记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "删除公司时发生错误",
      data: error,
    });
  }
});

module.exports = router;
