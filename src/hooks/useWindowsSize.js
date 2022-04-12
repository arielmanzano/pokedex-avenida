import { useLayoutEffect, useState } from 'react'

const useWindowSize = () => {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
      function updateWidth() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', updateWidth);
      updateWidth();
      return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return width;
  }

export default useWindowSize;