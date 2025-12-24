import path from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  mode: "development",
  entry: path.resolve(process.cwd(), "./src/index.tsx"),
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../backend/static/frontend"),
    publicPath: "/static/frontend/",
    clean: true,
  },
  plugins: [],
};

export default config;
