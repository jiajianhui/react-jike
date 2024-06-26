
// 导入组件
import { AuthRoute } from "@/components/AuthRoute";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";



// 配置路由实例
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute> <Layout /> </AuthRoute>
    },
    {
        path: '/login',
        element: <Login />
    }
])

// 导出路由实例
export default router