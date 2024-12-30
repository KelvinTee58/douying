/**
 * 将 "2h", "7d" 类似格式转换为时间戳
 * @param {string} timeString 例如 "2h", "7d", "10m", "1w"
 * @returns {number} 返回过期的时间戳 (以毫秒为单位)
 */
exports.parseExpireTime = (timeString) => {
  const timeUnitMap = {
    s: 1000,                   // 秒
    m: 1000 * 60,              // 分钟
    h: 1000 * 60 * 60,         // 小时
    d: 1000 * 60 * 60 * 24,    // 天
    w: 1000 * 60 * 60 * 24 * 7 // 周
  };

  // 匹配数字和单位部分 (例如 "2h" => ["2", "h"])
  const regex = /^(\d+)([smhdw])$/;
  const match = timeString.match(regex);

  if (!match) {
    throw new Error('Invalid time format');
  }

  const value = parseInt(match[1], 10); // 数字部分 (例如 2)
  const unit = match[2];                // 单位部分 (例如 'h')

  // 获取对应的毫秒数
  const timeInMilliseconds = value * timeUnitMap[unit];

  // 获取当前时间的毫秒级时间戳
  const currentTime = Date.now();

  // 计算到期时间戳（毫秒级）
  const expireAt = currentTime + timeInMilliseconds;

  return expireAt; // 返回到期的毫秒级时间戳
}

/**
 * 去除浮动类型的尾随零
 * @param {number} value - 需要格式化的数值
 * @returns {number} - 格式化后的数值
 */
exports.formatDecimal = (value) => {
  return parseFloat(value); // 去掉尾随的零
}

/**
 * 格式化字符串，限制最大长度
 * @param {string} value - 需要格式化的字符串
 * @param {number} length - 最大长度
 * @returns {string} - 格式化后的字符串
 */
exports.formatString = (value, length = 100) => {
  if (typeof value !== 'string') return '';
  return value.length > length ? value.slice(0, length) : value; // 限制最大长度
}

/**
 * 格式化数字字段，保留两位小数
 * @param {number} value - 需要格式化的数值
 * @returns {string} - 格式化后的数值
 */
exports.formatNumber = (value, decimal = 2) => {
  return value.toFixed(decimal); // 保留两位小数
}



const crypto = require('crypto');
/**
 * 生成唯一批次号，避免重复，并保证可逆
 * @param {string} dateString - 日期部分（格式为 "YYYYMMDD"）
 * @param {string} sequence - 批次号部分（例如 "1"）
 * @returns {Promise<string>} 生成的批次号
 */
exports.generateBatchNumber = async (dateString, sequence) => {
  const { default: base32Encode } = await import('base32-encode');

  // 生成4字节的随机数部分，以增强唯一性
  const randomPart = crypto.randomBytes(1).toString('hex');

  // 拼接日期 + 批次号 + 随机数
  const data = `${dateString}-${sequence}-${randomPart}`;

  console.log('data :>> ', data);

  // 将拼接后的数据进行Base32编码并转换为大写
  const buffer = Buffer.from(data, 'utf-8');
  const encoded = base32Encode(buffer, 'Crockford').toUpperCase();
  console.log('encoded :>> ', encoded);

  // 去除Base32中的等号（=）
  return encoded.replace(/=/g, '');
};

/**
 * 解码批次号，获取原始的日期和批次号
 * @param {string} batchNumber - 生成的批次号
 * @returns {Promise<object|null>} 返回解码后的数据 { date, sequence } 或错误信息
 */
exports.decodeBatchNumber = async (batchNumber) => {
  try {
    const { default: base32Decode } = await import('base32-decode');

    // 解码Base32编码
    const decodedBuffer = base32Decode(batchNumber, 'Crockford');
    const decodedString = Buffer.from(decodedBuffer).toString('utf-8');

    // 分割解码数据，得到原始日期、批次号和随机数
    const [date, sequence] = decodedString.split('-');

    if (!date || !sequence) {
      throw new Error('Invalid batch number format.');
    }

    return { date, sequence };
  } catch (error) {
    console.error('Failed to decode batch number:', error);
    return null;  // 返回null表示解码失败
  }
};

const Decimal = require('decimal.js');

/**
 * 单位转换函数，将数量从一个单位转换为另一个单位
 * @param {number} quantity - 原始数量
 * @param {number} fromComputeUnit - 原单位的计算系数
 * @param {number} toComputeUnit - 目标单位的计算系数
 * @returns {string} - 转换后的数量，返回字符串避免精度丢失
 */
exports.convertUnit = (quantity, fromComputeUnit, toComputeUnit) => {
  if (fromComputeUnit <= 0 || toComputeUnit <= 0) {
    throw new Error('无效的转换单位系数');
  }

  // 使用 decimal.js 进行单位转换
  return new Decimal(quantity)
    .times(fromComputeUnit)
    .div(toComputeUnit)
    .toString(); // 返回字符串，避免精度丢失
};

/**
 * 计算增减数量并进行单位转换
 * @param {Object} base - 基准数量及计算单位 { quantity: number, computeUnit: number }
 * @param {Object} change - 追加数量及计算单位 { quantity: number, computeUnit: number }
 * @param {string} type - 计算类型，'add' 为增量，'subtract' 为减量
 * @param {number} precision - 保留小数的位数（例如 3 位）
 * @returns {Promise<number|null>} 返回更新后的仓库数量，保留精度，或者错误信息
 */
exports.calculateNewQuantity = (base, change, type, precision = 3) => {
  // 校验输入的计算单位
  const baseComputeUnit = base.computeUnit;
  const changeComputeUnit = change.computeUnit;

  if (baseComputeUnit <= 0 || changeComputeUnit <= 0) {
    throw new Error('无效的单位系数');
  }

  // 将 change 的数量转换为与 base 相同的计算单位
  const changeConverted = this.convertUnit(change.quantity, changeComputeUnit, baseComputeUnit);

  let result;

  // 根据操作类型进行加减运算
  if (type === 'add') {
    result = new Decimal(base.quantity).plus(changeConverted);
  } else if (type === 'subtract') {
    let subRes = new Decimal(base.quantity).minus(changeConverted);
    if (subRes < 0) {
      throw new Error('计算增减数量时出错:数量不足');
    } else {
      result = subRes;
    }
  } else {
    throw new Error('计算增减数量时出错:无效的计算类型');
  }
  // 保留指定的小数位数
  result = result.toFixed(precision);
  return result;
};
