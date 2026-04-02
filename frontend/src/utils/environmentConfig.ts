//@ts-ignore
import { HOST } from "@env";

export interface EnvironmentConfig {
  HOST?: string;
}

console.log({ HOST });
const environmentConfig: EnvironmentConfig = {
  HOST: process.env.REACT_APP_API_URL || "http://localhost:8000",
};

export default environmentConfig;
