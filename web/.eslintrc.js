// .eslintrc.js
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
    'prettier/prettier': [
      'error',
      {
        semi: true, // 使用分号
        singleQuote: true, // 使用单引号
        printWidth: 80, // 最大行宽限制
        // trailingComma: 'es5', // 在 ES5 及以上的地方保留末尾逗号
        trailingComma: 'none', // 在对象字面量中不保留末尾逗号
        bracketSpacing: true, // 对象字面量中括号前后加空格
        jsxBracketSameLine: false,
        arrowParens: 'always'
      }
    ],
    // 可以根据需要自定义一些规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  parserOptions: {
    parser: '@babel/eslint-parser', // 使用 @babel/eslint-parser
    requireConfigFile: false // 不需要 Babel 配置文件
  }
};
