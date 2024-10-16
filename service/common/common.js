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