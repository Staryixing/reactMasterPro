const testUrl = 'https://10.66.86.103:10698/three'; // 测试地址
const devUrl = "http://192.168.1.29:10700/mes"; // 开发地址
const proUrl = 'https://energy.wingbow.com.cn:20001/energy';  // 生产地址
const proxyUrl = '/mes';  // 生产地址

const devsocketUrl = 'ws://192.168.1.25:3001';  // 开发地址
const testsocketUrl = 'ws://10.66.86.103:10698/three'; // 测试地址
const prosocketUrl = 'wss:///energy.wingbow.com.cn:20001/energy/websocket/console'; // 生产socket地址

const ENV = process.env.NODE_ENV;
console.log('API_ENV',process.env.API_ENV,ENV)
let BaseURL = devUrl;
let Constant = {
  SOCKET_HOST: devsocketUrl
}
if(ENV === 'development' && process.env.API_ENV === 'dev' ){ 
  BaseURL = devUrl;  
  Constant.SOCKET_HOST = devsocketUrl;
}else if(ENV === 'production' && process.env.API_ENV === 'dev'){
  BaseURL = devUrl;  
  Constant.SOCKET_HOST = devsocketUrl;
}else if(ENV === 'production' && process.env.API_ENV === 'test'){
  BaseURL = testUrl;
  Constant.SOCKET_HOST = testsocketUrl;
}else if(ENV === 'production' && process.env.API_ENV === 'pro'){
  BaseURL = proUrl;
  Constant.SOCKET_HOST = prosocketUrl;
}else{
  BaseURL = devUrl;
  Constant.SOCKET_HOST = devsocketUrl;
}
export { BaseURL, Constant }

