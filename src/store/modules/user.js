// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

const userStore = createSlice({
    name: 'user',

    // 数据状态
    initialState: {
        token: ''
    },

    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    }
})


// 解构出actionCreater
const {setToken} = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer



// 异步方法 完成登陆获取token
const fetchLogin = (formData) => {
    return async (dispatch) => {
        // 1、发送异步请求
        const res = await request.post('/authorizations', formData)

        // 2、提交同步action进行token的存入
        dispatch(setToken(res.data.token))

    }
}




// 导出
export {setToken, fetchLogin}
export default userReducer