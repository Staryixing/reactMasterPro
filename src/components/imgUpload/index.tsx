import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FileServer from '@/services/fileService';
import style from './index.less'
import delImg from '@/assets/delete.png';
import Utils from '@/utils/utils';

const { Dragger } = Upload;
type A = string[];
interface IProps {
  imgurl: string[],
  upload: (res:A) => void,
}
const ImgUpload:React.FC<IProps> = props => {
  let [ urlList,setUrlList ] = useState<string[]>([]);
  useEffect(() => {
    setUrlList(props.imgurl) 
  },[props.imgurl])
  const imgProps = {
      showUploadList: false,
      beforeUpload: (file:any) => {
        let formData = new FormData();
        formData.append("file", file);
        FileServer.file({
          params: formData
        }).then(res => {
          let urls:A = Utils.deepCopy(urlList) as [];
          urls.push(res.data);
          setUrlList(urls);
          props.upload(urls);
        }).catch(err => {

        })
          return false;
      }
  };
  const handleDelete = (index: number) => {
    let list = Utils.deepCopy(urlList) as [];
    list.splice(index, 1);
    setUrlList(list);
  }
  return (
    <div className={style.img_cont}>
      {
        urlList.map((el, index) => {
          return <div key={index} className={style.have_img_show}>
            <img src={delImg} alt="" className={style.imgflag} onClick={() => handleDelete(index)}></img>
            <img src={el} alt="" className={style.imgupload}/>
          </div>
        })
      }
      <div className={style.imgupload}>
        <Dragger {...imgProps}>
          <PlusOutlined style={{ fontSize: 50, color: '#d9d9d9' }}/>
        </Dragger>
      </div>
    </div>
  )
}

export default ImgUpload
