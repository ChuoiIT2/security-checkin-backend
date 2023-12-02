export interface IAppConfig {
  port: number;
  apiPrefix: string;
  bcryptSalt: number;
}

export default (): IAppConfig => ({
  port: parseInt(process.env.PORT, 10),
  apiPrefix: process.env.API_PREFIX,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || 10,
});
