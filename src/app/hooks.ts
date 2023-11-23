import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { ReactEventHandler, RefObject, useEffect } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useOnClickOutside = (
    ref: RefObject<HTMLElement>, 
    handler: () => void
  ) => {
    useEffect(() => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // ref가 현재 없거나 클릭한 대상이 ref에 포함되면 무시
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler();
      };
  
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
  
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]); // 의존성 배열에 ref와 handler 추가
  };
  
  export default useOnClickOutside