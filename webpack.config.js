const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

module.exports = {
  mode: "development",

  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  resolve: {
    alias: {
      "@scripts": path.join(__dirname, "src/js"),
      "@styles": path.join(__dirname, "src/css"),
      "@images": path.join(__dirname, "src/assets/images"),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      // path to templates
      entry: "src/",
      js: {
        // output filename for JS
        filename: "js/[name].[contenthash:8].js",
      },
      css: {
        // output filename for CSS
        filename: "css/[name].[contenthash:8].css",
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\\src\\assets\\*/i,
        type: "asset/resource",
        generator: {
          // save assets to file
          filename: (pathData, assetInfo) => {
            const path = pathData.filename;
            const pathParts = path.split("/");
            const newPath = pathParts.slice(1, -1).join("/") + "/";
            return `${newPath}[name].[hash:8][ext]`;
          },
        },
      },
    ],
  },

  devServer: {
    static: path.resolve(__dirname, "dist"),
    watchFiles: {
      paths: ["src/*"],
      options: {
        usePolling: true,
      },
    },
    port: 5600,
  },
};
