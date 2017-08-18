const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const DEBUG = process.env.NODE_ENV === "development";
const extractCritical = new ExtractTextPlugin({
  filename: "critical.css",
  disable: DEBUG
});
const extractStyle = new ExtractTextPlugin({
  filename: "style.css",
  disable: DEBUG
});
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin");

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
        test: /critical.scss/,
        use: extractCritical.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /style.scss/,
        use: extractStyle.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
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
    extractCritical,
    extractStyle,
    new StyleExtHtmlWebpackPlugin(DEBUG ? false : "critical.css"),
    new StyleExtHtmlWebpackPlugin(DEBUG ? false : "style.css"),
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
      excludeAssets: DEBUG ? /style.css/ : [/style.css/, /main.js/]
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      filename: "index.html",
      excludeAssets: DEBUG ? /style.css/ : [/style.css/, /main.js/]
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/404.html",
      filename: "404.html",
      excludeAssets: DEBUG ? /style.css/ : [/style.css/, /main.js/]
    }),
    new ScriptExtHtmlWebpackPlugin(
      DEBUG
        ? false
        : {
            defer: "main.js"
          }
    ),
    new HtmlWebpackExcludeAssetsPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "/dist/"),
    port: 2309
  }
};
