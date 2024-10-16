module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      // selectorBlackList: ['van-'], // 过滤掉 van- 开头的选择器
      propList: ['*'],
      exclude: /node_modules/i
    }
  }
};
