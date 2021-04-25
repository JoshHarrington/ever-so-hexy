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

	const colours = [{
		name: "blue",
		hex: "#3B82F6"
	},{
		name: "red",
		hex: "#F43F5E"
	}, {
		name: "green",
		hex: "#10B981"
	},{
		name: "white",
		hex: "#fff"
	}]

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
					"fixed h-screen w-24 right-0 top-0 flex items-center",
					{"hidden": !pageReady}
				)}
			>
				<div className="bg-white w-full p-4 flex flex-col rounded-l shadow">
					{colours.map((c, i) => <button
						key={i}
						onClick={() => updateCurrentColor(c)}
						className={classNames(
							"rounded-full h-8 w-8 mt-3 first:mt-0 focus:outline-none shadow-sm",
							{
								"ring ring-4": c.name === currentColour.name,
								"ring-red-300 bg-red-500": c.name === "red",
								"ring-blue-300 bg-blue-500": c.name === "blue",
								"ring-green-300 bg-green-500": c.name === "green"
							})
						}
					></button>)}
				</div>
			</div>
		</>
	)
}

export default New
