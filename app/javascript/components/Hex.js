import React, { forwardRef } from 'react';

var classNames = require('classnames');

const Hex = forwardRef(({className, style, focusedHexId, onClick, id, trixels, newHexPage}, ref) => {
  const hexIsFocusedHex = focusedHexId && focusedHexId === id || !focusedHexId
  return (
    <svg
      id={`id-${id}`}
      viewBox="0 0 156 180"
      width="300px"
      className={classNames(className, {
        // "opacity-100": hexIsFocusedHex,
        // "hover:opacity-100 opacity-50": !hexIsFocusedHex,
        // "cursor-zoom-in": !newHexPage && (!focusedHexId || focusedHexId && !hexIsFocusedHex),
        // "cursor-zoom-out": focusedHexId && hexIsFocusedHex
      })}
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
