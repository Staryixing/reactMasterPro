class Event {
  eventList = [];
  on(key, fn) {
    if(!this.eventList[key]){
      this.eventList[key] = []
    }
    this.eventList[key].push(fn);
  };
  emit(){
    let key = Array.prototype.shift.call(arguments);
    let fns = this.eventList[key];
    if(!fns || !fns.length ===0){
      return false
    }
    for(let i=0,fn ; fn = fns[i++];){
      fn.apply(this, arguments)
    }
  };
  off(key, fn){
    let fns = this.eventList[key];
    if(!fns){
      return false
    }
    if(!fn){
      fns && (fns.length = 0)
    }else{
      for(let i = fns.length-1; i>0; i--){
        let _fn = fns[i];
        if(_fn === fn){
          fns.splice(i, 1)
        }
      }
    }
  }
}

export default new Event();
