import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

// 导入富文本输入框相关文件
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'


const { Option } = Select

const Publish = () => {

    // 频道列表数据-——调用函数，然后解构出需要的数据
    const {channelList} = useChannel()

    // 提交函数
    const onFinish = (formData) => {
        console.log(formData);
        const {title, content, channel_id} = formData

        // 校验——如果单选框类型与图片数量不一致就弹窗提示
        if (radioValue !== imageList.length) {
            return message.warning('单选框类型与图片数量不一致!')
        }

        // 1、按接口文档格式处理收集到的表单数据
        const reqData = {
            title,
            content,
            cover: {
                type: radioValue,  //单选框类型
                imges: imageList.map(item => item.response.data.url)  //图片列表
            },
            channel_id
        }

        // 2、调用接口提交
        createArticleAPI(reqData)
    }

    // 将上传的图片存起来
    const [imageList, setImageList] = useState([])
    // 上传过程中不断执行回调
    const onChange = (value) => {
        console.log(1, value);
        setImageList(value.fileList)
        // console.log(imageList);
    }

    // 将单选框对应的值存起来
    const [radioValue, setRadioValue] = useState(0)
    // 点击单选框时，自动执行的回调
    const onTypeChange = (e) => {
        // console.log(e);
        setRadioValue(e.target.value)
    }

    // 数据回填
    // --1、获取路由参数上的id
    const [searchParama] = useSearchParams()  //searchParama是一个对象，里面有get方法，可以得到id
    const articleId = searchParama.get('id')
    // console.log(articleId);
    // --2、获取form组件的实例
    const [form] = Form.useForm()
    useEffect(() => {
      // 1、通过id获取数据
      async function getArticleDetail() {
        const res = await getArticleById(articleId)

        // 2、调用form实例方法，回填数据
        form.setFieldsValue(res.data)
      }

      getArticleDetail()

    }, [articleId, form])

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
          initialValues={{ type: 0 }}  //控制表单里面的初始值；这里的type对应的是 <Form.Item name="type">
          onFinish={onFinish}
          form={form}
        >

          {/* 面包屑 */}
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
              <Radio.Group onChange={onTypeChange}>

                {/* 下面的value的值不是随意定义的，是根据后端接口来的 */}
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            {/* 
                listType——决定选择文件框的外观样式
                showUploadList——控制显示上传列表
            */}
            {radioValue > 0 && 
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList

                  action="http://geek.itheima.net/v1_0/upload"  //上传地址
                  name="image"  //上传的接口字段；有接口文档提供 
                  onChange={onChange}  //上传过程中会不断的触发这个回调函数
                  maxCount={radioValue}  //控制上传数量
                >
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
              </Upload>
            }
            
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