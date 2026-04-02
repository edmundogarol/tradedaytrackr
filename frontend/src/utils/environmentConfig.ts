//@ts-ignore

export interface EnvironmentConfig {
  HOST?: string;
}

const environmentConfig: EnvironmentConfig = {
  HOST: process.env.REACT_APP_API_URL || "http://localhost:8000",
};

export default environmentConfig;
