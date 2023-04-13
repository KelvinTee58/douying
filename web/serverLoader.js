const config = require("./config");

module.exports = function (source) {
  /** 静态资源地址 */
  return `
    ${
      source
        .replace(/\@image/gi, config.imageUrl)
        // .replace(/localFileUrl/ig, config.localFileUrl)
        .replace(/reqUrl/gi, config.requestUrl)
      // .replace(/useSdcard/ig, config.useSdcard)
    }
  `;
};
