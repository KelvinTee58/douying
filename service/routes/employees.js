var express = require("express");
var router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");

// 添加员工 (Create)
router.post("/create", async (req, res) => {
  try {
    // 检查员工号是否已存在
    const existingEmployee = await models.Employee.findOne({
      where: { employeeNumber: req.body.employeeNumber }
    });

    if (existingEmployee) {
      return send.error(req, res, {
        message: "员工号已存在，请使用其他员工号",
      });
    }

    const newEmployee = await models.Employee.create({
      employeeNumber: req.body.employeeNumber,
      name: req.body.name,
      gender: req.body.gender || 'O', // 默认值为 'O'
      phone: req.body.phone,
    });

    send.success(req, res, {
      data: newEmployee,
    });
  } catch (error) {
    send.error(req, res, {
      message: "添加员工时发生错误",
      data: error,
    });
  }
});

// 获取所有员工 (带分页和关键词查询)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, keyword = '' } = req.query;
  const offset = (page - 1) * limit;
  const limitNumber = parseInt(limit);

  try {
    // 定义关键词条件
    const keywordCondition = keyword
      ? {
        [Op.or]: [
          { employeeNumber: { [Op.like]: `%${keyword}%` } },
          { name: { [Op.like]: `%${keyword}%` } }
        ]
      }
      : {};

    // 查询员工列表并分页
    const employees = await models.Employee.findAndCountAll({
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
      data: employees.rows,
      meta: {
        totalItems: employees.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(employees.count / limitNumber)
      }
    });
  } catch (error) {
    console.error("获取员工列表时发生错误:", error);
    return send.error(req, res, { message: "获取员工列表时发生错误", data: error });
  }
});

// 获取指定员工 (Read by ID)
router.get("/:id", async (req, res) => {
  try {
    const employee = await models.Employee.findOne({
      where: {
        id: req.params.id,
        isDeleted: false // 只查询未被删除的员工
      },
      attributes: {
        exclude: ['isDeleted', 'deletedAt', 'updatedAt', 'createdAt'] // 排除这些字段
      }
    });

    if (employee) {
      send.success(req, res, { data: employee }); // 使用自定义成功响应
    } else {
      send.error(req, res, { message: "员工未找到" }); // 使用自定义错误响应
    }
  } catch (error) {
    send.error(req, res, { message: "获取员工时发生错误", data: error }); // 使用自定义错误响应
  }
});

// 更新员工信息 (Update)
router.put("/update/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedEmployee = await models.Employee.update(
      {
        employeeNumber: req.body.employeeNumber,
        name: req.body.name,
        gender: req.body.gender || 'O', // 默认值为 'O'
        phone: req.body.phone,
      },
      {
        where: { id: employeeId },
        returning: true, // 返回更新后的记录
        plain: true
      }
    );

    if (updatedEmployee[1]) {
      send.success(req, res, {
        data: updatedEmployee[1].dataValues, // 更新后的员工数据
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的员工记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "更新员工信息时发生错误",
      data: error,
    });
  }
});

// 删除员工 (Soft Delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const result = await models.Employee.update(
      {
        isDeleted: true, // 标记为已删除
        deletedAt: new Date() // 设置删除时间
      },
      {
        where: { id: employeeId }
      }
    );

    if (result[0] > 0) {
      send.success(req, res, {
        message: "员工已成功删除",
      });
    } else {
      send.error(req, res, {
        message: "未找到指定的员工记录",
      });
    }
  } catch (error) {
    send.error(req, res, {
      message: "删除员工时发生错误",
      data: error,
    });
  }
});

module.exports = router;
