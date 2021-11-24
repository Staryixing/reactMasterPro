import { useCallback, useContext,useEffect,useState } from "react";
import style from "./index.less";
import { routersConfig } from "@/constants/routerConstants.js";
import { MyContext } from './context/context.js';
import BusinessUtils from '@/utils/businessUtils';

function MenuCom(props) {
  const { selcted, setSelected } = useContext(MyContext);
  const [ open, setOpen ] = useState([]);
  const [ choosed, setChoosed ] = useState('');
  useEffect(() => {
    let all = BusinessUtils.idToAllParentid(routersConfig, selcted);
    setOpen(all);
    setChoosed(selcted)
  },[selcted]);

  const openChange = (e,item) => {
    e.stopPropagation(item);

    let openArr = [...open];
    if(openArr.includes(item.id)){
      let index = openArr.findIndex(function(value, index, arr){      
        return value === item.id;
      })
      openArr.splice(index, 1);
      setOpen(openArr);
    }else{
      let all = BusinessUtils.idToAllParentid(routersConfig, item.id);
      let foo = [...all,item.id];
      setOpen(foo);
    }
    if(item.path) {
      props.pathTo(item);
      setChoosed(item.id);
      setSelected(item.id);
    }
  };
  const chooseChange = (e, v) => {
    e.stopPropagation();
    setChoosed(v.id);
    setSelected(v.id);
    props.pathTo(v);
  };

  // 没有子级的菜单
  const Item = useCallback( 
    (item) => {
      return <li onClick={(e) => chooseChange(e, item)} className={`${choosed === item.id ? style.menu_item_active : style.menu_item}`} style={{ paddingLeft: item.deep*20 }}>
        {item.name}
      </li>
    },[choosed]
  )

  // 有子级的菜单
  const SubItem = useCallback(
    (item) => {
      return <div key={item.id}>
        <div onClick={(e) => openChange(e,item)} className={`${style.menu_sub_title}`} style={{ paddingLeft: item.deep*20 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img  src={item.url} alt="" style={{ width: 16, height: 16, marginRight: 12 }}/>
            <span>{item.name}</span>
          </div>
          <span style={{ lineHeight: 1,paddingRight: 20 }}>
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2476" width="16" height="16"><path d="M512.726547 675.318646c-8.063653 0-15.790638-3.245927-21.435195-9.006118L231.175103 400.906809c-11.603269-11.837606-11.410887-30.840402 0.427742-42.442648 11.837606-11.601222 30.841426-11.410887 42.442648 0.427742l238.681054 243.534596L751.407602 358.891903c11.601222-11.839653 30.602995-12.033058 42.442648-0.427742 11.839653 11.603269 12.031011 30.605042 0.427742 42.442648L534.161742 666.312528C528.517185 672.072719 520.791224 675.318646 512.726547 675.318646z" p-id="2477" fill="#ffffff"></path></svg>
          </span>
        </div>
        <ul className={`${style.menu_sub} ${open.includes(item.id) ? style.menu_sub_active : style.menu_sub_hidden}`}>
          {
            subSubItem(item.children)
          }
        </ul>
      </div>
    }, [ open, choosed ]
  )

  const subSubItem = (arr)=> {
    return arr.map(v => {
      let children = v.children;
      if(children){
        return (
          <div key={v.id}>
            <div onClick={(e) => openChange(e,v)} className={style.menu_sub_title} style={{ paddingLeft: v.deep*20 }}>
              <span>{v.name}</span>
              <span style={{ lineHeight: 1,paddingRight: 20 }}>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2476" width="16" height="16"><path d="M512.726547 675.318646c-8.063653 0-15.790638-3.245927-21.435195-9.006118L231.175103 400.906809c-11.603269-11.837606-11.410887-30.840402 0.427742-42.442648 11.837606-11.601222 30.841426-11.410887 42.442648 0.427742l238.681054 243.534596L751.407602 358.891903c11.601222-11.839653 30.602995-12.033058 42.442648-0.427742 11.839653 11.603269 12.031011 30.605042 0.427742 42.442648L534.161742 666.312528C528.517185 672.072719 520.791224 675.318646 512.726547 675.318646z" p-id="2477" fill="#ffffff"></path></svg>
              </span>
            </div>
            <ul className={`${style.menu_sub} ${open.includes(v.id) ? style.menu_sub_active : style.menu_sub_hidden}`}>
              {
                subSubItem(v.children)
              }
            </ul>
          </div>
        )
      }else{
        return <li key={v.id} onClick={(e) => chooseChange(e, v)} className={`${choosed === v.id ? style.menu_sub_item_active : style.menu_sub_item}`} style={{ paddingLeft: v.deep*20 }}>{v.name}</li>
      }
    })
  }
  return (
    <div>
      <ul>
        {routersConfig.map(item => {
          if(item.children){
            return SubItem(item)
          }else{
            return Item(item)
          }
        })}
      </ul>
    </div>
  )
}

export default MenuCom;
