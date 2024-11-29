export namespace UserApi {
    /** 用户接口用户参数 */
    export interface UserInfo {
        avatar: string;
        realName: string;
        userId: string;
        username: string;
        roles: Array<string>;
    }
}

