const models = require("../models");

const producingService = {
  // 禁止的状态类型
  forbiddenTypes: ['CLOSE', 'DELETE', 'O'],

  // 更新生产记录的状态
  async updateProducingStatus(producingId, updateData) {
    try {
      const producing = await models.Producing.findOne({
        where: { id: producingId },
      });

      if (!producing) {
        throw new Error("未找到指定的生产记录");
      }

      if (this.forbiddenTypes.includes(producing.type)) {
        throw new Error(`无法更新此记录，因为当前记录的状态为 ${producing.type}`);
      }

      if (producing.type === "COMPLETED" && updateData.type !== "RESTART") {
        throw new Error("无法更新已完成的记录");
      }

      if (updateData.type === "COMPLETED") {
        updateData.completionTime = new Date();
      }

      return await producing.update(updateData);
    } catch (error) {
      throw new Error(`更新生产记录状态失败: ${error.message}`);
    }
  },
};

module.exports = producingService;
