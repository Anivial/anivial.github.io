import { useEffect, useRef } from 'react';

// https://usehooks.com/usePrevious/
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export default usePrevious;
