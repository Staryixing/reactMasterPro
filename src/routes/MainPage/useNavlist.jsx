import { useState, useEffect } from "react";
import { routersConfig } from '@/constants/routerConstants.js';
import utils from "@/utils/utils";
/**
 * 在一次hooks中传入的参数
 * @param {*} params
 * @returns
 */
// 根据id 获取她的name，及所有父级， 并返回json数组
// options 为每次调用传入的id
function useNavlist(params) {
  // 在原useState中传过来的值
  const [options, setOptions] = useState("0");
  // 现在传出去的值
  const [data, setData] = useState([]);

  useEffect(() => {
    function getAllList(arr) {
      let arr1 = [];
      function foo(arr) {
        for (let value of arr) {
          arr1.push(value);
          if (value.children && value.children.length > 0) {
            let child = value.children;
            foo(child);
          }
        }
      }
      foo(arr);
      return arr1;
    }
    function deWeight(arr, name) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i][name] === arr[j][name]) {
            arr[i].repeat ? (arr[i].repeat += 1) : (arr[i].repeat = 1);
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    }
    function realList(id, arr) {
      let arr1 = [];
      function foo(id) {
        for (let val of arr) {
          if (val.id === id) {
            arr1.push(val);
            let parentId = val.parentId;
            if (parentId !== "0") {
              for (let el of arr) {
                if (el.id === parentId) {
                  arr1.push(el);
                }
              }
              foo(parentId);
            }
          }
        }
      }
      foo(options);
      // 需要对arr1去重
      let arr2 = deWeight(arr1, "name");
      return arr2;
    }
    let arr = realList(options, getAllList(routersConfig)).reverse();
    setData( utils.deepCopy(arr));
  }, [params, options]);
  return [data, setOptions];
}

export default useNavlist;
