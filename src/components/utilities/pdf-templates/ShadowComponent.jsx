import React from 'react'
import root from 'react-shadow';

const ShadowComponent = (props) => {
  return (
    <root.div>
        {props.children}
    </root.div>
  )
}

export default ShadowComponent