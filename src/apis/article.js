import { request } from "@/utils";

// 1、获取频道列表
export function getChannelAPI() {
    // axios 通用写法
    return request({
        url: '/channels',
        method: 'GET'
    })
}

// 2、创建文章
export function createArticleAPI(data) {
    // axios 通用写法
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

// 3、获取文章列表
export function getArticleAPI(params) {
    // axios 通用写法
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}