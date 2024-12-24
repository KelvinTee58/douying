const models = require("../models");
// const send = require("../common/send");

const forbiddenTypes = ['CLOSE', 'DELETE', 'O'];

// 更新状态的服务函数
async function updateProducingStatus(producingId, updateData) {
  try {
    // 查找生产记录
    const producing = await models.Producing.findOne({
      where: { id: producingId },
    });

    if (!producing) {
      throw new Error("未找到指定的生产记录");
    }

    // 检查 type 是否为禁用状态
    if (forbiddenTypes.includes(producing.type)) {
      throw new Error(`无法更新此记录，因为当前记录的状态为 ${producing.type}`);
    }
    // 完成的如果不是重启也不能过
    if (producing.type == 'COMPLETED' && updateData.type !== 'RESTART') {
      throw new Error("无法更新已完成的记录");
    }

    // 如果 type 更新为 'COMPLETED'，设置完成时间
    if (updateData.type === 'COMPLETED') {
      updateData.completionTime = new Date(); // 设置完成时间为当前时间
    }

    // 更新生产记录
    const updatedProducing = await producing.update(updateData);

    return updatedProducing;  // 返回更新后的记录
  } catch (error) {
    throw new Error(error.message); // 抛出错误信息
  }
}

module.exports = {
  updateProducingStatus,
};
