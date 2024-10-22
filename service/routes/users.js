var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const models = require("../models");
const send = require("../common/send");
const { parseExpireTime } = require("../common/common");
const jwtUtils = require("../common/token");
const bcryptUtils = require("../common/bcrypt");
const cryptoJSUtils = require("../common/AESPasswordEncryption");

// 为了减少返回数据量，默认不返回一些不必要后端判断用的的数据
const defaultUserExclude = ["createdAt", "updatedAt", "lockUntil", "loginAttempts"]

// 添加用户 (Create)
router.post("/", async (req, res) => {
  try {
    const { username, name, roleId, phone, password } = req.body;
    // console.log('222 :>> ', username, name, roleId, phone, password);
    // 检查 roleId 是否有效
    const roleExists = await models.Role.findByPk(roleId);
    if (!roleExists) {
      return send.error(req, res, { message: "无效的 roleId" });
    }
    // 创建用户
    const newUser = await models.User.create({
      id: uuidv4(), // 生成 UUID
      username,
      name,
      roleId,
      phone,
    });

    const o_psw = cryptoJSUtils.decryptBase64(password);
    console.log('o_psw :>> ', o_psw);
    // 使用 bcrypt 验证密码
    const psw = await bcryptUtils.hashPassword(o_psw);
    console.log('newUser.id :>> ', newUser.id);
    // 创建密码记录
    await models.Password.create({
      userId: newUser.id,
      originalPassword: o_psw,
      password: psw
    });

    send.success(req, res, { data: newUser }); // 使用自定义成功响应
  } catch (error) {
    send.error(req, res, { message: "添加用户时发生错误", data: error }); // 使用自定义错误响应
  }
});

// 获取所有用户 (Read)
router.get("/list", async (req, res) => {
  // console.log('async :>> ', req);
  try {
    const users = await models.User.findAll({
      include: {
        model: models.Role,
        attributes: ["roleName", "id"],
      },
      attributes: {
        exclude: defaultUserExclude // 指定要排除的字段
      },
    });
    return send.success(req, res, {
      message: "密码错误",
      data: users
    });
  } catch (error) {
    return send.error(req, res, {
      message: "获取用户列表时发生错误",
      data: error
    });
  }
});

// 根据用户名查询用户
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await models.User.findOne({
      where: { username },
      attributes: {
        exclude: defaultUserExclude,
      }
    });
    if (!user) {
      return send.error(req, res, {
        message: "用户未找到",
      });
    }
    return send.success(req, res, {
      message: "用户未找到",
      data: user
    });
  } catch (error) {
    return send.error(req, res, {
      message: "查询用户失败",
      data: error
    });
  }
});

// 更新用户
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, name, roleId, phone } = req.body;

  try {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: defaultUserExclude,
      }
    });
    if (!user) {
      return send.error(req, res, {
        message: "用户未找到",
      });
    }
    await user.update({
      username,
      name,
      roleId,
      phone,
    });
    return send.success(req, res, {
      message: "用户更新成功",
      data: user
    });
  } catch (error) {
    return send.error(req, res, {
      message: "更新用户失败",
    });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: defaultUserExclude,
      }
    });
    if (!user) {
      return send.error(req, res, {
        message: "用户未找到",
      });
    }
    await user.destroy();
    return send.success(req, res, {
      message: "用户删除成功",
      data: user
    });
  } catch (error) {
    return send.error(req, res, {
      message: "删除用户失败",
    });
  }
});

// TODO 待完善 重刷token
// 重刷token
router.post("/refreshToken", async function (req, res, next) {

  let { refreshToken } = req.body;
  console.log('refreshToken :>> ', refreshToken);
  if (!refreshToken) {
    // res.status(403);
    return send.error(req, res, {
      status: 1,
      message: "refreshToken 无效",
    });
  }
  try {
    let isVerify = jwtUtils.verifyToken(res, refreshToken);
    let { isValidity } = jwtUtils.checkToken(res, refreshToken, false);
    console.log("isVerify", isValidity, isVerify);
    if (isVerify && isValidity) {
      let tokenContent = jwtUtils.decryptRSAToken(res, refreshToken);

      let expiresIn = process.env.TOKEN_EXPIRES_IN || "2h";
      let expiresInMilliseconds = parseExpireTime(expiresIn)

      let userParams = {
        userId: tokenContent.userId,
        username: tokenContent.username,
        roleId: tokenContent.roleId,
        name: tokenContent.name,
        type: "access"
      };
      let accessToken = jwtUtils.getToken(req, userParams, expiresIn);
      return send.success(req, res, {
        data: {
          accessToken: { expiresIn: expiresInMilliseconds, token: accessToken },
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
        // include: ['id', 'name', 'phone', 'username'],
        exclude: [...defaultUserExclude],
      },
    });
    if (!userModels || !userModels.dataValues.id) {
      return send.error(req, res, {
        status: 1,
        message: "登录失败，请确认登录信息",
      });
    }
    const o_psw = cryptoJSUtils.decryptBase64(password);
    // 密码验证
    const pswModels = await models.Password.findOne({
      where: {
        userId: userModels.dataValues.id,
      },
      attributes: ["password"],
    });
    if (!pswModels || !pswModels.dataValues.password) {
      return send.error(req, res, {
        status: 1,
        message: "密码错误",
      });
    }
    const isPasswordValid = await bcryptUtils.verifyPassword(o_psw, pswModels.dataValues.password);
    // const psw = await bcryptUtils.hashPassword('test');
    if (!isPasswordValid) {
      return send.error(req, res, {
        status: 1,
        message: "密码错误",
      });
    }
    console.log('TOKEN_EXPIRES_IN :>> ', process.env.TOKEN_EXPIRES_IN);
    // 设置 token 过期时间
    let expiresIn = process.env.TOKEN_EXPIRES_IN || "2h";
    let refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";
    let expiresInMilliseconds = parseExpireTime(expiresIn)
    let refreshExpiresInMilliseconds = parseExpireTime(refreshExpiresIn)
    // 生成 accessToken 和 refreshToken
    // 秘钥
    const userParams = {
      userId: userModels.dataValues.id,
      username: userModels.dataValues.username,
      roleId: userModels.dataValues.RoleId,
      name: userModels.dataValues.name,
      type: "access"
    };
    const refreshUserParams = {
      userId: userModels.dataValues.id,
      roleId: userModels.dataValues.RoleId,
      username: userModels.dataValues.username,
      name: userModels.dataValues.name,
      type: "refresh"
    };
    const token = jwtUtils.getToken(req, userParams, expiresIn);
    // let token = getToken(req, userParams, expiresIn);
    const refreshToken = jwtUtils.getToken(req, refreshUserParams, refreshExpiresIn);
    // 返回成功响应
    return send.success(req, res, {
      status: 0,
      message: "登录成功",
      data: {
        refreshToken: { expiresIn: refreshExpiresInMilliseconds, token: refreshToken },
        accessToken: { expiresIn: expiresInMilliseconds, token: token },
        user: userModels,
      },
    });
  } catch (error) {
    console.error("登录时发生错误：", error);
    return send.error(req, res, {
      status: 1,
      message: "登录失败，服务器发生错误",
    });
  }
});

// 根据token获取当前登录的用户的信息 
router.get("/", async (req, res) => {
  let { userId } = req.user;
  try {
    if (userId) {
      let queryConditions = {
        id: userId
      };
      // 用户信息
      const userModels = await models.User.findOne({
        where: queryConditions,
        include: {
          model: models.Role,
          attributes: ["roleName", "id"],
        },
        attributes: {
          // include: ['id', 'name', 'phone', 'username'],
          exclude: [...defaultUserExclude],
        },
      });
      // 返回成功响应
      return send.success(req, res, {
        status: 0,
        message: "获取用户信息成功",
        data: {
          user: userModels,
        },
      });
    }
  } catch (error) {
    return send.error(req, res, {
      status: 1,
      message: "获取用户信息失败，服务器发生错误，重新登录",
    });
  }
});

module.exports = router;
