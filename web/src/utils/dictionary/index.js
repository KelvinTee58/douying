import dictionaries from './dictionary';

/**
 * 查询字典
 * @param {string} path - 字典路径
 * @param {string} field - 查询字段
 * @param {string} defaultValue - 默认值 (可选)
 * @returns {string} - 查询结果或默认值
 */
export const getDictionaryValue = (path, field, defaultValue = '') => {
  const keys = path.split('.');
  let result = dictionaries;

  for (const key of keys) {
    if (result[key]) {
      result = result[key];
    } else {
      return defaultValue; // 如果路径无效，则返回默认值
    }
  }

  return result[field] || defaultValue; // 返回指定字段的值或默认值
};

/**
 * 获取字典的所有键或值并返回数组
 * @param {string} path - 字典路径
 * @param {string} type - 'key' 或 'value' (默认为 'key')
 * @returns {Array<string>} - 字典的所有键或值
 */
export const getDictionaryToArray = (path, type = 'key') => {
  const keys = path.split('.');
  let result = dictionaries;

  for (const key of keys) {
    if (result[key]) {
      result = result[key];
    } else {
      return []; // 如果路径无效，则返回空数组
    }
  }

  return type === 'value' ? Object.values(result) : Object.keys(result); // 根据类型返回值或键
};

/**
 * 根据值查询字典键
 * @param {string} path - 字典路径
 * @param {string} value - 要查找的值
 * @returns {string|null} - 如果找到，返回对应的键，否则返回 null
 */
export const getDictionaryKey = (path, value) => {
  const keys = path.split('.');
  let result = dictionaries;

  for (const key of keys) {
    if (result[key]) {
      result = result[key];
    } else {
      return null; // 如果路径无效，则返回 null
    }
  }

  // 查找对应值的键，找到第一个就返回
  for (const key in result) {
    if (result[key] === value) {
      return key; // 找到第一个匹配的键并返回
    }
  }

  return null; // 如果未找到，返回 null
};

// 使用示例
// const keys = getDictionaryToArray('rawMaterial.status'); // 返回 ['in_stock', 'processing', 'completed']
// const values = getDictionaryToArray('rawMaterial.status', 'value'); // 返回 ['在库', '加工中', '已完成']
// const key = getDictionaryKey('rawMaterial.status', '在库'); // 返回 'in_stock'
