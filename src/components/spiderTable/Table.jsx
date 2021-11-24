import { useEffect, useState } from "react";
import style from "./index.less";
import Utils from "@/utils/utils";

function Table(props) {
  const [rowAllSelect, setRowAllSelect] = useState(false);
  const [dataList, setDataList] = useState(props.dataSource);
  const [realColums, setRealColums] = useState(props.colums);

  useEffect(() => {
    setDataList(props.dataSource);
  }, [props.dataSource]);

  function allSelectChange(e) {
    let value = e.target.checked;
    setRowAllSelect(value);
    dataList.forEach((el) => {
      el.checked = value;
    });
    setDataList(dataList);
  }

  function selectChange(e, index) {
    let value = e.target.checked;
    dataList[index].checked = value;
    setDataList(JSON.parse(JSON.stringify(dataList)));
  }

  function sorterFn(key) {
    let foo = dataList.sort((a, b) => {
      return a[key] - b[key];
    });
    setDataList(JSON.parse(JSON.stringify(foo)));
  }
  function handleChoose(e, item, index) {
    let value = e.target.checked;
    if (value) {
      realColums.splice(index, 0, item);
      setRealColums(Utils.deepCopy(realColums));
    } else {
      let foo = realColums.filter((el) => {
        return el.key !== item.key;
      });
      setRealColums(foo);
    }
  }
  return (
    <div className={style.table_root}>
      {/* <div className={style.table_root_colums}>
        {props.colums.map((el, index) => {
          return (
            <label key={el.key}>
              <input
                type="checkbox"
                defaultChecked={true}
                onChange={(e) => handleChoose(e, el, index)}
              />
              {el.title}
            </label>
          );
        })}
      </div> */}
      <table style={{ width: '100%' }}>
        <thead>
          <tr className={style.spider_table_thead_tr}>
            {props.rowSelection ? (
              <th>
                <div style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    checked={rowAllSelect}
                    onChange={allSelectChange}
                  />
                </div>
              </th>
            ) : null}
            {realColums.map((item) => {
              return (
                <th align="left" key={item.key}>
                  {item.sorter ? (
                    <span onClick={() => sorterFn(item.key)}></span>
                  ) : null}
                  {item.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataList.map((el, index) => {
            return (
              <tr key={index} className={style.spider_table_tbody_tr}>
                {props.rowSelection ? (
                  <td>
                    <input
                      type="checkbox"
                      checked={el.checked}
                      onChange={(e) => selectChange(e, index)}
                    />{" "}
                  </td>
                ) : null}
                {realColums.map((v, index) => {
                  return (
                    <td key={index}>
                      {v.dataIndex ? (
                        <div>{el[v.dataIndex]}</div>
                      ) : (
                        <div> {v.render(el)} </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
