import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Route, Switch, Redirect } from "dva/router";
import { connect } from "dva";
import { Menu, Dropdown } from "antd";
import MenuCom from "./Menu";
import BreadcrumbSpide from "./Breadcrumb";
import style from "./index.less";
import { MyContext } from "./context/context";
import { routersConfig } from "@/constants/routerConstants.js";
import utils from "@/utils/utils";
import BusinessUtils from "@/utils/businessUtils";
import logo from "@/assets/logo.png";
import TimerCom from "@/components/timerCom/index";
import Socket from "@/utils/socket";
import omitEvent from "@/utils/Event";

const UserManage = React.lazy(() =>
  import("@/routes/accountManage/userManage/index")
);
const RoleManage = React.lazy(() =>
  import("@/routes/accountManage/roleManage/index.tsx")
);

function Mainpage(props) {
  const [selcted, setSelected] = useState("01");
  const [userName, setUserTime] = useState("用户名");

  useLayoutEffect(() => {
    let path = utils.urlPath(window.location.hash);
    let foo = BusinessUtils.pathToId(routersConfig, path);
    setSelected(foo);
  }, []);
  useEffect(() => {
    let ws;
    if (sessionStorage.getItem("userInfo")) {
      let userName = JSON.parse(sessionStorage.getItem("userInfo")).realName;
      let clientId = JSON.parse(sessionStorage.getItem("userInfo")).token;
      setUserTime(userName);
      ws = new Socket({
        clientId: clientId,
        onopenFn: () => {
          global.WS = ws;
        },
        ondataFn: (data) => {
          if (data) {
            // 收到条形码
            if (data.data?.type === 1) {
              omitEvent.emit("scan_process_bar");
              props.dispatch({
                type: "socketmodal/setCode",
                payload: {
                  code: "14785232477",
                  productType: "type1",
                  partType: "name1",
                },
              });
            }
            // 收到校验的SN
            if (data.data?.type === 2) {
              props.dispatch({
                type: "socketmodal/setSn",
                payload: {
                  realSn: "160E03AB10211",
                  snSuccess: true,
                },
              });
            }
          }
        },
      });
    }
    return () => {
      clearTimeout(ws);
    };
  }, []);

  function jumpto(val) {
    props.history.push(val.path);
  }
  function logout() {
    props.dispatch({
      type: "globalmodel/logout",
    });
  }
  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <div className={style.root}>
      <MyContext.Provider
        value={{
          selcted: selcted,
          setSelected: setSelected,
        }}
      >
        <aside className={style.aside}>
          <header className={style.header}>
            <img
              src={logo}
              alt=""
              style={{ width: 40, height: 40, marginRight: 20 }}
            />
            <span>Wingbow MES</span>
          </header>
          <ul className={style.menu_root}>
            <MenuCom pathTo={jumpto} />
          </ul>
        </aside>
        <main className={style.main}>
          <section className={style.main_root}>
            <nav className={style.main_root_header}>
              <div className={style.main_root_user}>
                <TimerCom />
                <div style={{ marginLeft: 20, display: "flex" }}>
                  <div className={style.image}></div>
                  <Dropdown overlay={menu} overlayClassName="andt_dropdown">
                    <div className={style.userCont} placement="bottomCenter">
                      <span>{userName}</span>
                    </div>
                  </Dropdown>
                </div>
              </div>
            </nav>
            <nav className={style.main_root_nav}>
              <BreadcrumbSpide />
            </nav>
            <div className={style.main_root_cont}>
              <Suspense
                fallback={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    正在加载中...
                  </div>
                }
              >
                <Switch>
                  <Route
                    path="/home/role"
                    render={(props) => <RoleManage {...props} />}
                  />
                  <Route
                    path="/home/user"
                    render={(props) => <UserManage {...props} />}
                  />
                  <Redirect to="/home/user" />
                </Switch>
              </Suspense>
            </div>
          </section>
        </main>
      </MyContext.Provider>
    </div>
  );
}

Mainpage.propTypes = {};

export default connect()(Mainpage);
