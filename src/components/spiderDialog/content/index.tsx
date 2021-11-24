import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './index.less';

interface IProps {
  show: boolean,
  onOk?: () => void,
  onCancel?: () => void,
  title?: string,
  width?: number,
  footer?: React.ReactNode;
}

const madalRoot = document.body;
const DialogContent:React.FC<IProps> = props => {
  const [ el, setEl ] = useState<HTMLDivElement>(document.createElement('div'));
  const [animationClass, setAnimationClass ] = useState<string>('');
  const [maskAnimationClass, setMaskAnimationClass ] = useState<string>('');
  console.log('32332');
  useEffect(() => {
    if(props.show){
      madalRoot?.appendChild(el);
      setAnimationClass('modal_root_showing');
      setMaskAnimationClass('dialog_mask_show');
    }else {
      setAnimationClass('modal_root_fading');
      setMaskAnimationClass('dialog_mask_fade');
    }
  }, [ props.show ]);

  const handleOk = () => {
    props.onOk && props.onOk()
  }
  const handleCancel = () => {
    props.onCancel && props.onCancel()
  }
  const handleAnimationEnd = () => {
    if(animationClass === 'modal_root_fading'){
      madalRoot?.contains(el) && madalRoot?.removeChild(el);
    }
  }
  const renderContent = (
      <div className={`${style.root} `} onAnimationEnd={handleAnimationEnd}>
        <div className={`${style.dialog_mask} ${style[maskAnimationClass]}`} onClick={handleCancel}></div>
        <div className={`${style.dialog_wrap} ${style[animationClass]}`} onClick={handleCancel}>
          <section className={style.dialog_content} style={{ width: props.width }} onClick={e => e.stopPropagation()}>
            <header className={style.dialog_header}>
              <span>{props.title}</span>
              <span style={{ cursor: 'pointer', color: 'rgba(0,0,0, .45)' }} onClick={handleCancel}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
              </span>
            </header>
            <section className={style.dialog_body}>
              {props.children}
            </section>
            {
              props.footer ? props.footer : <footer className={style.dialog_footer}>
                <span onClick={handleCancel} className={style.dialog_btn}>取消</span>
                <span onClick={handleOk} className={`${style.dialog_btn } ${style.dialog_btn_primary}`}>确定</span>
              </footer>
            }
          </section>
        </div>
      </div>
  )
  return ReactDOM.createPortal(renderContent, el);
}

export default DialogContent