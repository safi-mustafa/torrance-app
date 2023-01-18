import React from 'react'
import { getInputType } from './form.helper';

const Putin = ({ form,...elementProps }) => {
    const { inputType,...otherProps } = form;
    const element = getInputType({ inputType });
    const clonnedComponent = React.cloneElement(
        element,
        { ...elementProps,...otherProps }
    );
    return clonnedComponent;
}

export default Putin;