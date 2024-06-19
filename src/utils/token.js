// 封装和token相关的方法 存、取、删

const TOKENKEY = 'token_key'

function setToken(token) {
    localStorage.setItem(TOKENKEY, token)
}

function getToken() {
    // 调getToken方法得到数据的话，必须使用return
    return localStorage.getItem(TOKENKEY)
}

function removeToken() {
    localStorage.removeItem(TOKENKEY)
}

// 导出
export {
    setToken,
    getToken,
    removeToken
}