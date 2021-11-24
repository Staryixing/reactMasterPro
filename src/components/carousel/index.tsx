import React,{ useReducer } from "react";
import Animation from '../animation/index';
import style from './index.less';
import carouselReduce from './carouselReduce';

interface IProps{
  urls: {url: string}[]
}

type StateData = { type: string };
type CarouseReducer = React.Reducer<any, StateData>;
const CarouselImg:React.FC<IProps> = props =>{
  const initialState = {number: 0, total: props.urls?.length || 0, direction: 'left'};
  const [ state, dispacth ] = useReducer<CarouseReducer>(carouselReduce, initialState);
  const toLeft = () => {
    dispacth({
      type: 'increment'
    })
  };
  const toRight = () => {
    dispacth({
      type: 'decrement'
    })
  };
  return (
    <div className={style.carousel_root}>
      <div className={style.carousel_left} onClick={toLeft}>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3786" width="32" height="32"><path d="M658.29178 1003.504117l223.006914 0L398.119373 520.342595 881.298746 0 658.291782 0 175.112507 520.342595 658.29178 1003.504117z" p-id="3787"></path></svg>
      </div>
      <div className={style.carousel_main}>
          {
            props.urls.map((el, index) => {
              return (
                <Animation name={state.direction} isShow={state.number === index} key={index}>
                  <img src={el.url} className={style.carousel_img} alt='' />
                </Animation>
              )
            })
          }
      </div>
      <div className={style.carousel_right} onClick={toRight}>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3932" width="32" height="32"><path d="M881.298746 520.342595 398.119373 0 175.112486 0 658.29178 520.342595 175.112507 1003.504117l223.006914 0L881.298746 520.342595z" p-id="3933"></path></svg>
      </div>
    </div>
  )
}
export default CarouselImg
