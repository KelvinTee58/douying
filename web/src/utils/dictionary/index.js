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

/**
 * 转换字典对象为数组格式
 * @param {string} path - 字典路径
 * @param {string} labelKey - 指定 label 的字段名 (默认: 'label')
 * @param {string} valueKey - 指定 value 的字段名 (默认: 'value')
 * @returns {Array<Object>} - 转换后的数组，包含 label 和 value 键
 */
export const transformDictionary = (
  path,
  labelKey = 'label',
  valueKey = 'value'
) => {
  const keys = path.split('.');
  let result = dictionaries;

  for (const key of keys) {
    if (result[key]) {
      result = result[key];
    } else {
      return []; // 如果路径无效，则返回空数组
    }
  }

  // 将字典转换成指定格式的数组
  return Object.keys(result).map((key) => ({
    [labelKey]: result[key],
    [valueKey]: key
  }));
};

// 使用 getDictionaryValue 示例
// const statusValue = getDictionaryValue('rawMaterial.status', 'in_stock', '未知状态');
// 输出: '在库'

// 使用 getDictionaryToArray 示例
// const statusKeys = getDictionaryToArray('rawMaterial.status');
// 输出: ['in_stock', 'processing', 'completed']

// const statusValues = getDictionaryToArray('rawMaterial.status', 'value');
// 输出: ['在库', '加工中', '已完成']

// 使用 getDictionaryKey 示例
// const statusKey = getDictionaryKey('rawMaterial.status', '在库');
// 输出: 'in_stock'

// 使用 transformDictionary 示例
// const transformedStatus = transformDictionary('rawMaterial.status', 'label', 'code');
// 输出: [{ label: '在库', code: 'in_stock' }, { label: '加工中', code: 'processing' }, { label: '已完成', code: 'completed' }]
