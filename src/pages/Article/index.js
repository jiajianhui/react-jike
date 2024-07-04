import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
// import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
// import './index.scss'

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { useChannel } from '@/hooks/useChannel'

import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { getArticleAPI } from '@/apis/article'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {

    // 状态枚举
    const status = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="green">审核通过</Tag>
    }

    // 列数据
      const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]  //通过中括号取值，将data当作一个key传入
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]

  const data = [
      {
          id: '8218',
          comment_count: 0,
          cover: {
            images:[],
          },
          like_count: 0,
          pubdate: '2019-03-11 09:00:00',
          read_count: 2,
          status: 2,
          title: 'wkwebview离线化加载h5资源解决方案' 
      }
  ]

    // 频道列表数据-——调用函数，然后解构出需要的数据
    const {channelList} = useChannel()

    // 获取文章列表、文章总数
    const [articleList, setArticleList] = useState([])
    const [articleCount, setArticleCount] = useState(0)
    useEffect(() => {
        async function getArticleList() {
            const res = await getArticleAPI()
            setArticleList(res.data.results)
            setArticleCount(res.data.total_count)
        }
        getArticleList()
    }, [])
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
                {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
              
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

        {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${articleCount} 条结果：`}>
        {/* columns用来渲染列；dataSource渲染列表数据 */}
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
      
    </div>
  )
}

export default Article