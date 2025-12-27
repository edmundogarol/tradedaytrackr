import path from "path";
import type { Configuration } from "webpack";

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
    path: path.resolve(__dirname, "../backend/static/frontend"),
    publicPath: "/static/frontend/",
    clean: true,
  },
  plugins: [],
};

export default config;
