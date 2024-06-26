
// 导入组件
import { AuthRoute } from "@/components/AuthRoute";
import Article from "@/pages/Article";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Publish from "@/pages/Publish";



// 配置路由实例
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute> <Layout /> </AuthRoute>,

        // 二级路由
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/article',
                element: <Article />
            },
            {
                path: '/publish',
                element: <Publish />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

// 导出路由实例
export default router