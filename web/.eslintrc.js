module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended' // 使用 prettier 推荐的规则
  ],
  rules: {
    // 可以根据需要自定义一些规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  parserOptions: {
    parser: '@babel/eslint-parser', // 使用 @babel/eslint-parser
    requireConfigFile: false // 不需要 Babel 配置文件
  }
}
