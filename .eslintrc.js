module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 前后空格使用：关闭
    "generator-star-spacing": "off",
    // 关闭逻辑混用需要加括号
    "no-mixed-operators": 0,
    // 单引号
    "quotes": [
      // off, warning, error
      2,
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    // 分号
    // "semi": [
    //   2,
    //   "never",
    //   {
    //     "beforeStatementContinuationChars": "never"
    //   }
    // ],
    // 禁止对变量使用 delete
    "no-delete-var": 2,
    "prefer-const": [
      2,
      {
        "ignoreReadBeforeAssign": false
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  
};
