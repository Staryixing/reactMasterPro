import React,{useReducer, useState} from "react";
import { Form, Input, Button, Select, Switch, message } from "antd";
import md5 from 'js-md5';
import Table from '@/components/spiderTable/Table';
import Dialog from '@/components/spiderDialog/index';
import Pagination from '@/components/pagination/index';
import dialogReduce from '@/routes/dialogReduce.js';
import { DialogMap } from '@/constants/statusConstants';
import useListRequest from '@/hooks/useListRequest/index';
import UserServer from '@/services/userService';
import { deleteModal } from '@/utils/delete';
import { searchType } from '@/routes/data';
import { listType } from './data';
import style from './index.less';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;
type StateData = { type: string }
interface IProps {

}
interface searchT extends searchType{ 
  
}

type DialogReducer = React.Reducer<any, StateData>;
const UserManage:React.FC<IProps> = props =>{
  const [ searchParam, setSearchParam ] = useState<searchT>({
    pageSize: 10,
    pageNum: 1,
  });
  const [ modalVisiable, setModalVisiable ] = useState<boolean>(false);
  const [ id, setId ] = useState<number>();
  const [ state, dispacth ] = useReducer<DialogReducer>(dialogReduce, {type: 1});
  const [ data, setOption ] = useListRequest(UserServer.fetch);
  const [form] = Form.useForm();
  const colums = [
    {
      title: '账户名称',
      key: 'realName',
      dataIndex: 'realName'
    },{
      title: '登录账号',
      key: 'userName',
      dataIndex: 'userName'
    },{
      title: '角色',
      key: 'roleName',
      dataIndex: 'roleName'
    },{
      title: '操作',
      key: 'oper',
      render: (val:listType) => {
        return (
          <>
            <Switch style={{ marginRight: 10 }} checked={val.active} onChange={(checked)=>handleActive(val )}/>
            <span className="oper_btn" onClick={() => handleEdit(val)}>编辑</span>
            <span className="oper_btn" onClick={() => handleDelete(val)}>删除</span>
          </>
        )
      }
    }
  ]
  const initForm = {
    userName: undefined,
    realName: undefined,
    desc: undefined,
    role: {
      value: undefined,
      label: undefined
    },
    pwd: undefined,
  }
  /**查询分页 start */
  const pageChange = (val: number) => {
    setSearchParam({
      ...searchParam,
      pageNum: val,
    })
    setOption({
      ...searchParam,
      pageNum: val,
    })
  }

  /**新增编辑 start */
  const handleActive = (val:listType) => {
    const ok = async ()=> {
      const res = await UserServer.active({
        params: {
          id: val.id
        }
      })
      if(res?.code === 200) {
        message.success(val.active ? '禁用成功 ': '启用成功')
        setOption(searchParam)
      }
    }
    const cancel = ()=> {}
    deleteModal(ok, cancel, val.active ? '禁用该账户':'启用该账户')
  }
  const handleEdit = (val:listType) => { 
    let values = {
        userName: val.userName,
        realName: val.realName,
        desc: val.desc,
        role: {
          value: val.roleId,
          label: val.roleName
        },
        pwd: "******",
    }
    setId(val.id);
    dispacth({type: 'edit'})
    setModalVisiable(true);
    form.setFieldsValue(values);
  }
  const handleAdd = () => {
    dispacth({type: 'add'})
    setModalVisiable(true);
    form.setFieldsValue(initForm);
  }
  const modalCancel = () =>{
    setModalVisiable(false)
  }
  const modalOk = async () =>{
    try{
      let values = await form.validateFields();
      let params =Object.assign(values, {
          roleId: values.role.value,
      })
      delete params.role
      if(state.type === 1){
        params.pwd = md5(values.pwd)
        let res = await UserServer.add({
          params,
        })
        if(res?.code === 200){
          message.success('新增成功');
          setSearchParam({
            pageNum: 1,
            pageSize: 10,
          })
          setOption({pageNum: 1,
            pageSize: 10,})
        }
      }else if(state.type === 2){
        params.id = id;
        if(params.pwd === '******'){
          delete params.pwd;
        }else {
          params.pwd = md5(params.pwd)
        }
        let res = await UserServer.edit({
          params,
        })
        if(res?.code === 200){
          setSearchParam({
            pageNum: 1,
            pageSize: 10,
          })
          setOption({pageNum: 1,
            pageSize: 10,})
        }
      }
      setModalVisiable(false);
    }catch{

    }
  }
  const onRoleChange = () => {
    
  }
  const handleDelete = (val:listType)=> {
    const ok = async ()=> {
      const res = await UserServer.del({
        params: {
          id: val.id
        }
      })
      if(res?.code === 200) setOption(searchParam)
    }
    const cancel = ()=> {}
    deleteModal(ok, cancel, `删除账户: ${val.realName}`)
  }
  return (
    <div className={style.root}>
      <nav>
        <Button onClick={handleAdd} type="primary"> + 新增</Button>
      </nav> 
      <section style={{ marginTop: 10 }}>
        <Table colums={colums} dataSource={data.list}/>
      </section>
      <footer style={{ marginTop: 10 }}>
        <Pagination total={data.totalPage} onChange={pageChange} current={searchParam.pageNum}></Pagination>
      </footer>
      <Dialog show={modalVisiable} onOk={modalOk} onCancel={modalCancel} title={`${DialogMap.get(state.type)}账户`}>
        <Form {...layout} form={form} name="user" >
          <Form.Item name="realName" label="账户名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="userName" label="登录账号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="pwd" label="账户密码" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="角色"  rules={[{ required: true }]}>
            <Select
              labelInValue
              placeholder="请选择"
              onChange={onRoleChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="desc" label="描述" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Dialog>
    </div>
  )
}

export default UserManage;
