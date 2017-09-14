const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CriticalPlugin = require("webpack-plugin-critical").CriticalPlugin;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader:
              "html-loader?minimize=true&conservativeCollapse=false&interpolate=require"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader?idPrefix=true"
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: "style.css" }),
    new FaviconsWebpackPlugin({
      logo: "./gfx/logo/CiTA-rect.svg",
      prefix: "icons/",
      emitStats: false,
      statsFilename: "iconstats.json",
      persistentCache: false,
      inject: true,
      background: "#c1177a",
      title: "CiTA",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/hr.html",
      filename: "hr.html",
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      filename: "index.html",
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/404.html",
      filename: "404.html",
      inject: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      defer: "main.js"
    }),
    new CriticalPlugin({
      src: "index.html",
      inline: true,
      minify: true,
      dest: "index.html"
    },
    {
      src: "hr.html",
      inline: true,
      minify: true,
      dest: "hr.html"
    })
  ]
};
