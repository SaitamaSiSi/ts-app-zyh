import { requestClient } from '@/api/request';
import { AuthApi}  from '@/api/type/AuthApi';
import { UserApi}  from '@/api/type/UserApi';

/**
 * 用户信息
 */
export async function UserInfoApi(data: AuthApi.LoginParams) {
  return requestClient.post<UserApi.UserInfo>({url: '/auth/login'}, data);
}

