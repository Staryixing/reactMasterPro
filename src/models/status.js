const TypeModal = {
  namespace: 'typemodal',
  state: {
    partsTypeList: [
      {
        id: '01',
        text: '01'
      },{
        id: '02',
        text: '02'
      },{
        id: '03',
        text: '03'
      },{
        id: '04',
        text: '04'
      },{
        id: '05',
        text: '05'
      },{
        id: '06A',
        text: '06A'
      }
    ],
    productTypeList: [
      {
        id: '6E',
        text: '6E'
      },{
        id: '20E',
        text: '20E'
      },{
        id: '40E',
        text: '40E'
      }
    ]
  },
  effects: {
    *partsType({payload, callback},{call,put}){

    },
    *procuctType({payload, callback},{call,put}){

    },
  },
  reducers: {
    setPartsType(state, action){
      return {
        ...state,
        partsTypeList: action.payload
      }
    },
    setProductType(state, action){
      return {
        ...state,
        productTypeList: action.payload
      }
    }
  }
}
export default TypeModal;
