// dictionary.js

const dictionaries = {
  rawMaterial: {
    status: {
      in_stock: '在库', // 原料状态 - 在库
      processing: '加工中', // 原料状态 - 加工中
      completed: '已完成' // 原料状态 - 已完成
    }
  },
  // 其他字典可以在这里添加
  exampleStatus: {
    active: '活跃', // 示例状态 - 活跃
    inactive: '非活跃' // 示例状态 - 非活跃
  }
};

export default dictionaries;
