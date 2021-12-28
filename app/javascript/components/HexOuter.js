import React, { forwardRef } from 'react'
import classNames from 'classnames'

const HexOuter = forwardRef(({
  className,
  focusedHexOrder,
  onClick,
  order,
  newHexPage,
  spacing,
  children
}, ref) => {
  const hexIsFocusedHex = focusedHexOrder && focusedHexOrder === order || !focusedHexOrder

  const isFirstHex = order === 1
  const absoluteHex = !isFirstHex

  return (
    <svg
      id={`id-${order}`}
      viewBox="0 0 156 180"
      width="300px"
      className={classNames(className,
        "w-[6.6em] h-[7.7em]", {
        "opacity-100": hexIsFocusedHex,
        "hover:opacity-100 opacity-50": !hexIsFocusedHex,
        "cursor-zoom-in": !newHexPage && (!focusedHexOrder || focusedHexOrder && !hexIsFocusedHex),
        "cursor-zoom-out": focusedHexOrder && hexIsFocusedHex,
        "relative flex-shrink-0": isFirstHex,
        "absolute": absoluteHex
      })}
      style={{
        transform: absoluteHex && `translate(${spacing.left}em, ${spacing.top}em)`,
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
        marginTop: isFirstHex && `${spacing.top}em`,
        marginLeft: isFirstHex && `${spacing.left}em`
      }}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </svg>
  )
})

export default HexOuter
