const { checkToken, verifyToken } = require("../common/token");
const send = require("../common/send");

module.exports = tokenMiddleware = (req, res, next) => {
  // 登录不验证token
  if (req.url == "/users/login" || req.url == "/users/token") {
    next();
  } else {
    // console.log("req.headers", req.headers.authorization);
    if (req.headers.authorization) {
      let tokenList = req.headers.authorization.split("Bearer ");
      // console.log("tokenList", tokenList);
      // let v1 = verifyToken(res, tokenList[1]);
      // let v2 = decryptToken(res, tokenList[1]);
      // console.log("refresh:", req.headers.authorization, "---", tokenList[1]);
      try {
        let isVerify = verifyToken(res, tokenList[1]);
        console.log("isVerify:", isVerify);

        let { refresh, isValidity } = checkToken(res, tokenList[1]);
        console.log("refresh:", refresh, ",isValidity:", isValidity);
        if (isVerify && isValidity) {
          if (refresh) {
            req.body.refresh = refresh;
          }
          next();
        } else {
          send.error(req, res, {
            status: 1,
            message: "token失效",
          });
        }
      } catch (error) {
        console.error("error:", error);
      }
    } else {
      send.error(req, res, {
        status: 1,
        message: "token无效",
      });
    }
    // next();
    // let isVerify = verifyToken(req.header.token);
  }
};
