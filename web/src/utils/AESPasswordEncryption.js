/**
 * 工具类
 * AES加密
 */
import CryptoJS from "crypto-js";

const AES_KEY = "douying_aes"; // 密文（密钥）
const keySize = 128; // 设置数据块长度

/**
 * 生成密钥字节数组, 原始密钥字符串不足128位, 补填0.
 * @param {string} key - 原始 key 值
 * @return Buffer
 */
const fillKey = (key) => {
  const filledKey = Buffer.alloc(keySize / 8);
  const keys = Buffer.from(key);
  if (keys.length < filledKey.length) {
    filledKey.map((b, i) => (filledKey[i] = keys[i]));
  }
  return filledKey;
};

function encrypt(word, keyStr) {
  // keyStr = keyStr || AES_KEY;
  keyStr = fillKey(keyStr || AES_KEY);
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  // const srcs = word;
  // console.log("key", key, srcs);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted;
}

export function decryptBase64(word, keyStr) {
  // keyStr = keyStr || AES_KEY;
  keyStr = fillKey(keyStr || AES_KEY);
  var key = CryptoJS.enc.Utf8.parse(keyStr);
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

export function encryptHex(word, keyStr) {
  const encrypted = encrypt(word, keyStr);
  return encrypted.ciphertext.toString().toUpperCase();
}

export function encryptBase64(word, keyStr) {
  const encrypted = encrypt(word, keyStr);
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export function decryptHex(hexWord, keyStr) {
  const wordArray = CryptoJS.enc.Hex.parse(hexWord);
  const base64Word = CryptoJS.enc.Base64.stringify(wordArray);
  return decryptBase64(base64Word, keyStr);
}
