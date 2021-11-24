import React,{Fragment, useEffect} from 'react';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { FormInstance } from 'antd/lib/form';
import { Form,Input, Select, DatePicker, Button } from 'antd';
import { CommonType } from '../../routes/data';
import style from './index.less';
const { Option } = Select;
const { RangePicker } = DatePicker;
interface optionType {
  text: string,
  id: string
}
interface dataType {
  label:string,
  code: string,
  type: string,
  initValue?: string,
  initValue2?:string,
  optionsList?: optionType[],
  optionsList2?: optionType[],
}
interface IProps extends CommonType {
  ok: (val: any)=> void,
  cancle?: () => void,
  dataSource: dataType[],
  handleChange?:(val: number) => void
}
const SearchCom:React.FC<IProps>=props=> {
  const searchForm:React.RefObject<FormInstance> = React.createRef();
  // 获取该设备下可用变量
  useEffect(() => {
    
  },[])
  const handleOk = async ()=> {
    try{
      if(searchForm.current){
        let values = await searchForm.current.validateFields(); 
        if(values['startTime']){
          values['startTime'] = values['startTime'].map((v: { format: (arg0: string) => string; }) => v.format('YYYY-MM-DD HH:mm:ss'))
        }
        
        // 工单编号赋初始值
        props.ok(values)
      }
    }catch{

    }
  }
  // 重置
  const handleCancel =()=> {
    props.cancle && props.cancle()
    if(searchForm.current){
      searchForm.current.resetFields()
    }
    props.dispatch({
      type: 'devicemodal/setDefaultDevice',
      payload: null,
    })
  }

  return <div className={style.root}>
      <Form ref={searchForm}>
        <div className={style.main}>
          <div className={style.search_input}>
              {
                props.dataSource.map((item, index) => {
                  if(item.type === 'input'){
                    return <Form.Item label={item.label} name={item.code} style={{ minWidth: 240,marginLeft: 10 }} key={index}>
                      <Input placeholder="请输入" autoComplete="off" />
                    </Form.Item>
                  }else if(item.type === 'select'){
                    return <Form.Item label={item.label} name={item.code} style={{ minWidth: 240,marginLeft: 10 }} key={index}>
                      <Select placeholder="请选择" >
                        {
                          item.optionsList && item.optionsList.map(v => (
                            <Option value={v.id} key={v.id}>{v.text}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>
                  }else if(item.type === 'date'){
                    return <Form.Item label={item.label} name={item.code} style={{ minWidth: 500,marginLeft: 10 }} key={index}>
                      <RangePicker showTime locale={locale} format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                  }else if(item.type ===  'time'){
                    return <Form.Item label={item.label} name={item.code} style={{ minWidth: 400,marginLeft: 10 }} key={index}>
                      <RangePicker locale={locale} format="YYYY-MM-DD" />
                    </Form.Item>
                  } 
                })
              }
          </div>
          <div className={style.searct_btn}>
            <Button onClick={handleOk} type="primary" style={{ marginRight: 10, marginLeft: 10 }}>查询</Button>
            <Button onClick={handleCancel}>重置</Button>
          </div>
        </div>
      </Form>
  </div>
}

export default connect(() => ({}))(SearchCom) 
