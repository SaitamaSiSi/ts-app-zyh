import { BaseRequestConfig, ZyhResponse } from '@/api/type/ZyhRequestConfig'

class RequestClient {
    private option: BaseRequestConfig = {};

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

    /**
   * 通用的请求方法
   */
    public async request<T>(config: UniApp.RequestOptions): Promise<T> {
        try {
            const response: ZyhResponse<T> = await this.instance({
                ...config,
            });
            return response as T;
        } catch (error: any) {
            throw error.response ? error.response.data : error;
        }
    }

    private instance<T>(config: UniApp.RequestOptions): Promise<T> {
        return new Promise((resolve, reject) => {
            uni.request({
                url: this.option.baseURL + config.url,
                method: config.method,
                data: config.data,
                header: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer token'
                },
                success: function (res) {
                    if (res.statusCode === 200) {
                        resolve(res.data as T)
                    } else {
                        reject(res.errMsg)
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