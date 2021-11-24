import { Modal } from 'antd';

function deleteModal(success, fail, name){
  return (
    Modal.confirm({
      title: `你确认${name}吗?`,
      okText: '确认',
      cancelText: '取消',
      content: '此操作不可恢复！！！',
      onOk: () => {
        success()
      },
      onCancel: ()=> {
        fail()
      }
    })
  )
}

export { deleteModal };