import BaseUrl from "@/tool/base-url";
import Common from "@/tool/common";
import axios from "axios";
import Vue from "vue";

axios.defaults.withCredentials = "true";

export default class Axios {

    static #baseUrl;
    static #initPromise = Axios.#init();

    static async #init() {
        Axios.#baseUrl = await BaseUrl.Get();
    }

    static #request(request) {
        return Axios.#initPromise.then(() => {
            request.url = Axios.#baseUrl + request.url;
            return new Promise((resolve, reject) => {
                axios(request).then(res => {
                    if (!res.hasOwnProperty("data")) {
                        Vue.prototype.$Message.error("响应数据必须字段缺失：data");
                        reject(res);
                        return;
                    }
                    if (!res.data.hasOwnProperty("code")) {
                        Vue.prototype.$Message.error("响应数据必须字段缺失：code");
                        reject(res);
                        return;
                    }
                    switch (parseInt(res.data.code)) {
                        case 0:
                            resolve(res.data.data);
                            break;
                        case 1:
                            // 用户级错误码>0，1标识未登录
                            window.location.href = `/user/login?redirect=${encodeURIComponent(window.location.href)}`;
                            Vue.prototype.$Spin.hide();
                            break;
                        default:
                            Vue.prototype.$Message.error(res.data.message + JSON.stringify(res.data.data));
                            Vue.prototype.$Spin.hide();
                            reject(res);
                            break;
                    }
                }).catch(err => {
                    Vue.prototype.$Message.error("网络异常");
                    Vue.prototype.$Spin.hide();
                    reject(err);
                });
            });
        });
    }

    static Get(url, params) {
        return Axios.#request({
            method: Common.METHOD.GET,
            headers: {"Content-Type": Common.CONTENT_TYPE.X_WWW_FORM_URLENCODED},
            url: url,
            params: params,
        });
    }

    static Post(url, data, content_type = Common.CONTENT_TYPE.X_WWW_FORM_URLENCODED) {
        return Axios.#request({
            method: Common.METHOD.POST,
            headers: {"Content-Type": content_type},
            url: url,
            data: (function (data) {
                if (content_type !== Common.CONTENT_TYPE.JSON) {
                    let fd = new FormData();
                    for (let name in data) {
                        fd.append(name, data[name]);
                    }
                    return fd;
                }
                return data;
            })(data),
        });
    }
}
