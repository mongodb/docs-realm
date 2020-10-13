module.exports = {
  env: {
    node: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    // "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest", "prettier"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "warn",
  },
};
