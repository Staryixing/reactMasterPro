function carouselReduce(state, action){
  switch(action.type){
    case 'increment':
      return { 
        number: state.number < state.total - 1 ? state.number + 1 : 0,
        total: state.total,
        direction: 'left',
      };
    case 'decrement':
      return { 
        number: state.number > 0 ? state.number - 1 : state.total - 1,
        total: state.total,
        direction: 'right'
      };
    default:
      throw new Error()
  }
}
export default carouselReduce
