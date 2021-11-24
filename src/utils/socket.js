import Utils from './utils';
import { Constant } from '@/constants/requestConstants';

const heartMsg = (clientId) => {
    return {
        clientId,
        uuid: Utils.guid(),
        wsMsgType: "HEART_BEAT",
        // modules: ""
    }
}

const registerMsg =(clientId) => {
  return {
    "uuid": Utils.guid(),
    "wsMsgType" : "REGISTER",
    "module" : "",
    "data" : "",
    "clientId"  : clientId
  }
}

class Socket {
    constructor({ url, clientId, onopenFn, ondataFn }) {
        // this.url = Constant.SOCKET_HOST; // websocket地址
        this.url = Constant.SOCKET_HOST;
        this.ondataFn = ondataFn; // 接收数据处理函数
        this.onopenFn = onopenFn; // 连接成功处理函数
        this.websocket = null;
        this.normalCose = false; // 是否正常关闭websocket
        this.isReconnect = false; // 重新连接标识
        this.clientId = clientId; // 客户端的连接id
        this.init();
    }

    // 初始化
    init = () => {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = this.onopen;
        this.socket.onmessage = this.onmessage;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.onerror;
    }

    // 监听连接成功事件
    onopen = () => {
        if(this.onopenFn){
            this.onopenFn();
        }
        console.log('连接成功');
        // 发送注册消息
        this.socket.send(
          JSON.stringify(registerMsg(this.clientId)) 
        )
        // 如果之前存在订阅消息，发送订阅消息
        // if(sessionStorage.getItem('subscribe') && sessionStorage.getItem('userInfo')){
        //   let sub = JSON.parse(sessionStorage.getItem('subscribe'));
        //   sub.clientId = JSON.parse(sessionStorage.getItem('userInfo')).token;
        //   this.socket.send(JSON.stringify(sub))
        // }
        this.heartCheck.reset().start(this)
    }

    // 监听获取返回数据事件
    onmessage = (res) => {
        const data = JSON.parse(res.data)
        if (data.wsMsgType && data.wsMsgType === 'HEART_BEAT') {
            this.heartCheck.reset().start(this);
        }
        if (this.ondataFn && data.wsMsgType === 'CHART_DATA' ) {
            return this.ondataFn(data)
        }
        if(this.ondataFn && data.wsMsgType === 'NOTIFICATION' ){
            return this.ondataFn(data)
        }
        if(this.ondataFn && data.wsMsgType === 'ERROR' && data.data.code === 4000){
            this.closeSocket()
        }
    }

    // 监听关闭事件
    onclose = (e) => {
        console.log('监听到关闭')
        this.reConnect();
    }

    // 监听连接失败事件
    onerror = (e) => {
        console.log('连接异常事件', e)
        this.reConnect();
    }

    // 发送数据
    send = (msg) => {
      Object.assign(msg, {
        uuid: Utils.guid(),
        clientId: this.clientId
      })
      if (!this.socket) return;
      try {
        // if(msg.wsMsgType === 'SUBSCRIBE'){
        //   sessionStorage.setItem('subscribe',JSON.stringify(msg))
        // }
        this.socket.send(JSON.stringify(msg))
      } catch (error) {
          console.log('socket发送数据出错', error)
      }
    }
    // 意外关闭socket 需重新连接
    accidentCloseSocket = ()=> {
        console.log('意外关闭socket');
        this.normalCose = false;
        if (!this.socket) return;
        this.socket.close();
        this.socket = null;
        this.reConnect();
    }

    // 重新连接socket
    reConnect = () => {
        if (this.isReconnect) return;
        if (this.normalCose) return;
        console.log('重新连接');
        this.isReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        setTimeout(() => {
            this.socket = null;
            this.isReconnect = false;
            this.init();
        }, 3000);
    }
    //  按钮关闭socket
    closeSocket = (flag = true) => {
        console.log('按钮关闭')
        this.normalCose = flag;
        if (!this.socket) return;
        this.socket.close();
        this.socket = null;
        let { sendTimer, closeTimer } = this.heartCheck;
        // 清除心跳计时器
        clearTimeout(sendTimer)
        clearTimeout(closeTimer)
        sendTimer = null;
        closeTimer = null;
    }
    // 心跳
    heartCheck = {
        timeout: 10000,  //  心跳检测时长
        sendTimer: null, // 发送计时器
        closeTimer: null,// 关闭计时器
        reset: function() {
            clearTimeout(this.sendTimer);
            clearTimeout(this.closeTimer);
            this.sendTimer = null;
            this.closeTimer = null;
            return this;
        },
        start: function(_this) {
            if (this.sendTimer) return;
            // 发送心跳报文信息
            this.sendTimer = setTimeout(() => {
                _this.send(heartMsg(_this.clientId))
                // 超过三个心跳周期未收到响应报文，关闭socket
                this.closeTimer = setTimeout(() => {
                    console.log('222222---好久没收到心跳了');
                    _this.accidentCloseSocket()
                }, this.timeout*6)
            }, this.timeout)
        }
    }
}

export default Socket;