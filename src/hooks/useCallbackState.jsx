import { useEffect,useState } from "react";

function  useCallbackState(init) {
  const [ options, setOptions ] = useState(init);
  const [ data, setData ] = useState(init);

  useEffect(() => {
    setData(options)
  }, [init, options])
  
  let callback = (val, fn) => {
    setOptions(val);
    fn(val)
  }

  return [data, callback ]
}

export default useCallbackState;
