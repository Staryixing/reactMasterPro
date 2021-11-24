import React, { useContext, useEffect } from 'react';
import styles from './Breadcrumb.less';
import useNavlist from './useNavlist';
import { MyContext } from './context/context';

function BreadcrumbSpide (props){
  const {selcted, setSelected} = useContext(MyContext);
  const [list, setNavList] = useNavlist('0');
  useEffect(()=> {
    setNavList(selcted)
  },[ selcted ])
  return <div className={styles.bread_root}>
    <nav className={styles.bread_nav}>
      {
        list.map(el => {
          return <div key={el.id} className={styles.bread_item}> 
            <span className={styles.bread_title}>{el.name}</span>
            <span className={styles.bread_line}>/</span>
          </div>
        })
      }
    </nav>
    <div className={styles.bread_root_title}>{list[list.length-1]?.name}</div>
  </div>
}

export default BreadcrumbSpide
