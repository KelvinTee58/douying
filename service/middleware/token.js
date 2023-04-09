const { checkToken, verifyToken } = require("../common/token");

module.exports = tokenMiddleware = (req, res, next) => {
  // 登录不验证token
  if (req.url == "/users/login" || req.url == "/users/token") {
    next();
  } else {
    if (req.headers.authorization) {
      let tokenList = req.headers.authorization.split("Bearer ");
      // console.log("tokenList", tokenList);
      // let v1 = verifyToken(res, tokenList[1]);
      // let v2 = decryptToken(res, tokenList[1]);
      // console.log("refresh:", tokenList[1], v1, v2);
      let isVerify = verifyToken(res, tokenList[1]);
      let { refresh, isValidity } = checkToken(res, tokenList[1]);
      console.log("refresh:", refresh, ",isValidity:", isValidity);
      if (isVerify && isValidity) {
        if (refresh) {
          req.body.refresh = refresh;
        }
        next();
      } else {
        res.send({
          status: 1,
          message: "token失效",
        });
      }
    } else {
      res.send({
        status: 1,
        message: "token无效",
      });
    }
    // next();
    // let isVerify = verifyToken(req.header.token);
  }
};
