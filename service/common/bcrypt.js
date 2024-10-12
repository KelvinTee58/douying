const bcrypt = require("bcrypt");
const saltRounds = 10;

/**
 * 对密码进行加密
 * @param {string} password - 需要加密的密码
 * @returns {Promise<string>} - 返回加密后的哈希值
 */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("加密密码时发生错误");
  }
};

/**
 * 验证密码
 * @param {string} password - 原始密码
 * @param {string} hash - 加密后的哈希值
 * @returns {Promise<boolean>} - 返回密码是否匹配
 */
const verifyPassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("验证密码时发生错误");
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};
