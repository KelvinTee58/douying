export default {
  /**
   * 对给定的数值进行格式化，使其易于阅读。
   * 当数值过大或过小时，将其转换为万或亿为单位的格式。
   *
   * @param {number} value - 需要格式化的数值。
   * @returns {string} 格式化后的数值字符串。
   */
  millionCN(value) {
    // 初始化格式化后的数值变量
    let num;

    // 检查数值范围并进行相应的格式化
    if (value > 9999 && value <= 99999999) {
      // 大于9999显示x.xx万
      num = Math.floor(value / 1000) / 10 + '万';
    } else if (value > 99999999) {
      // 大于99999999显示x.xx亿
      num = Math.floor(value / 10000000) / 10 + '亿';
    } else if (value < 9999 && value > -9999) {
      // 在-9999和9999之间不进行格式化
      num = value;
    } else if (value < -9999 && value >= -99999999) {
      // 小于-9999显示-x.xx万
      num = -(Math.floor(Math.abs(value) / 1000) / 10) + '万';
    } else if (value < -99999999) {
      // 小于-99999999显示-x.xx亿
      num = -(Math.floor(Math.abs(value) / 10000000) / 10) + '亿';
    }

    // 返回格式化后的数值
    return num;
  }
};
