import { request } from "@/utils";

// 1、获取频道列表
export function getChannelAPI() {
    // axios 通用写法
    return request({
        url: '/channels',
        method: 'GET'
    })
}