import { useEffect, MutableRefObject } from 'react';

export const useOnClickOutside = (ref: MutableRefObject<HTMLElement | null>,
    cb: Function): void => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if(!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            cb();
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        }
    }, [ref, cb])
}