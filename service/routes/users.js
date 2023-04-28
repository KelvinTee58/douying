var express = require("express");
var router = express.Router();
// const { secretkey } = require("../config/serviceConfig");
const { getToken, decryptToken, checkToken, verifyToken } = require("../common/token");
const models = require("../models");
const send = require("../common/send");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("/users", req.body);
  // send.success(req, res, {}, "密码错误");
  send.error(req, res, {
    status: 1,
    message: "密码错误",
  });
});

// 重刷token
router.post("/token", async function (req, res, next) {
  let { refreshToken } = req.body;
  console.log("refreshToken", refreshToken);
  let isVerify = verifyToken(res, refreshToken);
  let { isValidity } = checkToken(res, refreshToken, false);
  console.log("isVerify", isValidity, isVerify);
  if (isVerify && isValidity) {
    let tokenContent = decryptToken(res, refreshToken);
    let userParams = { uid: tokenContent.uid, type: "access" };
    let expiresIn = "2h";
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      expiresIn = "48h";
    } else {
      expiresIn = "2h";
    }
    let accessToken = getToken(req, userParams, expiresIn);
    send.success(req, res, {
      data: {
        accessToken: `${accessToken}`,
      },
    });
  }
});

//登录
router.post("/login", async function (req, res, next) {
  console.log("post login");

  let { username, phone, password } = req.body;
  let queryConditions = {};
  if (username) {
    queryConditions.username = username;
  } else if (phone) {
    queryConditions.phone = phone;
  }
  // 用户信息
  const userModels = await models.User.findOne({
    where: queryConditions,
    include: {
      model: models.Role,
      attributes: ["roleName", "id"],
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "RoleId"],
    },
  });
  // console.log("userModels", userModels.dataValues.id);
  if (userModels && userModels.dataValues.id) {
    // 密码验证
    const pswModels = await models.Password.findOne({
      where: {
        uid: userModels.dataValues.id,
        password,
      },
      attributes: ["uid"],
    });
    let expiresIn = "2h";
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      expiresIn = "48h";
    } else {
      expiresIn = "2h";
    }
    if (pswModels && pswModels.dataValues.uid) {
      // 秘钥
      let userParams = { uid: userModels.dataValues.id, type: "access" };
      let refreshUserParams = { uid: userModels.dataValues.id, type: "refresh" };
      let token = getToken(req, userParams, expiresIn);
      // let token = getToken(req, userParams, expiresIn);
      let refreshToken = getToken(req, refreshUserParams, "7d");
      // console.log("token", token, uss
      send.success(req, res, {
        status: 0,
        message: "登录成功",
        data: {
          refreshToken: `${refreshToken}`,
          accessToken: `${token}`,
          user: userModels,
        },
        // token: `Bearer ${token}`,
      });
    } else {
      send.error(req, res, {
        status: 1,
        message: "密码错误",
      });
    }
  } else {
    send.error(req, res, {
      status: 1,
      message: "登录失败，请确认登录信息",
    });
  }
});

module.exports = router;
