import { useState, useEffect } from 'react';

interface listType {
  totalPage: number,
  list: any[],
}

function useListRequest<T>(requestFn:any):any{
  let [options, setOptions] = useState({
    pageNum: 1,
    pageSize: 10,
  }) // 传入的参数
  let [data, setData] = useState<listType>({
    totalPage: 0,
    list: []
  }); // 传出的数据

  async function fetchData (){
    // const res = await requestFn({params: options })
    // if(res?.code === 200 ){
    //   if(Array.isArray(res.data.rows)){
    //       res.data.rows.forEach((item:any) => item.key = item.id);
    //       setData({
    //         totalPage: res.data.total,
    //         list: res.data.rows
    //       });
    //     }
    // }
  }

  useEffect(() => {
    fetchData()
  }, [ options ])
  return [data, setOptions ]
}

export default useListRequest;
