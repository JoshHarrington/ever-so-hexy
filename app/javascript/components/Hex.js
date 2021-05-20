import React, { forwardRef } from 'react';
import { positionFromOrderNumber } from '../utils';

var classNames = require('classnames');

const Hex = forwardRef(({className, focusedHexOrder, onClick, order, trixels, newHexPage}, ref) => {
  const hexIsFocusedHex = focusedHexOrder && focusedHexOrder === order || !focusedHexOrder
  const posiFromOrder = positionFromOrderNumber(order)
  return (
    <svg
      id={`id-${order}`}
      viewBox="0 0 156 180"
      width="300px"
      className={classNames(className, {
        "opacity-100": hexIsFocusedHex,
        "hover:opacity-100 opacity-50": !hexIsFocusedHex,
        "cursor-zoom-in": !newHexPage && (!focusedHexOrder || focusedHexOrder && !hexIsFocusedHex),
        "cursor-zoom-out": focusedHexOrder && hexIsFocusedHex
      })}
      style={{
        transform: `translate(${posiFromOrder.leftTransform}em, ${posiFromOrder.topTransform}em)`,
        width: '6.6em',
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
      }}
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
