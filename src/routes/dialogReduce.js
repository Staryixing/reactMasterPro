function dialogReduce(state, action) {
  switch(action.type){
    case 'add':
      return { type: 1 };
    case 'edit':
      return { type: 2 };
    case 'detail':
      return { type: 3 };
    default:
      throw new Error();
  }
}
export default dialogReduce;