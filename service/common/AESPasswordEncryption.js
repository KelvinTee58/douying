const CryptoJS = require("crypto-js");

const AES_KEY = 'douying_aes'; // 密钥
const keySize = 128; // 设置数据块长度

// 填充密钥的函数
const fillKey = (key) => {
  return CryptoJS.enc.Utf8.parse(key.padEnd(16, '\0')); // 确保密钥长度为 16 字节
}

const decryptBase64 = (word, keyStr) => {
  console.log("Decrypting:", word); // 打印传入的 Base64 字符串

  keyStr = fillKey(keyStr || AES_KEY);
  const key = CryptoJS.enc.Utf8.parse(keyStr);

  // Base64 解码
  const base64Decoded = CryptoJS.enc.Base64.parse(word);

  // 解密
  const decrypt = CryptoJS.AES.decrypt(
    { ciphertext: base64Decoded },
    key,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const decryptedText = CryptoJS.enc.Utf8.stringify(decrypt).toString();
  console.log("Decrypted text:", decryptedText); // 打印解密后的文本
  return decryptedText;
}

module.exports = {
  decryptBase64,
};
