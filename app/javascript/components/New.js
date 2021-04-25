import classNames from "classnames"
import React, { useState } from "react"
import { splitIntoLayers } from "../utils"
import HexGrid from "./HexGrid"
import HexWrapper from "./HexWapper"

const New = ({allHexes, currentDraftTileID, csrfToken}) => {

	const [currentColour, updateCurrentColor] = useState('red')
	const newTileId = currentDraftTileID
	const tiles = splitIntoLayers(allHexes)

	const [pageReady, setPageReady] = useState(false)

  const NumberOfLayers = tiles.length
  const LayerWithMostTiles = [...tiles].sort((a,b) => (
    b.length - a.length
  ))[0]

	const colours = [
		"red",
		"green",
		"blue"
	]

	return (
		<HexWrapper
			minWidth={`${NumberOfLayers * 7 + 6}rem`}
			minHeight={`${(LayerWithMostTiles.length - 1) * 6 + 14}rem`}
		>
			<HexGrid
				csrfToken={csrfToken}
				tiles={tiles}
				newHexId={newTileId}
				currentColour={currentColour}
				setPageReady={setPageReady}
			/>
			<div className={classNames(
				"fixed h-screen w-12 right-0 top-0 flex items-center",
				{"hidden": !pageReady}
			)}>
				<div className="bg-white w-full p-2 flex flex-col rounded-l">
					{colours.map((c, i) => <button
						key={i}
						onClick={() => updateCurrentColor(c)}
						className={classNames(
							"rounded-full h-4 w-4 mt-1 first:mt-0 focus:outline-none",
							{"ring ring-4": c === currentColour},
							{"ring-red-300": c === "red",
								"ring-blue-300": c === "blue",
								"ring-green-300": c === "green"})
						}
						style={{
							backgroundColor: c
						}}
					></button>)}
				</div>
			</div>
			{/* <p className={classNames({
				'bg-red-500': currentColour === 'red',
				'bg-blue-500': currentColour === 'blue',
				'bg-green-500': currentColour === 'green'
			}, 'inline-block p-3')}>{currentColour}</p>
			<DraggyHex
				currentColour={currentColour}
			/>
			<div className="flex">
				<button onClick={() => updateCurrentColor('red')} className="bg-red-500">Red colour</button>
				<button onClick={() => updateCurrentColor('blue')} className="bg-blue-500">Blue colour</button>
				<button onClick={() => updateCurrentColor('green')} className="bg-green-500">Green colour</button>
			</div>
			<div className="flex hidden">
				<button onClick={() => console.log('clear all')} className="bg-pink-300 mr-3">Clear all</button>
				<button onClick={() => console.log('fill all')} className="bg-pink-300">Fill all</button>
			</div> */}
		</HexWrapper>
	)
}

export default New
