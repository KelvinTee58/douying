// dictionary.js

const dictionaries = {
  common: {
    weight: {
      KG: '千克', // 重量单位 - 克
      TON: '吨' // 重量单位 - 克
    },
    computeWeight: {
      KG: 1, // 重量单位 - 克
      TON: 1000 // 重量单位 - 克
    }
  },
  warehouse: {
    type: {
      P: '产品', // 仓库类型 - 仓库
      R: '原料' // 仓库类型 - 仓储
    }
  },
  rawMaterial: {
    status: {
      in_stock: '在库', // 原料状态 - 在库
      processing: '加工中', // 原料状态 - 加工中
      completed: '已完成' // 原料状态 - 已完成
    }
  },
  product: {
    //规格
    specification: {
      '8X8mm': '8X8mm',
      '10X10mm': '10X10mm',
      '12X12mm': '12X12mm',
      '15X15mm': '12X12mm',
      碎丁: '碎丁',
      块: '块'
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
