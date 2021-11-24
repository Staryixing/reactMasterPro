import React, { useState,useEffect } from 'react';
import utils from "@/utils/utils";

function TimerCom() {
  useEffect(() => {
    let timer = setInterval(() => {
      setTime(utils.formatDateTime(new Date()))
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  const [ time, setTime ] = useState('');
  return (
    <span>
      {time}
    </span>
  )
}
export default TimerCom;
