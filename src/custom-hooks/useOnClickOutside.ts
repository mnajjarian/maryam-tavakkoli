import React, { useEffect, Ref, RefObject, RefAttributes, MutableRefObject } from 'react';

interface Props {
    ref: MutableRefObject<HTMLElement> ;
    cb: Function;
}
export const useOnClickOutside = (ref: MutableRefObject<HTMLElement | null>,
    cb: Function): void => {
    //const { ref, cb} = props;
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if(!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            cb();
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener)
        }
    }, [ref, cb])
}