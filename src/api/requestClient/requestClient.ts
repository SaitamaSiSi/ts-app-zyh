import type { BaseRequestConfig, ZyhResponse } from '@/api/type/ZyhRequestConfig'
import { refreshTokenApi } from '@/api/core/auth'

class RequestClient {
    private option: BaseRequestConfig = {};

    // 是否正在刷新token
    public isRefreshing = false;
    // 刷新token队列
    public refreshTokenQueue: ((token: string) => void)[] = [];

    constructor(options: BaseRequestConfig = {}) {
        this.option = options
    }

    /**
   * DELETE请求方法
   */
    public delete<T = any>(config: UniApp.RequestOptions): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' });
    }

    /**
     * GET请求方法
     */
    public get<T = any>(config: UniApp.RequestOptions): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' });
    }

    /**
     * POST请求方法
     */
    public post<T = any>(
        config: UniApp.RequestOptions,
        data?: any,
    ): Promise<T> {
        return this.request<T>({ ...config, data, method: 'POST' });
    }

    /**
     * PUT请求方法
     */
    public put<T = any>(
        config: UniApp.RequestOptions,
        data?: any,
    ): Promise<T> {
        return this.request<T>({ ...config, data, method: 'PUT' });
    }

    public formatToken(token: null | string) {
        return token ? `Bearer ${token}` : null;
    }

    private async doRefreshToken(): Promise<string> {
        const res = await refreshTokenApi({
            accessToken: this.formatToken(uni.getStorageSync('accessToken')),
            refreshToken: this.formatToken(uni.getStorageSync('refreshToken')),
        });
        const newAccessToken = res.data.accessToken;
        uni.setStorageSync("accessToken", newAccessToken);
        return newAccessToken
    }

    private async doReAuthenticate() {
        uni.setStorageSync('accessToken', null)
        uni.setStorageSync('refreshToken', null)
        uni.reLaunch({
            url: '/pages/login/index?id=123'
        })
    }

    /**
   * 通用的请求方法
   */
    public async request<T>(config: UniApp.RequestOptions, _isRetryRequest: boolean = false): Promise<T> {
        try {
            const response: ZyhResponse<T> = await this.instance({
                ...config,
            }, _isRetryRequest);
            return response as T;
        } catch (error: any) {
            if (error.statusCode !== 401) {
                return error.errMsg;
            }

            if (_isRetryRequest) {
                await this.doReAuthenticate();
                throw error.response ? error.response.data : error;
            }

            if (this.isRefreshing) {
                return new Promise((resolve) => {
                    this.refreshTokenQueue.push((newToken: string) => {
                        resolve(this.request({ ...config }));
                    });
                });
            }

            // 标记开始刷新 token
            this.isRefreshing = true;
            // 标记当前请求为重试请求，避免无限循环
            _isRetryRequest = true;

            try {
                const newToken = await this.doRefreshToken();

                // 处理队列中的请求
                this.refreshTokenQueue.forEach((callback) => callback(newToken));
                // 清空队列
                this.refreshTokenQueue = [];

                return this.request({ ...config }, _isRetryRequest);
            } catch (refreshError) {
                // 如果刷新 token 失败，处理错误（如强制登出或跳转登录页面）
                this.refreshTokenQueue.forEach((callback) => callback(''));
                this.refreshTokenQueue = [];
                console.error('Refresh token failed, please login again.');
                await this.doReAuthenticate();

                throw refreshError;
            } finally {
                this.isRefreshing = false;
            }
        }
    }

    private instance<T>(config: UniApp.RequestOptions, _isRetryRequest: boolean): Promise<T> {
        return new Promise((resolve, reject) => {
            uni.request({
                url: this.option.baseURL + config.url,
                method: config.method,
                data: config.data,
                header: {
                    'content-type': 'application/json',
                    'Authorization': this.formatToken(uni.getStorageSync('accessToken'))
                },
                success: function (res) {
                    if (res.statusCode === 200) {
                        resolve(res.data as T)
                    } else {
                        reject({
                            _isRetryRequest: _isRetryRequest,
                            ...res
                        })
                    }
                },
                fail: function (err) {
                    reject(err.errMsg)
                },
                complete: function () {
                }
            })
        })
    }

    private UploadFile() {
        uni.uploadFile({
            url: 'http://xxx',
            filePath: "",
            name: 'file',
            formData: {
                'user': 'test'
            },
            success: function (uploadFileRes) {
                console.log(uploadFileRes.data)
            },
            fail: function (err) {
                console.error(err);
            }
        })
    }

    private DownloadFile() {
        uni.downloadFile({
            url: 'http://xxx',
            success: function (res) {
                if (res.statusCode === 200) {
                    uni.saveFile({
                        tempFilePath: res.tempFilePath,
                        success: function (saveRes) {
                            console.log(saveRes.savedFilePath);
                        }
                    })
                }
            },
            fail: function (err) {
                console.error(err);
            }
        })
    }
}

export { RequestClient };