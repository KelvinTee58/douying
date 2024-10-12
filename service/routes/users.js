var express = require("express");
var router = express.Router();
// const { secretkey } = require("../config/serviceConfig");
const { getToken, decryptToken, checkToken, verifyToken } = require("../common/token");
const models = require("../models");
const send = require("../common/send");
const bcryptUtils = require("../common/bcrypt");

// 添加用户 (Create)
router.post("/", async (req, res) => {
  try {
    const { username, name, roleId, phone, originalPassword, password } = req.body;

    // 创建用户
    const newUser = await User.create({
      username,
      name,
      roleId,
      phone,
    });

    // 创建密码记录
    await Password.create({
      uid: newUser.id,
      originalPassword,
      password: bcryptUtils.hashPassword(password), // 假设你有加密函数
    });

    send.success(req, res, { data: newUser }); // 使用自定义成功响应
  } catch (error) {
    send.error(req, res, { message: "添加用户时发生错误", data: error }); // 使用自定义错误响应
  }
});

// 获取所有用户 (Read)
router.get("/", async (req, res) => {
  try {
    const users = await models.User.findAll({
      include: {
        model: models.Role,
        attributes: ["roleName", "id"],
      },
    });
    send.success(req, res, { data: users }); // 使用自定义成功响应
  } catch (error) {
    send.error(req, res, { message: "获取用户列表时发生错误", data: error }); // 使用自定义错误响应
  }
});

// 重刷token
router.post("/token", async function (req, res, next) {
  let { refreshToken } = req.body;
  if (!refreshToken) {
    // res.status(403);
    return send.error(req, res, {
      status: 1,
      message: "refreshToken 无效",
    });
  }
  try {
    let isVerify = verifyToken(res, refreshToken);
    let { isValidity } = checkToken(res, refreshToken, false);
    // console.log("isVerify", isValidity, isVerify);
    if (isVerify && isValidity) {
      let tokenContent = decryptToken(res, refreshToken);

      // 根据环境变量设定 token 的过期时间
      let expiresIn = process.env.NODE_ENV === "development" ? "48h" : "2h";
      let timeLength = process.env.NODE_ENV === "development" ? "172800" : "7200";

      let userParams = { uid: tokenContent.uid, type: "access" };
      let accessToken = getToken(req, userParams, expiresIn);

      return send.success(req, res, {
        data: {
          expiresIn: timeLength,
          accessToken: `${accessToken}`,
        },
      });
    } else {
      // res.status(403);
      return send.error(req, res, {
        status: 403,
        message: "refreshToken 失效",
      });
    }
  } catch (error) {
    // console.log(error);
    return send.error(req, res, {
      status: 403,
      message: "refreshToken 失效",
    });
  }
});

//登录
router.post("/login", async function (req, res, next) {
  console.log("post login");

  let { username, phone, password } = req.body;
  try {
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
    if (!userModels || !userModels.dataValues.id) {
      return send.error(req, res, {
        status: 1,
        message: "登录失败，请确认登录信息",
      });
    }

    // 使用 bcrypt 验证密码
    const psw = await bcryptUtils.hashPassword(password);
    console.log("psw :>> ", psw);

    // 密码验证
    const pswModels = await models.Password.findOne({
      where: {
        uid: userModels.dataValues.id,
      },
      attributes: ["password"],
    });
    if (!pswModels || !pswModels.dataValues.password) {
      return send.error(req, res, {
        status: 1,
        message: "密码错误",
      });
    }

    const isPasswordValid = await bcryptUtils.verifyPassword(password, pswModels.dataValues.password);
    console.log("isPasswordValid :>> ", isPasswordValid, password, pswModels.dataValues.password);

    if (!isPasswordValid) {
      return send.error(req, res, {
        status: 1,
        message: "密码错误",
      });
    }

    // 设置 token 过期时间
    let expiresIn = process.env.TOKEN_EXPIRES_IN || "2h";
    let refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";
    let timeLength = expiresIn === "2h" ? "7200" : "172800"; // 可调整为更灵活
    // 生成 accessToken 和 refreshToken
    const userParams = { uid: userModels.dataValues.id, type: "access" };
    const refreshUserParams = { uid: userModels.dataValues.id, type: "refresh" };
    const token = jwtUtils.getToken(req, userParams, expiresIn);
    const refreshToken = jwtUtils.getToken(req, refreshUserParams, refreshExpiresIn);

    // 返回成功响应
    send.success(req, res, {
      status: 0,
      message: "登录成功",
      data: {
        expiresIn: timeLength,
        refreshToken,
        accessToken: token,
        user: userModels,
      },
    });
  } catch (error) {
    console.error("登录时发生错误：", error);
    send.error(req, res, {
      status: 1,
      message: "登录失败，服务器发生错误",
    });
  }
});

module.exports = router;
