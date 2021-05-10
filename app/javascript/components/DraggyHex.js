import React, { forwardRef, useRef, useState } from 'react'
import { sendNewPaths, updatePathsFn } from '../utils'

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

const DraggyHex = forwardRef(({
	className,
	style,
	focusedHexId,
	id,
	trixels,
	setNewTileTrixels,
	currentColour,
	csrfToken
}, ref) => {
	const [currentPositionReference, updateCurrentPositionReference] = useState(null)

	const publishAllowed = useRef(trixels.filter(t => t.colour !== "white" && t.colour !== "#fff").length > 5)

  return (
		<>
			<svg
				id={`id-${id}`}
				viewBox="0 0 156 180"
				width="300px"
				className={classNames(className, "z-10", {"opacity-50": focusedHexId && focusedHexId !== id})}
				style={style ? style : {}}
				ref={ref}
				onMouseLeave={() => {
					if (currentPositionReference !== null) {
						updateCurrentPositionReference(null)
						if (publishAllowed.current) {
							sendNewPaths({id, trixels, setNewTileTrixels, csrfToken})
						}
					}
				}}
				onMouseUp={() => {
					updateCurrentPositionReference(null)
					if (publishAllowed.current) {
						sendNewPaths({id, trixels, setNewTileTrixels, csrfToken})
					}
				}}
				onMouseDown={(e) => {
					if (e.target.tagName === "path") {
						const position = e.target.dataset.position
						updateCurrentPositionReference(position)
						updatePathsFn({
							pathPosition: position,
							trixels,
							setNewTileTrixels,
							publishAllowed,
							id,
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
								trixels,
								setNewTileTrixels,
								publishAllowed,
								id,
								currentColour
							})
							updateCurrentPositionReference(position)
						}
					}
				}}
			>
				{trixels.map(p => <DraggyPath
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
