import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';   
import { connect } from 'dva';
import md5 from 'js-md5';
import style from './index.less';
import loginlogo from '@/assets/loginlogo.png';
import { CommonType } from '../data';
interface valType {
  userName: string,
  pwd: string
}
interface IProps extends CommonType {
  
}

const LoginPage:React.FC<IProps> = props=> {
  const onFinish = (values:valType) => {
    props.dispatch({
      type: 'globalmodel/login',
      payload: {
        userName: values.userName,
        pwd: md5(values.pwd)
      }
    })
  }
  const onFinishFailed = ()=> {}
  return (
    <div className={style.root} >
        <div className={style.main}>
          <div className={style.login_logo}>
            <img src={loginlogo} alt="" style={{ width: '100%',height: '100%' }}/>
          </div>
          <div className={style.loginForm}>
            <div className={style.form_cont}>
              <div className={style.title}>
                Hi，您好~
              </div>
              <div className={style.title}>
                MES平台欢迎您
              </div>
              <Form
                  name="basic"
                  layout="inline"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete = "off"
                  style={{ marginTop: 36 }}>
                  <Form.Item
                    label=""
                    name="userName"
                    rules={[{ required: true, message: '请输入用户名!' }]}>
                    <Input prefix={<UserOutlined style={{ color: 'gray',fontSize: '30px' }}/>} placeholder="请输入用户名" style={{ width: '340px', height: '60px', borderRadius: '8px' }}/>
                  </Form.Item>
                  <Form.Item
                    label=""
                    name="pwd"
                    rules={[{ required: true, message: '请输入密码!' }]}>
                    <Input.Password prefix={<LockOutlined style={{ color: 'gray',fontSize: '30px' }}/>} placeholder="请输入密码" style={{ width: '340px', height: '60px', borderRadius: '8px' }}/>
                  </Form.Item>  
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '120px',backgroundColor: '#C66C7F', border: 'none', height: '60px', fontSize: '30px', borderRadius: '8px' }}>登录</Button>
                  </Form.Item>
              </Form>
            </div>
          </div>
          <div className={style.logo}>
            <div>上海羿弓氢能科技有限公司</div>
            <div>Shanghai Winggen Hydrogen Technology Co.,Ltd.</div>
          </div>
        </div>
    </div>
  )
}

export default connect(()=>({}))(LoginPage)
