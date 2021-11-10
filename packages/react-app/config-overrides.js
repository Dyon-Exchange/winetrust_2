// eslint-disable-next-line @typescript-eslint/no-var-requires
const { addBabelPreset } = require("customize-cra");

module.exports = function override(config, env) {
  // Let Babel compile outside of src/.
  const tsRule = config.module.rules[1].oneOf[2];
  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  addBabelPreset("@emotion/babel-preset-css-prop");

  return config;
};
