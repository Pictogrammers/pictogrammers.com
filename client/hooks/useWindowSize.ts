import { useEffect, useState } from 'react';

interface WindowSizeInterface {
  height: number;
  width: number;
}

const useWindowSize = () => {
  const [ windowSize, setWindowSize ] = useState<WindowSizeInterface>({
    height: 0,
    width: 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
