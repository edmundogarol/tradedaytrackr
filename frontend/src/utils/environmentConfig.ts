//@ts-ignore
// import { HOST } from "@env";

export interface EnvironmentConfig {
  HOST?: string;
}

// console.log({ HOST });
const environmentConfig: EnvironmentConfig = {
  HOST: "http://localhost:8000",
};

export default environmentConfig;
