import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

// 导入富文本输入框相关文件
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getChannelAPI } from '@/apis/article'


const { Option } = Select

const Publish = () => {

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

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">

            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>发布文章</Breadcrumb.Item>

          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
        >

          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          {/* 频道 */}
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>

                {/* 渲染数据 */}
                {/* value属性——用户选中之后，会自动收集起来作为接口的提交字段 */}
              {channelList.map(item => <Option key={item.id} value={item.id}> {item.name} </Option>)}
            </Select>
          </Form.Item>

          {/* 封面 */}
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
            className="publish-quill"
            theme="snow"
            placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>

        </Form>
      </Card>
    </div>
  )
}

export default Publish