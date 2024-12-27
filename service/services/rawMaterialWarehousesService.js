const models = require("../models");

const rawMaterialWarehousesService = {
  // 禁止的类型，可根据需求添加更多逻辑约束
  forbiddenTypes: [],

  async getRawMaterialWarehouses(data) {
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
      } else if (warehouseId) {
        // 仅有 warehouseId
        whereCondition = {
          ...whereCondition,
          warehouseId: warehouseId,
        };
      } else if (rawMaterialId) {
        // 仅有 rawMaterialId
        whereCondition = {
          ...whereCondition,
          rawMaterialId: rawMaterialId,
        };
      }
      console.log('whereCondition :>> ', whereCondition);


      const record = await models.RawMaterialWarehouses.findOne({
        where: whereCondition,
        limit: limitNumber,
        offset: offset,
        include: [
          {
            model: models.Warehouse,
            // attributes: ["name"], // 可按需调整返回的字段
            where: { isDeleted: false },
            attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
            required: false,
          },
          {
            model: models.RawMaterial,
            where: { isDeleted: false },
            attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
            required: false,
          },
        ],
        attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
      });

      return record ? record : null
    } catch (error) {
      throw new Error(`获取原料仓库失败: ${error.message}`);
    }
  },

  async getRawMaterialWarehousesById(id = '') {
    try {
      const record = await models.RawMaterialWarehouses.findOne({
        where: { id: req.params.id, isDeleted: false },
        include: [
          {
            model: models.Warehouse,
            where: { isDeleted: false },
            attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
            required: false,
          },
          {
            model: models.RawMaterial,
            where: { isDeleted: false },
            attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
            required: false,
          },
        ],
        attributes: { exclude: ["isDeleted", "deletedAt", "updatedAt", "createdAt"] },
      });

      return record ? record : null
    } catch (error) {
      throw new Error(`获取原料仓库失败: ${error.message}`);
    }
  },

  // 根据 warehouseId 和 rawMaterialId 获取或创建 rawMaterialWarehouse
  async getOrCreateRawMaterialWarehouses(rwId, data) {
    let rawMaterialWarehouses = null;
    try {
      if (rwId) {
        // 先尝试根据 id 查找
        rawMaterialWarehouse = this.getRawMaterialWarehousesById(rwId);
      } else {
        // 再 再尝试根据 warehouseId 和 rawMaterialId 查找
        rawMaterialWarehouse = this.getRawMaterialWarehouses(data);
      }
    } catch (error) {
      throw new Error(error);
    }
    try {
      if (rawMaterialWarehouses) {
        return rawMaterialWarehouses;
      }
      let createData = {
        warehouseId: data.warehouseId,
        rawMaterialId: data.rawMaterialId,
        quantity: data.quantity,
        unit: data.unit,
        computeUnit: data.computeUnit,
        isDeleted: false, // 默认未删除
      }
      // 都找不到就要创建
      return await models.RawMaterialWarehouses.create(createData);
    } catch (error) {
      throw new Error(`创建原料仓库失败: ${error.message}`);
    }
  },
};

module.exports = rawMaterialWarehousesService;
