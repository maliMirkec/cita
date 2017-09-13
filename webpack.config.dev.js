const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader?minimize=true&conservativeCollapse=false&interpolate=require"
        }]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [{
          loader: "svg-inline-loader?idPrefix=true"
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/templates/hr.html",
      filename: "hr.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/404.html",
      filename: "404.html"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "/dist/"),
    port: 2309
  }
};
