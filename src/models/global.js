/* eslint-disable import/no-anonymous-default-export */
import LoginServer from '@/services/loginService';
import { routerRedux } from 'dva/router';
import BusinessUtils from '@/utils/businessUtils';
import { routersConfig } from '@/constants/routerConstants';

export default {
  namespace: "globalmodel",
  state: {
    collapsed: "1",
  },
  subscriptions: {
    setup({dispatch, history}){

    }
  },
  effects: {
    *login({payload, callback},{call,put}){
        const res = yield LoginServer.login({params: payload})
        if(res?.code === 200){
          let userInfo = {
            admin: res.data.admin,
            avatar: res.data.avatar,
            realName: res.data.realName,
            roleId: res.data.roleId,
            token: res.data.token,
            userId: res.data.userId,   
            platform: res.data.platform
          };
          /**
           * 1、根据data的resources数据获取左侧菜单栏(根据id获取路由路径、删掉没有权限的菜单和按钮)
           * 2、根据data的platform 判断该用户属于平台还是企业
           * 3、根据data的userInfo 存储用户信息
           */
          sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
          // 取出所有菜单
          let webmenu = BusinessUtils.takeMenuArrayfoo(routersConfig);
          // 过滤没有权限的菜单与按钮
          let resources = res.data.resources;
          // let resources = simulationLoginMenu;
          if(resources && Array.isArray(resources)){
            let menu = BusinessUtils.filterUnselected(resources);
            // 匹配真实的菜单
            let realMenu = BusinessUtils.matchRealMenu(menu,webmenu)
            // 获取有权限的按钮
            sessionStorage.setItem('menu', JSON.stringify(realMenu))
          }
          yield put(routerRedux.push('/home/user'))
        }
    },
    *logout({payload},{call,put }){
        yield LoginServer.logout({})
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('subscribe')
        sessionStorage.removeItem('menu')
        yield put(routerRedux.push('/'))
    }
  },

  reducers: {},
};
