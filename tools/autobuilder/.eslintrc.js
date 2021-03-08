module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
    ecmaVersion: 8,
  },
  root: true,
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "eslint-plugin-tsdoc"],
      extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "tsdoc/syntax": "warn",
      },
    },
  ],
  ignorePatterns: ["**/build/*"],
};
