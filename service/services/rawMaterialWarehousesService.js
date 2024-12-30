const models = require("../models");
const { Op } = require("sequelize");

const RawMaterialWarehouseService = {
  // 禁止的类型，可根据需求添加更多逻辑约束
  forbiddenExclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"],
  async getRawMaterialWarehouse(data) {
    const { warehouseId = "", rawMaterialId = "" } = data;
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
      } else {
        throw new Error("获取原料仓库失败: 缺少查询条件");
      }
      const record = await models.RawMaterialWarehouse.findOne({
        where: whereCondition,
        include: [
          {
            model: models.Warehouse,
            // attributes: ["name"], // 可按需调整返回的字段
            where: { isDeleted: false },
            attributes: { exclude: this.forbiddenExclude },
            required: false,
          },
          {
            model: models.RawMaterial,
            where: { isDeleted: false },
            attributes: { exclude: this.forbiddenExclude },
            required: false,
          },
        ],
        attributes: { exclude: this.forbiddenExclude },
      });

      return record ? record : null
    } catch (error) {
      console.log('error :>> ', error);
      throw new Error(`获取原料仓库失败: ${error.message}`);
    }
  },

  async getRawMaterialWarehouseById(id = '') {
    try {
      console.log('id :>> ', id);
      const record = await models.RawMaterialWarehouse.findOne({
        where: { id, isDeleted: false },
        include: [
          {
            model: models.Warehouse,
            where: { isDeleted: false },
            attributes: { exclude: this.forbiddenExclude },
            required: false,
          },
          {
            model: models.RawMaterial,
            where: { isDeleted: false },
            attributes: { exclude: this.forbiddenExclude },
            required: false,
          },
        ],
        attributes: { exclude: this.forbiddenExclude },
      });
      return record ? record : null
    } catch (error) {
      console.log('error :>> ', error);
      throw new Error(`获取原料仓库失败: ${error.message}`);
    }
  },

  // 根据 warehouseId 和 rawMaterialId 获取或创建 rawMaterialWarehouse
  async getOrCreateRawMaterialWarehouse(rwId, data) {
    let RawMaterialWarehouse = null;
    console.log('data :>> ', data);
    try {
      if (rwId) {
        // 先尝试根据 id 查找
        RawMaterialWarehouse = await this.getRawMaterialWarehouseById(rwId);
      } else {
        // 再 再尝试根据 warehouseId 和 rawMaterialId 查找
        RawMaterialWarehouse = await this.getRawMaterialWarehouse(data);
      }
      if (RawMaterialWarehouse) {
        return RawMaterialWarehouse;
      }
      if (data.warehouseId && data.rawMaterialId) {
        let createData = {
          warehouseId: data.warehouseId,
          rawMaterialId: data.rawMaterialId,
          quantity: 0,
          unit: data.unit,
          computeUnit: data.computeUnit,
          isDeleted: false, // 默认未删除
        }
        // 都找不到就要创建
        // return rawMaterialWarehouse;
        return await models.RawMaterialWarehouse.create(createData);
      } else {
        throw new Error("获取原料仓库失败: 缺少创建原料仓库条件");
      }
    } catch (error) {
      console.log('error :>> ', error);
      throw new Error(`创建原料仓库失败: ${error.message}`);
    }
  },
};

module.exports = RawMaterialWarehouseService;
