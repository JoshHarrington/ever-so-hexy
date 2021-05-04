import classNames from "classnames"
import React, { useRef, useState } from "react"
import { splitIntoLayers } from "../utils"
import HexGrid from "./HexGrid"
import HexWrapper from "./HexWapper"

const New = ({allHexes, currentDraftTileID, csrfToken}) => {

	const colours = [{
		name: "red-400",
		hex: "#FB7185"
	}, {
		name: "red-500",
		hex: "#F43F5E"
	}, {
		name: "red-600",
		hex: "#E11D48"
	}, {
		name: "purple-400",
		hex: "#C084FC"
	}, {
		name: "purple-500",
		hex: "#A855F7"
	}, {
		name: "purple-600",
		hex: "#9333EA"
	}, {
		name: "green-400",
		hex: "#34D399"
	},{
		name: "green-500",
		hex: "#10B981"
	},{
		name: "green-600",
		hex: "#059669"
	},{
		name: "blueGray-400",
		hex: "#94A3B8"
	},{
		name: "blueGray-500",
		hex: "#64748B"
	},{
		name: "blueGray-600",
		hex: "#475569"
	},{
		name: "white",
		hex: "#fff"
	},{
		name: "coolGray-100",
		hex: "#F3F4F6"
	},{
		name: "coolGray-200",
		hex: "#E5E7EB"
	}]

	const [currentColour, updateCurrentColor] = useState(colours[0])
	const newTileId = currentDraftTileID
	const tiles = splitIntoLayers(allHexes)

	const [pageReady, setPageReady] = useState(false)

  const NumberOfLayers = tiles.length
  const LayerWithMostTiles = [...tiles].sort((a,b) => (
    b.length - a.length
  ))[0]

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
					"fixed h-screen w-36 right-0 top-0 flex items-center",
					{"hidden": !pageReady}
				)}
			>
				<div className="bg-white w-full p-4 flex flex-col rounded-l shadow">
					<div className="grid grid-cols-3 gap-4">
						{colours.map((c, i) => <button
							key={i}
							onClick={() => updateCurrentColor(c)}
							className={classNames(
								"rounded-full h-8 w-8 focus:outline-none shadow-sm",
								{
									"ring ring-4": c.name === currentColour.name,
									"ring-red-300 bg-red-400": c.name === "red-400",
									"ring-red-300 bg-red-500": c.name === "red-500",
									"ring-red-300 bg-red-600": c.name === "red-600",
									"ring-purple-300 bg-purple-400": c.name === "purple-400",
									"ring-purple-300 bg-purple-500": c.name === "purple-500",
									"ring-purple-300 bg-purple-600": c.name === "purple-600",
									"ring-green-300 bg-green-400": c.name === "green-400",
									"ring-green-300 bg-green-500": c.name === "green-500",
									"ring-green-300 bg-green-600": c.name === "green-600",
									"ring-green-300 bg-blueGray-400": c.name === "blueGray-400",
									"ring-green-300 bg-blueGray-500": c.name === "blueGray-500",
									"ring-green-300 bg-blueGray-600": c.name === "blueGray-600",
									"ring-green-300 bg-white": c.name === "white",
									"ring-green-300 bg-coolGray-100": c.name === "coolGray-100",
									"ring-green-300 bg-coolGray-200": c.name === "coolGray-200",
								})
							}
						></button>)}
					</div>
				</div>
			</div>
		</>
	)
}

export default New
