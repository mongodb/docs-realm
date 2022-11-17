// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
  plugins: [
    '@realm/babel-plugin',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
