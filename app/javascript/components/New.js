import classNames from "classnames"
import React, { useRef, useState } from "react"
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

	const hexWrapperRef = useRef(null)

	return (
		<>
			<HexWrapper
				ref={hexWrapperRef}
				minWidth={`${NumberOfLayers * 7 + 6}em`}
				minHeight={`${(LayerWithMostTiles.length - 1) * 6 + 14}em`}
			>
				<HexGrid
					csrfToken={csrfToken}
					tiles={tiles}
					newHexId={newTileId}
					currentColour={currentColour}
					setPageReady={setPageReady}
					hexWrapperRef={hexWrapperRef}
				/>
			</HexWrapper>
			<div
				className={classNames(
					"fixed h-screen w-12 right-0 top-0 flex items-center",
					{"hidden": !pageReady}
				)}
			>
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
		</>
	)
}

export default New
