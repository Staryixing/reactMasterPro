/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-useless-escape */
class BusinessUtils {
  /**
   * 根据path 返回该菜单id
   * @param {*} MUNE 
   * @param {*} path 
   * @returns id
   */
  // static pathToId(MUNE, path){
  //   for (let i = 0; i < MUNE.length; i++) {
  //     // debugger;
  //     if (MUNE[i].path === path) {
  //       return MUNE[i].id;
  //     }
  //     let child = MUNE[i].children;
  //     if (child && child.length > 0) {
  //       return BusinessUtils.pathToId(child, path);
  //     }
  //   }
  // };
  static pathToId(MUNE, path){
    let arr = BusinessUtils.takeMenuArrayfoo(MUNE);
    for(let i = 0; i< arr.length; i++){
      if(arr[i].path === path){
        return arr[i].id
      }
    }
  };
  /**
   * 根据id 返回父id
   * @param {*} MUNE 
   * @param {*} id 
   * @returns 
   */
  static idToParentid(MUNE, id){
    let arr = BusinessUtils.takeMenuArrayfoo(MUNE);
    for(let i=0; i<arr.length; i++){
      if(arr[i].id === id){
        return arr[i].parentId
      }
    }
  }
  /**
   * 返回所有的父级id
   * @param {*} arr 
   * @returns 
   */
  static idToAllParentid(MUNE, id){
    let foo = [];
    let v = BusinessUtils.idToParentid(MUNE, id);
    function cycle (v) {
      if(v){
        foo.push(v)
      }
      if(v !== '0'){
        cycle(BusinessUtils.idToParentid(MUNE, v))
      }
    }
    cycle(v);
    return foo;
  }
  /**
   * 取出所有菜单，包括有子集的一级菜单
   * 返回一维数组
   * @param {*} arr tree结构菜单
   */
  static takeMenuArrayfoo(arr){
    let arr1 = [];
    function foo(arr){
      for(let value of arr){
        arr1.push(value);
        if(value.children && value.children.length > 0){
          let child = value.children;
          foo(child)
        }
      }
    }
    foo(arr)
    return arr1;
  };
  /**
   * 删除checked 为false的菜单和按钮
   * @param {*} arr tree结构菜单
   */
  static filterUnselected(arr){
    function foo(child){  
      let child1 = child.filter(item => {
        return item.checked
      })
      return child1
    }
    function filter(arr){
      arr = foo(arr);
      for(let i=0; i< arr.length; i++){
        let children = arr[i].children;
        if(children && children.length>0){
          arr[i].children = foo(arr[i].children);
          filter(children)
        }else{
          arr[i].opers = foo(arr[i].opers)
        }
      }
      return arr
    }
    let arr1 = filter(arr);
    return arr1
  };
  /**
   * 匹配可以使用的菜单
   * @param {*} menu 接口菜单
   * @param {*} webMenu 本地菜单 为所有子集数组
   */
  static matchRealMenu(menu,webMenu){
    function unit(menu, web){
      for(let k=0; k<menu.length; k++){
        let children = menu[k].children;
        for(let i=0; i<web.length; i++){
          if(menu[k].id === web[i].id){
            menu[k].path = web[i].path;
            menu[k].icon = web[i].icon;
            menu[k].key = menu[k].id;
            menu[k].titleName = menu[k].name;
            menu[k].parentId = web[i].parentId;
          }
        }
        if(children){
          for(let j=0; j<children.length; j++){
              for(let v=0; v<web.length; v++){
                if(children[j].id === web[v].id){
                  children[j].path = web[v].path;
                  children[j].icon = web[v].icon;
                  children[j].key = children[j].id;
                  children[j].titleName =children[j].name;
                }
              }
            }
        }
      } 
    }
    unit(menu, webMenu)
    return menu;
  };
  /**
   * 获取所有有权限的按钮
   * @param {*} menu 接口菜单
   */
  static getOperPermission(menu){
    let arr1 = [];
    function foo (arr){
      for(let i=0; i< arr.length; i++){
        let children = arr[i].children;
        let opers = arr[i].opers;
        if(children && children.length > 0){
          foo(children)
        }else{
          for(let j=0; j<opers.length; j++){
            arr1.push(opers[j].id)
          }
        }
      }
    }
    foo(menu);
    return arr1;
  };
  // V2按钮权限判断
  static verify(component, code){
    if(sessionStorage.getItem('menu')){
      let per = JSON.parse(sessionStorage.getItem('menu'))
      let perIds = this.getOperPermission(per);
      if(perIds.includes(code)){
        return component
      }else{
        return null
      }
    }
  };
}
export default BusinessUtils;
