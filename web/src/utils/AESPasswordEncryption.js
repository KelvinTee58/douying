/**
 * 工具类
 * AES加密
 */
import CryptoJS from 'crypto-js';

const AES_KEY = 'douying_aes'; // 密钥
const keySize = 128; // 设置数据块长度

// 填充密钥的函数
const fillKey = (key) => {
  // 将 key 转为 UTF-8 编码并填充到 keySize/8 的长度
  const filledKey = CryptoJS.enc.Utf8.parse(key.padEnd(keySize / 8, '\0')); // 确保密钥长度为 keySize/8 字节
  return filledKey;
};

function encrypt(word, keyStr) {
  keyStr = fillKey(keyStr || AES_KEY);
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted;
}

export function encryptBase64(word, keyStr) {
  const encrypted = encrypt(word, keyStr);
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
