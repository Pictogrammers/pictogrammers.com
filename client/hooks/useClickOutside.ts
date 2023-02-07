import { useEffect } from 'react';

const useClickOutside = (ref: any, handler: Function) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: Event) => {
      if (
        // Do nothing if `mousedown` or `touchstart` started inside ref element
        (startedInside || !startedWhenMounted) ||
        // Do nothing if clicking ref's element or descendent elements
        !ref.current || ref.current.contains(event.target)
      ) {
        return;
      }

      handler(event);
    };

    const validateEventStart = (event: Event) => {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener('mousedown', validateEventStart);
    document.addEventListener('touchstart', validateEventStart);
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('mousedown', validateEventStart);
      document.removeEventListener('touchstart', validateEventStart);
      document.removeEventListener('click', listener);
    };
  }, [ ref, handler ]);
};

export default useClickOutside;
