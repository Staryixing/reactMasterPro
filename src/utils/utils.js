/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-useless-escape */
let _typeOf = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator 
  ? function t(t) {
    return typeof t
  } : function (t) {
    return t && "function" == typeof Symbol &&
      t.constructor === Symbol && t !== Symbol.prototype
      ? "Symbol" : typeof t;
  }

export default {
  // 生成uuid
  guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  },
  /** 深拷贝 */
  deepCopy: function (obj){
    let newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
      return 
    }
    for(let i in obj){
      newobj[i] = typeof obj[i] === 'object' ? this.deepCopy(obj[i]) : obj[i]
    }
    return newobj;
  },

  /** 
   * 获取日期时间 
   * 
   * @returns YYYY-MM-DD 星期 HH:mm:ss 
   * */
  formatDateTime: function(date){
    let year = date.getFullYear();
    let month = (date.getMonth() + 1)< 10?'0'+(date.getMonth() + 1): date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours()<10?'0'+date.getHours():date.getHours();
    let minute = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
    let second = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
    let week = date.getDay();
    let time = year+"年"+month+"月"+day+'日' + ' ' + hour+":"+minute+":"+second;
    return time   
  },

  /** 
   * 时间格式化
   * 
   * @returns YYYY-MM-DD HH:mm:ss 
   * 
   * */  
  formatDate: function (date){
    let year = date.getFullYear();
    let month = (date.getMonth() + 1)< 10?'0'+(date.getMonth() + 1): date.getMonth() + 1;
    let day = date.getDate()<10?'0'+date.getDate():date.getDate();
    let hour = date.getHours()<10?'0'+date.getHours():date.getHours();
    let minute = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
    let second = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
    let time = year+"-"+month+"-"+day+ ' '+ hour+":"+minute+":"+second;
    return time
  },
  /**
   * 正则匹配
   * @param {*} str 需匹配的字符串
   * @param {*} type 匹配的类型
   * @returns 布尔值
   */
  checkStr: function (str, type) {
      switch (type) {
          case 'phone': //手机号码
              return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
          case 'tel': //座机
              return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
          case 'card': //身份证
              return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
          case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
              return /^[a-zA-Z]\w{5,17}$/.test(str)
          case 'pwdWidthString':
              return /^[A-Z][A-Za-z\d]{5,14}$/.test(str) //密码以大写字母开头长度 6-48位之间
          case 'postal': //邮政编码
              return /[1-9]\d{5}(?!\d)/.test(str);
          case 'QQ': //QQ号
              return /^[1-9][0-9]{4,9}$/.test(str);
          case 'email': //邮箱
              return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
          case 'money': //金额(小数点2位)
              return /^\d*(?:\.\d{0,2})?$/.test(str);
          case 'IP': //IP
              return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
          case 'number': //数字
              return /^[0-9]$/.test(str);
          case 'positiveInteger': //正整数 
              return /^[1-9]\d*$/.test(str);
          case 'price': //价格
              return /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(str); //价格非0则去掉'?'
          case 'english': //英文
              return /^[a-zA-Z]+$/.test(str);
          case 'chinese': //中文
              return /^[\u4E00-\u9FA5]+$/.test(str);
          case 'lower': //小写
              return /^[a-z]+$/.test(str);
          case 'upper': //大写
              return /^[A-Z]+$/.test(str);
          case 'photo': // 图片类型
              return /(gif|png|jpe?g)$/.test(str);
          case 'special_str':
              return /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/.test(str); //包含小数点
          case 'special_str_width_point':
              return /[`~!@#$^&*()=|{}':;',\\\[\]<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/.test(str);
          case 'two_decimal_places': // 0-99 两位小数
              return /^([1-9]{1}[0-9]{0,1}(\.\d{1,2})?)$/.test(str);
          case 'num_witdth_letter':
              return /^[a-zA-Z0-9]*$/.test(str);// 数字 字母
          case 'name'://用户名
              return /^[\u4E00-\u9FA5a-zA-Z0-9]*$/.test(str);// 中文 数字 字母
          default:
              return false;
      }
  },
  /**
   * 返回变量值的类型
   * @param {*} t 
   * @returns 变量的类型
   */
  toType: function(t) {
    if(null == t) return t + '';
    let e = /^\[object ([0-9a-zA-Z]+)\]$/;
    return 'object' === (void 0 === t ? 'undefined' : _typeOf(t)) || 
      'function' == typeof t ? e.exec({}.toString.call(t))[1].toLowerCase()
      : void 0 === t ? 'undefined' : _typeOf(t);
  },
  /**
   * 判断一个变量值是否为函数
   * @param {*} t 
   * @returns 布尔值
   */
  isFunction: function (t) {
    return (
      'function' == typeof t && 
      'number' != typeof t.nodeType && 
      'function' != typeof t.item
    )
  },
  isWindow: function (t) {
    return null != t && t === t.window;
  },
  /**
   * 判断是否是类数组或数组
   * @param {*} t 
   * @returns 返回布尔值 
   */
  isArrayLike: function (t) {
    let a = this.toType(t);
    if(a === 'array' || a=== 'object') {
      let e = !!t && 'length' in t && t.length,
        n = this.toType(t);
        return (
          !this.isFunction(t) &&
          !this.isWindow(t) && (
            'array' === n || 
            0 === e || 
            ('number' === typeof e && e > 0 && e-1 in t)
          )
        );
    } else {
      // throw new Error('数据格式有误')
      return false
    }
  },
  /**
   * 判断是否为普通的json对象
   * @param {*} t 
   * @returns 布尔值
   */
  isPlainObject: function (t){
    let n = void 0,
        o = void 0,
        u = this.toType(t);
        return (
          !(!t || 'object' !== u) && (
            !( n = Object.getPrototypeOf(t)) || 
              ( 'function' == typeof (o = {}.hasOwnProperty.call(n, 'constructor')
              && n.constructor)
              && {}.hasOwnProperty.toString.call(o) === {}.hasOwnProperty.toString.call(Object))
            )
        )
  },

  /**
   * 判断是否为空对象
   * @param {*} t 
   * @returns 返回布尔值
   */
  isEmptyObject: function (t) {
    if(null == t || ( 'object' !== (void 0 === t ? 'undefined' : _typeOf(t))
      &&'function' != typeof t ) ) return !1;
    let e = Object.keys(t);
    return (
      'undefined' != typeof Symbol && (e = e.concat(Object.getOwnPropertySymbols(t))),
      0 === e.length
    );
  },
  /**
   * 判断是否为数值 （number 或者 string 但不是NaN）
   * @param {*} t 
   * @returns 
   */
  isNumeric: function (t) {
    let e = this.toType(t);
    return ('number' === e || 'string' === e ) && !isNaN(t);
  },

  /**
   * 数组去重
   * 
   */
  deduplication: function (arr){
    return [...new Set([...arr])]
  },

  /**
   * 对象数组去重
   * 
   */
  deduplicateObjectArray: function (arr, key){
    if(this.isArrayLike(arr)) {
      let keys = new Set();
      let arr2 = [];
      arr.forEach(el => {
        if(!keys.has(el[key])){
          arr2.push(el)
          keys.add(el[key])
        }
      })  
      return arr2;
    }else {
      return []
    }
  },
  /**
   * 转换 obj 为url params参数
   * @param {*} obj 传入对象
   * @param {*} isEncodeURIComponent 是否编码，默认不编码
   * @returns { String }
   */
  objToParams(obj, isEncodeURIComponent = false){
    let str = '';
    for(let key in obj){
      if(str !== ''){
        str += '&';
      }
      str += key + '=' + (isEncodeURIComponent ? encodeURIComponent(obj[key]) : obj[key])
    }
    return str;
  },
  /**
   * 获取地址栏路径
   */
  urlPath(str){
    let reg = /#/g;
    return str.replace(reg, '')
  },  
  /**
   * 转换 url params参数为obj
   * @param {*} str 传入url参数字符串
   * @param {*} isDecodeURI 是否解码，默认不解码
   * @returns {Object}
   */
  paramsToObj(str, isDecodeURI = false){
    let obj = {};
    str = str.substring(str.indexOf('?')+1);
    try{
      obj = JSON.parse(
        '{"' + (isDecodeURI ? decodeURI(str) : str)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
        + '"}'
      )
    }catch(e){
      console.log(e);
    }
    return obj;
  },
  // 节流函数
  // 单位时间内只执行一次，场景：不停点击按钮
  throttle: function(func, delay){
    let oldDate = 0;
    return function(){
      let newDate = new Date();
      if(newDate - oldDate > delay){
        oldDate = newDate;
        return func.apply(this, arguments);
      }
    }
  },
  // 防抖函数
  // 只执行最后时间的一次， 场景：拖拽画布
  debounce: function(func, delay){
    let timer = null;
    return function (){
      let that = this;
      let agrs = arguments;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function(){
        func.call(that, ...agrs);
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  },
  // 数组求并集
  union(a, b) {
    return [...new Set([...a, ...b])];
  },
  // 数组求交集
  intersect(a, b) {
    return [...new Set([...a].filter(x => b.includes(x)))];
  },
  //数组内部交换
  internalExchange(n, m, arr) {
    [arr[n], arr[m]] = [arr[m], arr[n]];
  },
  /*数组最大值*/
  max(arr) {
    return Math.max.apply(null, arr);
  },
  /*数组最小值*/
  min(arr) {
    return Math.min.apply(null, arr);
  },
  // 判断是否安卓浏览器
  isAndroid() {
      return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
  },
  // 判断是否ios 浏览器
  isIOS() {
      return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  // 判断是否微信内置浏览器
  isWechat() {
      return /MicroMessenger/.test(window.navigator.userAgent);
  },
  // 判断是否支付宝内置浏览器
  isAlipay() {
      return /AlipayClient/.test(window.navigator.userAgent);
  },
  /**
   * 将svg导出成图片
   * @param node svg节点 => document.querySelector('svg')
   * @param name 生成的图片名称
   * @param width 生成的图片宽度
   * @param height 生成的图片高度
   * @param type 生成的图片类型
   */
  covertSVG2Image: function(node, name, width, height, type = 'png') {
      let serializer = new XMLSerializer()
      let source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(node)
      let image = new Image()
      image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      let context = canvas.getContext('2d')
      context.fillStyle = '#fff'
      context.fillRect(0, 0, 10000, 10000)
      image.onload = function () {
          context.drawImage(image, 0, 0)
          let a = document.createElement('a')
          a.download = `${name}.${type}`
          a.href = canvas.toDataURL(`image/${type}`)
          a.click()
      }
  },
  /**
   * 将svg转换为base64
   * @param node svg节点 => document.querySelector('svg')
   * @param name 生成的图片名称
   * @param width 生成的图片宽度
   * @param height 生成的图片高度
   * @param type 生成的图片类型
   */
  async  svgToBase64(node, name, width, height, type = 'png') {
      return new Promise((resolve, reject) => {
          let serializer = new XMLSerializer()
          let source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(node)
          let image = new Image()
          image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
          let canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          let context = canvas.getContext('2d')
          context.fillStyle = '#fff'
          context.fillRect(0, 0, 10000, 10000)
          image.onload = function () {
              context.drawImage(image, 0, 0)
              // 转换为base 64返回
              resolve(canvas.toDataURL(`image/${type}`))
          }
      })
  },

  /**
   * @description base64 转换为file文件
   * @param {*} dataurl base64 编码
   * @param {*} filename 文件名称
   */
  dataURLtoFile: function (dataurl, filename) { 
      var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
  },
  
  /**
   * @description base64 转换为blob 文件
   * @param {*} dataurl 
   */
  dataURLtoBlob: function(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
  },
}