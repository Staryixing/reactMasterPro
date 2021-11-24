const SocketModal = {
  namespace: 'socketmodal',
  state: {
    processCode: '',
    productType: '',
    partType: '',
    realSn: '',
    snSuccess: true,
  },
  effects: {
    
  },
  reducers: {
    setCode(state, action){
      return {
        ...state,
        processCode: action.payload.code,
        productType: action.payload.productType,
        partType: action.payload.partType,
      }
    },
    setSn(state, action){
      return {
        ...state,
        realSn: action.payload.realSn,
        snSuccess: action.payload.snSuccess,
      }
    }
  }
}
export default SocketModal;