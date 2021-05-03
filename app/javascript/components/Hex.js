import React, { forwardRef } from 'react';

var classNames = require('classnames');

const Hex = forwardRef(({className, style, focusedHexId, onClick, id, trixels}, ref) => {
  return (
    <svg
      id={`id-${id}`}
      viewBox="0 0 156 180"
      width="300px"
      className={classNames(className, {"opacity-50": focusedHexId && focusedHexId !== id})}
      style={style ? style : {}}
      onClick={onClick}
      ref={ref}
    >
      {trixels.map((t, i) => <path
        fill={t.colour}
        d={t.d}
        key={i}
      ></path>)}
    </svg>
  )
})

export default Hex
