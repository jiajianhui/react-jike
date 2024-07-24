
// 导入组件
import { AuthRoute } from "@/components/AuthRoute";
import Article from "@/pages/Article";
// import Home from "@/pages/Home";
// import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
// import Publish from "@/pages/Publish";
import { lazy, Suspense } from "react";

// 配置路由实例
import { createBrowserRouter } from "react-router-dom";

// 路由懒加载
// 1、使用lazy函数对组件进行导入
const Home = lazy(() => import('@/pages/Home'))
const Layout = lazy(() => import('@/pages/Layout'))
const Publish = lazy(() => import('@/pages/Publish'))

// 2、





const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute> <Layout /> </AuthRoute>,

        // 二级路由
        children: [
            {
                index: true,
                element: <Suspense fallback={'加载中'}> <Home /> </Suspense>
            },
            {
                path: '/article',
                element: <Suspense fallback={'加载中'}> <Article /> </Suspense>
            },
            {
                path: '/publish',
                element: <Suspense fallback={'加载中'}> <Publish /> </Suspense>
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