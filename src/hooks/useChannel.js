// 获取频道列表数据

import { getChannelAPI } from "@/apis/article"
import { useState, useEffect } from "react"

function useChannel() {
    // 准备频道列表数据
    const [channelList, setChannelList] = useState([])

    // 获取频道列表数据
    useEffect(() => {
        const getChannelList = async () => {
            // 1、调用接口函数
            const res = await getChannelAPI()

            // 2、存入useState
            setChannelList(res.data.channels)
        }

        // 3、调用函数
        getChannelList()

    }, [])

    return {channelList}
}

export {useChannel}