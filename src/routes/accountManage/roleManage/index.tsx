import React, { useState } from "react";
import { Button } from "antd";
import style from './index.less';
import Animation from '@/components/animation/index';
interface IProps {
  
}

const RoleManage:React.FC<IProps> = props =>{
  const [isShow, setIsShow] = useState(false);

  const handleAdd = () => {
    setIsShow(!isShow);
  }
  return (
    <div className={style.root}>
      <div>
        <Button onClick={handleAdd}>新增角色</Button>
        <Animation isShow={isShow} name="demo">
            <div className="demo">demo</div>
        </Animation>
      </div> 
    </div>
  )
}

export default RoleManage;
