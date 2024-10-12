// send.js

const createResponseParams = (req, sendOption) => {
  const isRefresh = req.body.refresh || false;
  const params = {};
  if (isRefresh) {
    params.refresh = isRefresh;
  }
  return { ...params, ...sendOption };
};

const send = (req, res, sendOption) => {
  res.send(createResponseParams(req, sendOption));
};

/**
 * 发送信息通用成功信息方法
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 * @param {*} sendOption 发送信息选项
 */
send.success = (req, res, sendOption) => {
  sendOption = {
    status: 0,
    message: "成功",
    data: {},
    ...sendOption, // 使用解构来合并默认值和传入的值
  };
  res.send(createResponseParams(req, sendOption));
};

/**
 * 发送信息通用错误信息方法
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 * @param {*} sendOption 发送信息选项
 */
send.error = (req, res, sendOption) => {
  sendOption = {
    status: 1,
    message: "请求失败",
    data: {},
    ...sendOption, // 使用解构来合并默认值和传入的值
  };
  res.send(createResponseParams(req, sendOption));
};

module.exports = send;
