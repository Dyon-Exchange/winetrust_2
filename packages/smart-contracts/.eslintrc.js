module.exports = {
  extends: "eslint-config-labrys/base",
  parser: "@typescript-eslint/parser",
  rules: {
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  }
};
