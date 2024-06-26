import { request } from "@/utils"
import { useEffect } from "react"

const Layout = () => {

    // 测试token是否注入
    useEffect(() => {
        request.get('/user/profile')
    })

    return <div>Layout</div>
}

export default Layout