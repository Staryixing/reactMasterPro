import { Children, PureComponent } from "react";

class Animation extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
        isInnerShow: false,
        animationClass: '',
    };
  }
  static getDerivedStateFromProps(props, state){
      // isShow 为true 时 设置 isInnerShow 为true 并且 设置animationClass 为 demo-showing
      // isShow 为false 时先设置 animationClass 为 demo-fading 动画执行还之后设置 isInnerShow 为 false
      function className(inner){
        const {name} = props;
        if(!name) throw new Error('animation name must be assigned');
        return `${name}-${inner}`
      }
      if(props.isShow){
        return {
          isInnerShow: true,
          animationClass: className('showing')
        }
      }else {
        return {
          animationClass: className('fading')
        }
      }
  }

  className(inner) {
    const { name } = this.props;
    if (!name) throw new Error('animation name must be assigned');
    return `${name}-${inner}`;
  }
  hide = () => {
      this.setState({
          isInnerShow: false,
      });
  }
  handleAnimationEnd =()=> {
    const isFading = this.state.animationClass === this.className('fading');
    if(isFading){
      this.hide();
    }
  }
  render(){
    let { children } = this.props;
    children = Children.only(children);
    const { isInnerShow, animationClass } = this.state;
    const element = {
      ...children,
      props: {
        ...children.props,
        className: `${children.props.className} ${animationClass}`,
        onAnimationEnd: this.handleAnimationEnd
      }
    }
    return isInnerShow && element 
  }
}

export default Animation;