module.exports = {
  plugins: {
    // "postcss-pxtorem": {
    //   rootValue: 37.5,
    //   propList: ["*"],
    // },
    autoprefixer: {},
    "postcss-px2rem-exclude": {
      remUnit: 37.5,
      exclude: /node_modules/i,
    },
  },
};
