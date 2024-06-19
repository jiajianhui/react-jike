// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

// 导入token相关方法
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: 'user',

    // 数据状态
    initialState: {
        // 初始化时，如果localStorage中有数据，就使用该数据，否则为空字符串
        token: getToken() || ''
    },

    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload

            // 在localStorage中存一份
            _setToken(action.payload)
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