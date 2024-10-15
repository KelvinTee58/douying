const { checkToken, verifyToken, decryptToken, decryptRSAToken } = require("../common/token");
const send = require("../common/send");

module.exports = tokenMiddleware = (req, res, next) => {
  // 登录不验证token
  if (req.url == "/users/login" || req.url == "/users/token") {
    next();
  } else {
    if (req.headers.authorization) {
      let tokenList = req.headers.authorization.split("Bearer ");
      try {
        let isVerify = verifyToken(res, tokenList[1]);
        let { refresh, isValidity } = checkToken(res, tokenList[1]);
        const dTokenInfo = decryptRSAToken(res, tokenList[1]);
        req.user = dTokenInfo
        // req.user = decoded; // 将解码后的用户信息存储到请求对象中
        if (isVerify && isValidity) {
          if (refresh) {
            req.body.refresh = refresh;
          }
          next();
        } else {
          res.status(403);
          send.error(req, res, {
            status: 1,
            message: "token失效",
          });
        }
      } catch (error) {
        // console.error("error:", error);
        res.status(403);
        send.error(req, res, {
          status: 1,
          message: "token失效",
        });
      }
    } else {
      res.status(401);
      send.error(req, res, {
        status: 1,
        message: "需要token令牌",
      });
    }
    // next();
    // let isVerify = verifyToken(req.header.token);
  }
};
