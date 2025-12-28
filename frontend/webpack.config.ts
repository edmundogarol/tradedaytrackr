import path from "path";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: WebpackConfiguration & {
  devServer?: DevServerConfiguration;
} = {
  mode: "development",
  entry: path.resolve(process.cwd(), "./src/index.tsx"),
  devtool: "cheap-module-source-map",

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
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "./"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss", ".css"],
    alias: {
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@interfaces": path.resolve(__dirname, "src/interfaces/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@navigation": path.resolve(__dirname, "src/navigation/"),
      "@redux": path.resolve(__dirname, "src/redux/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
    },
  },
  output: {
    filename: "bundle.js",
    publicPath: "http://localhost:3000/",
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};

export default config;
