import React, { Fragment, useEffect, useState } from 'react';
import style from './index.less';

interface IProps{
  total: number,
  onChange: (val: number) => void,
  pageSize?: number,
  current?: number,
  showSizeChanger?: false
}

const Pagination: React.FC<IProps> = props => {
  const totalPage = Math.ceil(props.total/(props.pageSize || 10));
  const [ actIndex, setActiveIndex ] = useState<number>(1);
  const [ currentPages, setCurrentPages ] = useState<number[]>([]);
  const [ currentColor1, setCurrentColor1 ] = useState<string>('#ffffff');
  const [ currentColor2, setCurrentColor2 ] = useState<string>('#ffffff');

  useEffect(() => {
    if(actIndex === totalPage){
      setCurrentColor2('gray')
    }else{
      setCurrentColor2('#000000')
    }
    if(actIndex === 1) {
      setCurrentColor1('gray')
    }else{
      setCurrentColor1('#000000')
    }
    if(actIndex < 4){
      setCurrentPages([1,2,3,4,5])
    }else if(actIndex > totalPage - 3){
       setCurrentPages([ totalPage-4,totalPage-3, totalPage-2, totalPage-1, totalPage ])
    }else {
      setCurrentPages([actIndex-2, actIndex-1, actIndex, actIndex+1, actIndex+2 ])
    }
  }, [actIndex, totalPage])

  useEffect(() => {
    props.current && setActiveIndex(props.current)  
  }, [props.current])

  const handleClick = (index: number) => {
    setActiveIndex(index)
    props.onChange(index)
  }
  const nextPage = () => {
    let index:number = actIndex;
    if(actIndex < totalPage){
      index ++ ;
      setActiveIndex(index);
      props.onChange(index);
    }
  }
  const prexPage = () => {
    let index:number = actIndex;
    if(actIndex > 1){
      index -- ;
      setActiveIndex(index);
      props.onChange(index);
    }
  }

  const fiveRender = () => {
    return <Fragment>
       {
         new Array(totalPage).fill(0).map((item, index) => (
            <li className={`${style.pagination_item} ${actIndex === index + 1?style.pagination_item_active: ''}`} 
              onClick={ ()=>handleClick(index + 1) } key={index}>
              {index + 1}
            </li>
          ))
       }
    </Fragment>
  }
  const otherRender = () => (
    <Fragment>
      { actIndex > 3?<li><span onClick={()=> handleClick(1)}>1</span></li>: null }
      { actIndex > 3?<li><span>...</span></li>: null }
      {
        currentPages.map((item, index) => (
          <li className={`${style.pagination_item} ${actIndex === item?style.pagination_item_active: ''}`} 
            onClick={ ()=>handleClick(item) } key={index}>
            {item}
          </li>
        ))
      }
      { actIndex < totalPage-3 ?<li><span>...</span></li>: null}
      { actIndex < totalPage-3 || actIndex === totalPage-3?<li onClick={()=> handleClick(totalPage)}>{totalPage}</li>: null }
    </Fragment>
  )
  return (
    <div className={style.root}>
      <ul>
        {
          totalPage?<li onClick={prexPage}>
            <svg viewBox="0 0 1024 1024" p-id="901" width="16" height="16"><path d="M401.066667 512l302.933333 302.933333-59.733333 59.733334L341.333333 571.733333 281.6 512 341.333333 452.266667l302.933334-302.933334 59.733333 59.733334L401.066667 512z" fill={currentColor1} p-id="902"></path></svg>
          </li>:null
        }        
        {
          totalPage < 6 ? fiveRender() : otherRender()
        }
        {
          totalPage?<li onClick={nextPage}>
            <svg viewBox="0 0 1024 1024" p-id="1047" width="16" height="16"><path d="M622.93333299 512l-302.93333299-302.933333 59.733333-59.73333401L682.666667 452.266667 742.40000001 512 682.666667 571.733333l-302.933334 302.93333401-59.733333-59.73333401L622.93333299 512z" fill={currentColor2} p-id="1048"></path></svg>
          </li>: null
        }
      </ul>
    </div>
  )
}

export default Pagination
