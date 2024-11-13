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
  const randomPart = crypto.randomBytes(4).toString('hex');

  // 拼接日期 + 批次号 + 随机数
  const data = `${dateString}-${sequence}-${randomPart}`;

  // 将拼接后的数据进行Base32编码并转换为大写
  const buffer = Buffer.from(data, 'utf-8');
  const encoded = base32Encode(buffer, 'Crockford').toUpperCase();

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