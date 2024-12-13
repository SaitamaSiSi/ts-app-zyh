import { requestClient } from '@/api/request';
import type { AuthApi } from '@/api/type/AuthApi';

/**
 * 登录
 */
export async function AuthLoginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>({ url: '/auth/login' }, data);
}

export async function refreshTokenApi(data: object) {
  return requestClient.post<any>({ url: '/auth/refresh' }, data);
}

