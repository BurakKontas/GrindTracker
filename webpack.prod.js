/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OverwolfPlugin = require("./overwolf.webpack");

module.exports = (env) => ({
  // mode: "production",
  entry: {
    background: "./src/windows/background/background.js",
    app_window: "./src/windows/app_window/app_window.js",
    grind_tracker: "./src/windows/grind_tracker/grind_tracker.js",
    timer: "./src/windows/timer/timer.js",
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name]/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]", // set the output path and filename for the svg files
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: "svg-inline-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Add .ts and .tsx to the list of supported extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/windows/background/background.html",
      filename: "background/background.html",
      chunks: ["background"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/windows/app_window/app_window.html",
      filename: "app_window/app_window.html",
      chunks: ["app_window"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/windows/grind_tracker/grind_tracker.html",
      filename: "grind_tracker/grind_tracker.html",
      chunks: ["grind_tracker"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/windows/timer/timer.html",
      filename: "timer/timer.html",
      chunks: ["timer"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "" },
        { from: "icons", to: "icons" },
      ],
    }),
    new OverwolfPlugin(env),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production"),
    // }),
  ],
});
