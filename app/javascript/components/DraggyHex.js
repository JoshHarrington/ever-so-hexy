import React, { forwardRef, useRef, useState } from 'react'

var classNames = require('classnames')

const DraggyPath = ({
	colour,
	id,
	style,
	d,
	onMouseDown,
	onMouseMove,
	onMouseUp
}) => {
	return (
		<path
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			id={id}
			fill={colour}
			style={style}
			d={d}
			stroke={colour && colour !== "white" ? colour : "rgba(189,189,189,0.64)"}
			strokeWidth={colour && colour !== "white" ? "0" : "1"}
		></path>
	)
}

const DraggyHex = forwardRef(({
	className,
	style,
	focusedHexId,
	id,
	trixels,
	currentColour,
	csrfToken
}, ref) => {
	const [currentPositionReference, updateCurrentPositionReference] = useState(null)

	const [statefulPaths, updatePaths] = useState(trixels)

	const publishAllowed = useRef(trixels.filter(t => t.colour !== "white" && t.colour !== "#fff").length > 5)

	const updatePathsFn = ({pathPosition}) => {
		const updatedPaths = statefulPaths.map(p => {
			if (p.position !== pathPosition) {
				return p
			} else {
				return {
					tile_id: id,
					colour: currentColour,
					position: p.position,
					d: p.d
				}
			}
		})
		updatePaths(updatedPaths)
		publishAllowed.current = statefulPaths.filter(t => t.colour !== "white" && t.colour !== "#fff").length > 5
	}

  return (
		<>
			<svg
				id={id}
				viewBox="0 0 156 180"
				width="300px"
				className={classNames(className, {"opacity-50": focusedHexId && focusedHexId !== id})}
				style={style ? style : {}}
				ref={ref}
			>
				{statefulPaths.map(p => <DraggyPath
					id={p.position}
					key={p.position}
					colour={p.colour}
					d={p.d}
					onMouseDown={(e) => {
						updateCurrentPositionReference(p.position)
						updatePathsFn({pathPosition: p.position})
					}}
					onMouseMove={(e) => {
						if(currentPositionReference !== null) {
							if (currentPositionReference !== p.position) {
								updatePathsFn({pathPosition: p.position})
								updateCurrentPositionReference(p.position)
							}
						}
					}}
					onMouseUp={(e) => {
						updateCurrentPositionReference(null)
						if (publishAllowed.current) {

							fetch(`/tiles/${id}`, {
								method: 'POST',
								headers: {
									"X-CSRF-Token": csrfToken,
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(statefulPaths)
							})
							.then(response => response.json())
							.then(data => {
								console.log('Success', data)
								updatePaths(data)
							})
							.catch((error) => {
								console.log('Error', error)
							})
						}
					}}
				/>)}
			</svg>
			{publishAllowed.current && <form
				className="fixed bottom-0 right-0 mr-8 mb-8"
				action={`/tiles/${id}/publish`}
				method="get"
			>
				<button className="bg-gray-200 border-2 border-solid border-gray-400 shadow py-1 px-2 rounded">Publish</button>
			</form>}
		</>
  )
})

export default DraggyHex
