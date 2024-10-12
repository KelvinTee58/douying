var express = require("express");
var router = express.Router();
const models = require("../models");
const send = require("../common/send");

// 添加公司 (Create)
router.post("/", async (req, res) => {
  try {
    const newCompany = await models.Company.create({
      companyName: req.body.companyName,
      contactPerson: req.body.contactPerson,
      contactPhone: req.body.contactPhone,
      address: req.body.address,
      detailedAddress: req.body.detailedAddress,
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

// 获取所有公司 (Read)
router.get("/", async (req, res) => {
  try {
    const companies = await models.Company.findAll();
    send.success(req, res, { data: companies }); // 使用自定义成功响应
  } catch (error) {
    send.error(req, res, { message: "获取公司列表时发生错误", data: error }); // 使用自定义错误响应
  }
});

// 获取指定公司 (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const company = await models.Company.findByPk(req.params.id);
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
router.put("/:id", async (req, res) => {
  try {
    const company = await models.Company.findByPk(req.params.id);
    if (company) {
      await company.update({
        companyName: req.body.companyName,
        contactPerson: req.body.contactPerson,
        contactPhone: req.body.contactPhone,
        address: req.body.address,
        detailedAddress: req.body.detailedAddress,
      });
      send.success(req, res, { data: company }); // 使用自定义成功响应
    } else {
      send.error(req, res, { message: "公司未找到" }); // 使用自定义错误响应
    }
  } catch (error) {
    send.error(req, res, { message: "更新公司信息时发生错误", data: error }); // 使用自定义错误响应
  }
});

// 删除公司 (Delete)
router.delete("/:id", async (req, res) => {
  try {
    const company = await models.Company.findByPk(req.params.id);
    if (company) {
      await company.destroy();
      send.success(req, res, { message: "公司删除成功" }); // 使用自定义成功响应
    } else {
      send.error(req, res, { message: "公司未找到" }); // 使用自定义错误响应
    }
  } catch (error) {
    send.error(req, res, { message: "删除公司时发生错误", data: error }); // 使用自定义错误响应
  }
});

module.exports = router;
