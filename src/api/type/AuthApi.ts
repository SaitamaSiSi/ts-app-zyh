export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password: string;
    username: string;
    withCredentials: boolean;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
    desc: string;
    realName: string;
    userId: string;
    username: string;
  }
}

