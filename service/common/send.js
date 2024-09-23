const send = (req, res, sendOption) => {
  let isRefresh = req.body.refresh || false;
  let params = {};
  if (isRefresh) {
    params.refresh = isRefresh;
  }
  res.send({ ...params, ...sendOption });
  // next();
};

/**
 * 发送信息通用 success 信息方法
 * @param {*} req req
 * @param {*} res res
 * @param {*} sendOption 发送信息选项
 */
send.success = (req, res, sendOption) => {
  let isRefresh = req.body.refresh || false;
  let params = {};
  if (isRefresh) {
    params.refresh = isRefresh;
  }
  sendOption.status = 0;
  if (!sendOption.message) {
    sendOption.message = "成功";
  }
  sendOption.data = sendOption.data || {};
  res.send({ ...params, ...sendOption });
  // next();
};

/**
 * 发送信息通用 success 信息方法
 * @param {*} req req
 * @param {*} res res
 * @param {*} sendOption 发送信息选项
 */
send.error = (req, res, sendOption) => {
  let isRefresh = req.body.refresh || false;
  let params = {};
  if (isRefresh) {
    params.refresh = isRefresh;
  }
  if (!sendOption.status) sendOption.status = 1;
  if (!sendOption.message) {
    sendOption.message = "请求失败";
  }
  sendOption.data = sendOption.data || {};
  res.send({ ...params, ...sendOption });
  // next();
};

module.exports = send;
