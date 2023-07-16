import { useState, useEffect } from 'react';

const useLoop = ({...prop}, delay) => {
    const [currentIndex , setCurentIndex] = useState(0)
    useEffect(()=>{
        const timeout = setTimeout(() => {
            setCurentIndex((prevIndex) => (prevIndex + 1) % prop.svgIcon.length);
          }, delay);
          return () => {
            clearTimeout(timeout);
          };
    },[currentIndex, prop.svgIcon.length, delay])
    return currentIndex
}

export default useLoop;