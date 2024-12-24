var express = require("express");
var router = express.Router();
const models = require("../models");
const send = require("../common/send");
const { Op } = require("sequelize");
const common = require("../common/common");
const { updateProducingStatus } = require("../services/producingService");
const { DateTime } = require('luxon');

// 创建生产记录 (Create)
router.post("/create", async (req, res) => {
  let { userId, name } = req.user;

  // 获取当前时区时间，统一使用 +8 时区
  const currentTime = DateTime.now().setZone('Asia/Shanghai'); // 使用 +8 时区（上海时区）
  const dateString = currentTime.toISODate().replace(/-/g, ''); // 获取当前日期并转换为 YYYYMMDD 格式

  try {
    // 查找当天（createdAt）的最大 batchSequence
    const latestProducing = await models.Producing.findOne({
      where: {
        createdAt: {
          [Op.gte]: currentTime.startOf('day').toJSDate(), // 当前日期 00:00:00
          [Op.lt]: currentTime.endOf('day').toJSDate(), // 当前日期 23:59:59
        }
      },
      order: [['batchSequence', 'DESC']], // 按 batchSequence 降序排列，取最大值
      attributes: ['batchSequence'], // 只取 batchSequence 字段
    });

    // 计算 batchSequence，若当天没有记录则为 1
    const batchSequence = latestProducing ? latestProducing.batchSequence + 1 : 1;

    // 创建新的生产记录
    const newProducing = await models.Producing.create({
      productionBatch: await common.generateBatchNumber(dateString, batchSequence), // 生成批次编号
      batchSequence: batchSequence,
      type: 'PREPARING',
      operator: userId,
      operatorName: name,
    });

    send.success(req, res, {
      data: newProducing,
    });
  } catch (error) {
    console.error("创建生产记录时发生错误:", error);
    send.error(req, res, {
      message: "创建生产记录时发生错误",
      data: error,
    });
  }
});

// 获取所有生产记录 (带分页、关键词查询和状态筛选)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, keyword = '', type = '' } = req.query;
  const offset = (page - 1) * limit;
  const limitNumber = parseInt(limit);

  try {
    // 定义关键词查询条件
    const keywordCondition = keyword
      ? {
        [Op.or]: [
          { productionBatch: { [Op.like]: `%${keyword}%` } },
          { operatorName: { [Op.like]: `%${keyword}%` } }
        ]
      }
      : {};

    // const typeCondition = type ? { type: type } : {};
    // 定义类型条件，排除 'DELETE' 类型
    const typeCondition = type && type !== 'DELETE'
      ? { type: type } // 如果传入的 `type` 不是 'DELETE'，则按照传入的 `type` 过滤
      : { type: { [Op.ne]: 'DELETE' } }; // 如果没有传入 `type` 或 `type` 为 'DELETE'，则排除 'DELETE'

    // 查询生产记录列表并分页
    const producingList = await models.Producing.findAndCountAll({
      where: {
        ...keywordCondition,
        ...typeCondition,
      },
      limit: limitNumber,
      offset: offset,
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    return send.success(req, res, {
      data: producingList.rows,
      meta: {
        totalItems: producingList.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(producingList.count / limitNumber),
      },
    });
  } catch (error) {
    console.error("获取生产记录时发生错误:", error);
    return send.error(req, res, {
      message: "获取生产记录时发生错误",
      data: error,
    });
  }
});

// 获取指定生产记录 (Read by ID)
router.get("/:id", async (req, res) => {
  const producingId = req.params.id;
  // console.log('producingId :>> ', producingId);
  try {
    const producing = await models.Producing.findOne({
      where: {
        [Op.or]: [
          { id: producingId }, // 根据 ID 查询
          { productionBatch: producingId } // 根据 productionBatch 查询
        ],
        type: { [Op.ne]: 'DELETE' }  // 排除 type 为 'DELETE' 的记录
      },
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    if (producing) {
      send.success(req, res, { data: producing });
    } else {
      send.error(req, res, { message: "生产记录未找到" });
    }
  } catch (error) {
    send.error(req, res, {
      message: "获取生产记录时发生错误",
      data: error,
    });
  }
});

// 更新生产记录信息 (Update)
router.put("/update/:id", async (req, res) => {
  try {
    let { userId, name } = req.user;
    const producingId = req.params.id;
    // 获取更新数据
    const updateData = {
      type: req.body.type,
      operator: userId,
      operatorName: name,
      remarks: req.body.remarks,
    };
    // 调用服务函数更新生产记录
    const updatedProducing = await updateProducingStatus(producingId, updateData);
    // 返回成功响应
    send.success(req, res, {
      data: updatedProducing,
    });
  } catch (error) {
    console.log('error :>> ', error);
    send.error(req, res, {
      message: "更新生产记录时发生错误",
      data: error,
    });
  }
});

// 删除生产记录 (Soft Delete, 设置type为DELETE)
router.delete("/delete/:id", async (req, res) => {
  try {
    const producingId = req.params.id;

    // 查找生产记录
    const producing = await models.Producing.findOne({
      where: { id: producingId },
    });

    if (!producing) {
      return send.error(req, res, {
        message: "未找到指定的生产记录",
      });
    }

    // 更新type为DELETE，标记为删除
    producing.type = 'DELETE';  // 将type设置为DELETE
    producing.deletedAt = new Date();  // 设置删除时间
    await producing.save();  // 保存更新

    send.success(req, res, {
      message: "生产记录已成功删除",
    });
  } catch (error) {
    console.error("删除生产记录时发生错误:", error);
    send.error(req, res, {
      message: "删除生产记录时发生错误",
      data: error,
    });
  }
});

// // 删除生产记录 (Soft Delete)
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const producingId = req.params.id;
//     const result = await models.Producing.update(
//       {
//         isDeleted: true, // 标记为已删除
//         deletedAt: new Date(), // 设置删除时间
//       },
//       {
//         where: { id: producingId },
//       }
//     );

//     if (result[0] > 0) {
//       send.success(req, res, {
//         message: "生产记录已成功删除",
//       });
//     } else {
//       send.error(req, res, {
//         message: "未找到指定的生产记录",
//       });
//     }
//   } catch (error) {
//     send.error(req, res, {
//       message: "删除生产记录时发生错误",
//       data: error,
//     });
//   }
// });

module.exports = router;
