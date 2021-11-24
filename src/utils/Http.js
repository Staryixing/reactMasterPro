import { message, notification } from 'antd';
const fecthFn = window.fetch;
/**
 * 信息响应 100-199
 * 成功响应 200-299
 * 重定向 300-399
 * 客户端错误 400-499
 * 服务端错误 500-599
 */
const httpStatus = new Map([
 [400, '请求参数错误'],
 [401, '该请求未授权'],
 [403, '该请求不允许'],
 [404, '请求地址错误'],
 [405, '请求方式错误'],
 [408, '请求超时'],
 [500, '服务器错误'],
 [502, '服务响应错误'],
 [503, '服务器重启中'],
])
/**
 * 由构造函数的原型模式对fetch封装为类
 * 用代理模式处理多个http错误报错提示问题
 * promise.race 处理超时
 * 取消请求(fetch 取消请求后需重新创建AbortController实例)
 * 
 * @param {*} url http地址
 * @param {*} timeout 延迟时长
 */
function HttpHelp(url,timeout = 9000) {
  this.baseUrl = url;
  this.timeout = timeout;
}

HttpHelp.creatHeaders = function(headers){
  let originHeaders = {
      'Content-Type': 'application/json',
  }
    // 判断当前本地是否存储token,如果存储token则添加到header头
  let localData = sessionStorage.getItem('userInfo');
  if(localData){
      originHeaders = {
          ...originHeaders,
          'x-token':JSON.parse(localData).token
      }
  }
  if(headers){
      return Object.assign(originHeaders,headers)
  }else {
      return originHeaders;
  }
}
HttpHelp.creatBody = function(params){
  if(params){
      if(typeof (params) === 'string'){
          return params
      }
      return JSON.stringify(params);
  }else{
      return null
  }
}
/**
 * 请求进程错误
 * @param {*} err 
 * @returns 
 */
HttpHelp.processError = function(err,url){
  if (typeof (err) === 'string') {
    if(!HttpHelp.message){
      message.error(err);
    }
    HttpHelp.message = 1;
    return Promise.reject(err)
  }else if (typeof (err) === 'object') {
    if(!HttpHelp.cache){
      notification.error({
        message: `请求错误 ${url}`,
        description: `${err}`
      })
    }
    HttpHelp.cache = 1;
    return Promise.reject('网络请求出错，请稍后重试')
  } else {
    return Promise.reject('网络请求出错，请稍后重试')
  }
}
/**
 * 请求状态错误
 * @param {*} err 
 * @param {*} url 
 * @returns 
 */
HttpHelp.statusError = function(err, url){
  if(typeof (err) === 'number'){
    if(!HttpHelp.status){
      message.error(`${httpStatus.get(err)}:${url}`);
    }
    HttpHelp.status = 1;
    return Promise.reject(err)
  }
}
/**
 * 请求成功响应拦截
 * @param {*} response 
 * @returns Promise
 */
HttpHelp.responseIntercept = function(response){
  return new Promise((resolve, reject)=> {
    resolve(response);
  }).then(res => {
    if(res?.code === 10402){
      // 重新登入 调用挂在window上的全局对象
      sessionStorage.removeItem('userInfo');
      if(!HttpHelp.messageFlag){
        message.error(res.message);
      }
      HttpHelp.messageFlag = 1;
      window.G_history.push('/');
    }
    if(res.code !== 200 && res.code !== 10402) message.error(res.message)
    return res
  }).catch(err => {
    return err
  })
}
/**
 * 请求超时设置 （服务端长时间没响应,电脑所在网段错误）
 * @param {*} method 
 * @returns 
 */
HttpHelp.prototype.race = function(method){
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('请求超时，请稍后重试')
      }, this.timeout)
    })
    return Promise.race([method, timeoutPromise])
}
/**
 * 多个请求promise all
 * 
 * 
 */


/**
 * get请求
 * @param {*} secondUrl 请求路由地址
 * @param {*} params 参数
 * @param {*} headers 请求头
 */
HttpHelp.prototype.get = function(secondUrl, {params,headers}){
  let controller = new AbortController();
  let signal = controller.signal;
  let url = this.baseUrl + secondUrl;
  if(params){
    const paramsArray = [];
    // 拼接参数
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${encodeURI(params[key])}`));
    if (url.search(/\?/) === -1) {
        url += `?${paramsArray.join('&')}`;
    } else {
        url += `&${paramsArray.join('&')}`;
    }
  };
  let trueHeaders = HttpHelp.creatHeaders(headers);
  let p = fecthFn(url, {
    signal: signal,
    method: 'GET',
    headers: trueHeaders,
  }).then(res => {
    return res;
  }).catch(err => {
    // 网络故障（没有联网）
    if(err.message === 'Failed to fetch') message.error('请检查网络哦')
    return err;
  })
  return this.race(p).then(res => {
    if(!res.ok){
      return HttpHelp.statusError(res.status, secondUrl)
    }
    return HttpHelp.responseIntercept(res.json());
  }).catch(err => {
    // 网络超时的promise报的错（网不对 或 服务超时）
    controller.abort();
    return HttpHelp.processError(err, url)
  })
}
/**
 * post请求
 * @param {*} secondUrl 请求路由地址
 * @param {*} params 参数
 * @param {*} headers 请求头
 */
HttpHelp.prototype.post = function(secondUrl, {params,headers}){
  let controller = new AbortController();
  let signal = controller.signal;
  let url = this.baseUrl + secondUrl;
  let body = HttpHelp.creatBody(params);
  let trueHeaders = HttpHelp.creatHeaders(headers);
  let paramsEntity = {
      method: 'POST',
      headers: trueHeaders,
      signal,
  }
  if (body) {
      paramsEntity.body = body;
  }
  let p = fecthFn(url,paramsEntity).then(res => {
    return res;
  }).catch(err => {
    if(err.message === 'Failed to fetch') message.error('请检查网络哦')
    return err;
  })
  return this.race(p).then(res => {
    if(!res.ok){
      return HttpHelp.statusError(res.status, secondUrl)
    }
    return HttpHelp.responseIntercept(res.json());
  }).catch(err => {
    // 网络超时的promise报的错（网不对 或 服务超时）
    controller.abort();
    return HttpHelp.processError(err, url)
  })
}
/**
 * delete请求
 * @param {*} secondUrl 请求地址
 * @param {*} params 参数
 * @param {*} headers 请求头
 */
HttpHelp.prototype.delete = function(secondUrl, {params,headers}){
  let controller = new AbortController();
  let signal = controller.signal;
  let url = this.baseUrl + secondUrl;
  let body = JSON.stringify(params) || '';
  let trueHeaders = HttpHelp.creatHeaders(headers);
  let p = fecthFn(url, {
    method: 'DELETE',
    headers: trueHeaders,
    signal,
    body,
  }).then(res => {
    return res;
  }).catch(err => {
    if(err.message === 'Failed to fetch') message.error('请检查网络哦')
    return err;
  })
  return this.race(p).then(res => {
    if(!res.ok){
      return HttpHelp.statusError(res.status, secondUrl)
    }
    return HttpHelp.responseIntercept(res.json());
  }).catch(err => {
    controller.abort();
    return HttpHelp.processError(err, url)
  })
}
/**
 * put请求
 * @param {*} secondUrl 请求地址
 * @param {*} params 参数
 * @param {*} headers 请求头
 */
HttpHelp.prototype.put = function(secondUrl, {params,headers}){
  let controller = new AbortController();
  let signal = controller.signal;
  let url = this.baseUrl + secondUrl;
  let body = JSON.stringify(params) || '';
  let trueHeaders = HttpHelp.creatHeaders(headers);
  let p = fecthFn(url, {
    method: 'PUT',
    headers: trueHeaders,
    signal,
    body,
  }).then(res => {
    return res;
  }).catch(err => {
    if(err.message === 'Failed to fetch') message.error('请检查网络哦')
    return err
  })
  return this.race(p).then(res => {
    if(!res.ok){
      return HttpHelp.statusError(res.status, secondUrl)
    }
    return HttpHelp.responseIntercept(res.json());
  }).catch(err => {
    // 网络超时的promise报的错（网不对 或 服务超时）
    controller.abort();
    return HttpHelp.processError(err, url)
  })
}
/**
 * post 上传图片
 * 
 */
HttpHelp.prototype.uploadPost = function(secondUrl, {params,headers}){
  let controller = new AbortController();
  let signal = controller.signal;
  let url = this.baseUrl + secondUrl;
  let trueHeaders = HttpHelp.creatHeaders(headers);
  let body = params;
  delete trueHeaders['Content-Type'];
  let p = fecthFn(url, {
    method: 'POST',
    headers: trueHeaders,
    signal,
    body,
  }).then(res => {
    return res;
  }).catch(err => {
    if(err.message === 'Failed to fetch') message.error('请检查网络哦')
    return err;
  })
  return this.race(p).then(res => {
    if(!res.ok){
      return HttpHelp.statusError(res.status, secondUrl)
    }
    return HttpHelp.responseIntercept(res.json());
  }).catch(err => {
    // 网络超时的promise报的错（网不对 或 服务超时）
    controller.abort();
    return HttpHelp.processError(err, url)
  })

}
      
export default HttpHelp;
