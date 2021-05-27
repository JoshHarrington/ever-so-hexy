import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { positionFromOrderNumber } from '../utils'

const HexOuter = forwardRef(({
  className,
  focusedHexOrder,
  onClick,
  order,
  newHexPage,
  children
}, ref) => {
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
      {children}
    </svg>
  )
})

export default HexOuter
