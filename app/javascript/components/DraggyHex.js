import React, { forwardRef, useRef, useState } from 'react'
import { positionFromOrderNumber, sendNewPaths, updatePathsFn } from '../utils'

var classNames = require('classnames')

const DraggyPath = ({
	fill,
	position,
	d
}) => {
	return (
		<path
			data-position={position}
			fill={fill}
			d={d}
			stroke={fill && fill !== "white" && fill !== "#fff" ? fill : "rgb(226,226,226)"}
			strokeWidth={fill && fill !== "white" && fill !== "#fff" ? "0" : "1"}
		></path>
	)
}

const Trixels = ({hex}) => {
	return <>
	<DraggyPath position="a1" fill={hex.trixel_colour_a1} d="M0 75L0.00962452 45L26 59.9917L0 75Z" />
	<DraggyPath position="a2" fill={hex.trixel_colour_a2} d="M26 30L25.9904 60L0 45.0083L26 30Z" />
	<DraggyPath position="a3" fill={hex.trixel_colour_a3} d="M26 60L26.0096 30L52 44.9917L26 60Z" />
	<DraggyPath position="a4" fill={hex.trixel_colour_a4} d="M52 15L51.9904 45L26 30.0083L52 15Z" />
	<DraggyPath position="a5" fill={hex.trixel_colour_a5} d="M52 45L52.0096 15L78 29.9917L52 45Z" />
	<DraggyPath position="a6" fill={hex.trixel_colour_a6} d="M78 0L77.9904 30L52 15.0083L78 0Z" />
	<DraggyPath position="a7" fill={hex.trixel_colour_a7} d="M78 30L78.0096 0L104 14.9917L78 30Z" />
	<DraggyPath position="b1" fill={hex.trixel_colour_b1} d="M0 105L0.00962452 75L26 89.9917L0 105Z" />
	<DraggyPath position="b2" fill={hex.trixel_colour_b2} d="M26 60L25.9904 90L0 75.0083L26 60Z" />
	<DraggyPath position="b3" fill={hex.trixel_colour_b3} d="M26 90L26.0096 60L52 74.9917L26 90Z" />
	<DraggyPath position="b4" fill={hex.trixel_colour_b4} d="M52 45L51.9904 75L26 60.0083L52 45Z" />
	<DraggyPath position="b5" fill={hex.trixel_colour_b5} d="M52 75L52.0096 45L78 59.9917L52 75Z" />
	<DraggyPath position="b6" fill={hex.trixel_colour_b6} d="M78 30L77.9904 60L52 45.0083L78 30Z" />
	<DraggyPath position="b7" fill={hex.trixel_colour_b7} d="M78 60L78.0096 30L104 44.9917L78 60Z" />
	<DraggyPath position="b8" fill={hex.trixel_colour_b8} d="M104 15L103.99 45L78 30.0083L104 15Z" />
	<DraggyPath position="b9" fill={hex.trixel_colour_b9} d="M104 45L104.01 15L130 29.9917L104 45Z" />
	<DraggyPath position="c1" fill={hex.trixel_colour_c1} d="M0 135L0.00962452 105L26 119.992L0 135Z" />
	<DraggyPath position="c2" fill={hex.trixel_colour_c2} d="M26 90L25.9904 120L0 105.008L26 90Z" />
	<DraggyPath position="c3" fill={hex.trixel_colour_c3} d="M26 120L26.0096 90L52 104.992L26 120Z" />
	<DraggyPath position="c4" fill={hex.trixel_colour_c4} d="M52 75L51.9904 105L26 90.0083L52 75Z" />
	<DraggyPath position="c5" fill={hex.trixel_colour_c5} d="M52 105L52.0096 75L78 89.9917L52 105Z" />
	<DraggyPath position="c6" fill={hex.trixel_colour_c6} d="M78 60L77.9904 90L52 75.0083L78 60Z" />
	<DraggyPath position="c7" fill={hex.trixel_colour_c7} d="M78 90L78.0096 60L104 74.9917L78 90Z" />
	<DraggyPath position="c8" fill={hex.trixel_colour_c8} d="M104 45L103.99 75L78 60.0083L104 45Z" />
	<DraggyPath position="c9" fill={hex.trixel_colour_c9} d="M104 75L104.01 45L130 59.9917L104 75Z" />
	<DraggyPath position="c10" fill={hex.trixel_colour_c10} d="M130 30L129.99 60L104 45.0083L130 30Z" />
	<DraggyPath position="c11" fill={hex.trixel_colour_c11} d="M130 60L130.01 30L156 44.9917L130 60Z" />
	<DraggyPath position="d1" fill={hex.trixel_colour_d1} d="M26 120L25.9904 150L0 135.008L26 120Z" />
	<DraggyPath position="d2" fill={hex.trixel_colour_d2} d="M52 105L51.9904 135L26 120.008L52 105Z" />
	<DraggyPath position="d3" fill={hex.trixel_colour_d3} d="M26 150L26.0096 120L52 134.992L26 150Z" />
	<DraggyPath position="d4" fill={hex.trixel_colour_d4} d="M52 135L52.0096 105L78 119.992L52 135Z" />
	<DraggyPath position="d5" fill={hex.trixel_colour_d5} d="M78 90L77.9904 120L52 105.008L78 90Z" />
	<DraggyPath position="d6" fill={hex.trixel_colour_d6} d="M78 120L78.0096 90L104 104.992L78 120Z" />
	<DraggyPath position="d7" fill={hex.trixel_colour_d7} d="M104 75L103.99 105L78 90.0083L104 75Z" />
	<DraggyPath position="d8" fill={hex.trixel_colour_d8} d="M104 105L104.01 75L130 89.9917L104 105Z" />
	<DraggyPath position="d9" fill={hex.trixel_colour_d9} d="M130 60L129.99 90L104 75.0083L130 60Z" />
	<DraggyPath position="d10" fill={hex.trixel_colour_d10} d="M130 90L130.01 60L156 74.9917L130 90Z" />
	<DraggyPath position="d11" fill={hex.trixel_colour_d11} d="M156 45L155.99 75L130 60.0083L156 45Z" />
	<DraggyPath position="e1" fill={hex.trixel_colour_e1} d="M52 135L51.9904 165L26 150.008L52 135Z" />
	<DraggyPath position="e2" fill={hex.trixel_colour_e2} d="M52 165L52.0096 135L78 149.992L52 165Z" />
	<DraggyPath position="e3" fill={hex.trixel_colour_e3} d="M78 120L77.9904 150L52 135.008L78 120Z" />
	<DraggyPath position="e4" fill={hex.trixel_colour_e4} d="M78 150L78.0096 120L104 134.992L78 150Z" />
	<DraggyPath position="e5" fill={hex.trixel_colour_e5} d="M104 105L103.99 135L78 120.008L104 105Z" />
	<DraggyPath position="e6" fill={hex.trixel_colour_e6} d="M104 135L104.01 105L130 119.992L104 135Z" />
	<DraggyPath position="e7" fill={hex.trixel_colour_e7} d="M130 90L129.99 120L104 105.008L130 90Z" />
	<DraggyPath position="e8" fill={hex.trixel_colour_e8} d="M130 120L130.01 90L156 104.992L130 120Z" />
	<DraggyPath position="e9" fill={hex.trixel_colour_e9} d="M156 75L155.99 105L130 90.0083L156 75Z" />
	<DraggyPath position="f1" fill={hex.trixel_colour_f1} d="M78 150L77.9904 180L52 165.008L78 150Z" />
	<DraggyPath position="f2" fill={hex.trixel_colour_f2} d="M78 180L78.0096 150L104 164.992L78 180Z" />
	<DraggyPath position="f3" fill={hex.trixel_colour_f3} d="M104 135L103.99 165L78 150.008L104 135Z" />
	<DraggyPath position="f4" fill={hex.trixel_colour_f4} d="M104 165L104.01 135L130 149.992L104 165Z" />
	<DraggyPath position="f5" fill={hex.trixel_colour_f5} d="M130 120L129.99 150L104 135.008L130 120Z" />
	<DraggyPath position="f6" fill={hex.trixel_colour_f6} d="M130 150L130.01 120L156 134.992L130 150Z" />
	<DraggyPath position="f7" fill={hex.trixel_colour_f7} d="M156 105L155.99 135L130 120.008L156 105Z" />
</>
}
const DraggyHex = forwardRef(({
	className,
	focusedHexOrder,
	order,
	newHex,
	setNewHex,
	currentColour,
	csrfToken,
	publishAllowed
}, ref) => {
	const [currentPositionReference, updateCurrentPositionReference] = useState(null)
	const posiFromOrder = positionFromOrderNumber(order)

  return (
		<>
			<svg
				id={`id-${order}`}
				viewBox="0 0 156 180"
				width="300px"
				className={classNames(className, "z-10", {"opacity-50": focusedHexOrder && focusedHexOrder !== order})}
				style={{
					transform: `translate(${posiFromOrder.leftTransform}em, ${posiFromOrder.topTransform}em)`,
					width: '6.6em',
					clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
				}}
				ref={ref}
				onMouseLeave={() => {
					if (currentPositionReference !== null) {
						updateCurrentPositionReference(null)
						if (publishAllowed.current) {
							sendNewPaths({order, hex: newHex, csrfToken})
						}
					}
				}}
				onMouseUp={() => {
					updateCurrentPositionReference(null)
					if (publishAllowed.current) {
						sendNewPaths({order, hex: newHex, csrfToken})
					}
				}}
				onMouseDown={(e) => {
					if (e.target.tagName === "path") {
						const position = e.target.dataset.position
						updateCurrentPositionReference(position)
						updatePathsFn({
							pathPosition: position,
							newHex,
							setNewHex,
							publishAllowed,
							currentColour
						})
					}
				}}
				onMouseMove={(e) => {
					if(currentPositionReference !== null) {
						const position = e.target.dataset.position
						if (currentPositionReference !== position) {
							updatePathsFn({
								pathPosition: position,
								newHex,
								setNewHex,
								publishAllowed,
								currentColour
							})
							updateCurrentPositionReference(position)
						}
					}
				}}
			>
				<Trixels hex={newHex} />
			</svg>
		</>
  )
})

export default DraggyHex
