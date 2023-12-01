export interface IAppConfig {
  port: number;
  apiPrefix: string;
}

export default (): IAppConfig => ({
  port: parseInt(process.env.PORT, 10),
  apiPrefix: process.env.API_PREFIX,
});
