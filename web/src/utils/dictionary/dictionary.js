// dictionary.js

const dictionaries = {
  common: {
    weight: {
      kg: '千克', // 重量单位 - 克
      ton: '吨' // 重量单位 - 克
    }
  },
  rawMaterial: {
    status: {
      in_stock: '在库', // 原料状态 - 在库
      processing: '加工中', // 原料状态 - 加工中
      completed: '已完成' // 原料状态 - 已完成
    }
  },
  employee: {
    gender: {
      M: '男', // 性别 - 男
      F: '女', // 性别 - 女
      O: '其他'
    }
  }
};

export default dictionaries;
