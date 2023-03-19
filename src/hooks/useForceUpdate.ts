import React from 'react';

const useForceUpdate = (): () => void => {
    const [, updateState] = React.useState<any>();
    return React.useCallback(() => updateState({}), []);
};

export default useForceUpdate;