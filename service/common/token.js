const jwt = require("jsonwebtoken");
// const NodeRSA = require("node-rsa");
const crypto = require("crypto");
// const models = require("@db/index");
const { secretkey, crypto_secretkey } = require("../config/serviceConfig");

// const secret = 'token'; // 密钥，不能丢
// const secret = new NodeRSA({ b: 512 }).exportKey('public');
const secret = secretkey;

// 加密必要参数
const ALGORITHM = "aes-192-cbc";
const PASSWORD = crypto_secretkey;
// 改为使用异步的 `crypto.scrypt()`。
const key = crypto.scryptSync(PASSWORD, "douying", 24);
// 使用 `crypto.randomBytes()` 生成随机的 iv 而不是此处显示的静态的 iv。
const iv = Buffer.alloc(16, 16); // 初始化向量。

/**
 * token生成
 * @param <Object | String> userInfo - 用户信息
 * @param <string | Number> time - 过期时间
 */
exports.getToken = (ctx, userInfo, time) => {
  // 为解码的token
  if (typeof userInfo === "string") {
    const obj = this.decryptRSAToken("", userInfo);
    userInfo = {
      name: obj.name,
      uid: obj.uid,
    };
  }
  // 创建token并导出
  const token = jwt.sign(userInfo, secret, { expiresIn: time }); // 60, "2 days", "10h", "7d".
  const data = {
    token,
    useruid: userInfo.uid,
  };
  // models.onlineToken.create(data);

  // token加密
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

/**
 * token解密
 * @param String 再加密后的tokens
 * @return String 三点式token
 */
exports.decryptToken = (ctx, tokens) => {
  // 解密
  try {
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    // 使用相同的算法、密钥和 iv 进行加密
    let decrypted = decipher.update(tokens, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    return false;
  }
};
/**
 * token验证
 * @param String tokens
 * @param bool type, token: true,refreshToken: false
 * @return bool 过期: false, 不过期: true
 */
exports.checkToken = (ctx, tokens, type = true) => {
  let checkTokenData = {};
  tokens = tokens.replace(/\s+/g, ""); // 空格替换
  try {
    // 解密
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    // 使用相同的算法、密钥和 iv 进行加密
    let decrypted = decipher.update(tokens, "hex", "utf8");
    decrypted += decipher.final("utf8");

    const decoded = jwt.decode(decrypted, secret);
    // console.log("decoded", decoded, decoded.exp > new DaccessTokenate());
    // 600秒过期预警
    if (type) {
      if (decoded.exp > new Date() / 1000 && decoded.exp < new Date() / 1000 + 600) {
        // ctx.append("refresh", true);
        checkTokenData.refresh = true;
      } else {
        // ctx.remove("refresh");
        checkTokenData.refresh = false;
      }
    }
    checkTokenData.isValidity = !(decoded && decoded.exp <= new Date() / 1000);
    return checkTokenData;
  } catch (error) {
    return { isValidity: false, refresh: false };
  }
  // return !(decoded && decoded.exp <= new Date() / 1000);
};

/**
 * token解码
 * @param String tokens
 * @return token token解码后对象
 */
exports.decryptRSAToken = (ctx, tokens) => {
  tokens = tokens.replace(/\s+/g, ""); // 空格替换
  try {
    // 解密
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    // 使用相同的算法、密钥和 iv 进行加密
    let decrypted = decipher.update(tokens, "hex", "utf8");
    decrypted += decipher.final("utf8");

    // decrypted += decipher.final('utf8');
    const decoded = jwt.decode(decrypted, secret);
    return decoded;
  } catch (error) {
    return false;
  }
};

/**
 * token验证 是否有效
 * @param String tokens
 */
exports.verifyToken = (ctx, token) => {
  token = token.replace(/\s+/g, ""); // 空格替换, 超级账号换行导致会有空格
  try {
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    // 使用相同的算法、密钥和 iv 进行加密
    let decrypted = decipher.update(token, "hex", "utf8");
    decrypted += decipher.final("utf8");
    // jwt.verify方法验证token是否有效
    jwt.verify(decrypted, secret, {
      complete: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
