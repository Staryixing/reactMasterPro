const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin,
  addDecoratorsLegacy,
} = require("customize-cra");
const path = require("path");
const Webpack = require("webpack");
var autoprefixer = require("autoprefixer");

// 配置打包路径
const paths = require("react-scripts/config/paths");
paths.appBuild = path.join(path.dirname(paths.appBuild), "./exe/render");
// 设置环境变量API_ENV
let myplugins = [
  new Webpack.DefinePlugin({
    "process.env.API_ENV": JSON.stringify(process.env.API_ENV),
  }),
];
let configPlugin = function (config) {
  config.plugins = [...config.plugins, ...myplugins];
  return config;
};
// 配置相对路径 @ 表示
let configAlias = function (config, env) {
  config.resolve.alias = Object.assign(config.resolve.alias, {
    "@": path.resolve(__dirname, "src"),
  });
  if ("production" === config.mode) {
    config.output.publicPath = "./";
    config.devtool = "none";
  }
  return config;
};
// 配置less
let configLessLoader = function (config, env) {
  let loaders = config.module.rules.find((rule) =>
    Array.isArray(rule.oneOf)
  ).oneOf;
  loaders.unshift({
    test: /\.less$/i,
    exclude: [/node_modules/],
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: require.resolve("css-loader"),
        options: {
          modules: {
            mode: "local",
            localIdentName: "[path][name]__[local]__[hash:base64:5]",
          },
        },
      },
      {
        loader: "less-loader",
      },
    ],
  });
  return config;
};
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  // 修改主题样式
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1890FF" },
  }),
  configLessLoader,
  // configSplitChunks,
  configAlias,
  configPlugin,
)