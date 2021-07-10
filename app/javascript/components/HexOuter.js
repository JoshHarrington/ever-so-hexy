import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { positionFromOrderNumber } from '../utils'

const HexOuter = forwardRef(({
  className,
  focusedHexOrder,
  onClick,
  order,
  newHexPage,
  marginsForFirstHex,
  children
}, ref) => {
  const hexIsFocusedHex = focusedHexOrder && focusedHexOrder === order || !focusedHexOrder
  const posiFromOrder = positionFromOrderNumber(order)

  const isFirstHex = order === 1
  const absoluteHex = !isFirstHex

  let hexTransform = null
  if (absoluteHex) {
    hexTransform = `translate(${posiFromOrder.leftTransform}em, ${posiFromOrder.topTransform}em)`
  }

  return (
    <svg
      id={`id-${order}`}
      viewBox="0 0 156 180"
      width="300px"
      className={classNames(className, {
        "opacity-100": hexIsFocusedHex,
        "hover:opacity-100 opacity-50": !hexIsFocusedHex,
        "cursor-zoom-in": !newHexPage && (!focusedHexOrder || focusedHexOrder && !hexIsFocusedHex),
        "cursor-zoom-out": focusedHexOrder && hexIsFocusedHex,
        "relative flex-shrink-0": isFirstHex,
        "absolute": absoluteHex,
      })}
      style={{
        transform: hexTransform,
        width: '6.6em',
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
        height: '7.7em',
        marginTop: isFirstHex && `${marginsForFirstHex.top}em`,
        marginLeft: isFirstHex && `${marginsForFirstHex.left}em`,
        marginRight: isFirstHex && `${marginsForFirstHex.right}em`,
        marginBottom: isFirstHex && `${marginsForFirstHex.bottom}em`
      }}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </svg>
  )
})

export default HexOuter
