// 统一中转模块——utils中后续会有多个模块，其他页面导入时，只需导入index.js即可

import { request } from "./request";
import { setToken, getToken, removeToken } from "./token";

export {
    request,
    setToken, 
    getToken, 
    removeToken
}