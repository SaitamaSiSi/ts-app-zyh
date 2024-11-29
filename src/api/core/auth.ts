import { requestClient } from '@/api/request';
import { AuthApi}  from '@/api/type/AuthApi';

/**
 * 登录
 */
export async function AuthLoginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>({url: '/auth/login'}, data);
}


