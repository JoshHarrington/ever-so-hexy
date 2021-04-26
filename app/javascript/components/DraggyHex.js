import React, { forwardRef, useRef, useState } from 'react'

var classNames = require('classnames')

const DraggyPath = ({
	colour,
	position,
	d
}) => {
	return (
		<path
			data-position={position}
			fill={colour}
			d={d}
			stroke={colour && colour !== "white" && colour !== "#fff" ? colour : "rgb(226,226,226)"}
			strokeWidth={colour && colour !== "white" && colour !== "#fff" ? "0" : "1"}
		></path>
	)
}

const sendNewPaths = ({id, statefulPaths, updatePaths, csrfToken}) => {
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
		updatePaths(data)
	})
	.catch((error) => {
		console.log('Error', error)
	})
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
					colour: currentColour.hex,
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
				onMouseLeave={() => {
					if (currentPositionReference !== null) {
						updateCurrentPositionReference(null)
						if (publishAllowed.current) {
							sendNewPaths({id, statefulPaths, updatePaths, csrfToken})
						}
					}
				}}
				onMouseUp={() => {
					updateCurrentPositionReference(null)
					if (publishAllowed.current) {
						sendNewPaths({id, statefulPaths, updatePaths, csrfToken})
					}
				}}
				onMouseDown={(e) => {
					if (e.target.tagName === "path") {
						const position = e.target.dataset.position
						updateCurrentPositionReference(position)
						updatePathsFn({pathPosition: position})
					}
				}}
				onMouseMove={(e) => {
					if(currentPositionReference !== null) {
						const position = e.target.dataset.position
						if (currentPositionReference !== position) {
							updatePathsFn({pathPosition: position})
							updateCurrentPositionReference(position)
						}
					}
				}}
			>
				{statefulPaths.map(p => <DraggyPath
					key={p.position}
					colour={p.colour}
					position={p.position}
					d={p.d}
				/>)}
			</svg>
			{publishAllowed.current && <form
				className="fixed bottom-0 right-0 mr-8 mb-8 text-lg z-10"
				action={`/tiles/${id}/publish`}
				method="get"
			>
				<button className="bg-gray-200 border-2 border-solid border-gray-400 shadow py-1 px-2 rounded">Publish</button>
			</form>}
		</>
  )
})

export default DraggyHex
