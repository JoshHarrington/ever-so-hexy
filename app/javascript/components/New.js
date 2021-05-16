import React, { useRef, useState } from "react"
import classNames from "classnames"
import { splitIntoLayers, updateAllTrixelsFn, zoomAndScroll } from "../utils"
import HexGrid from "./HexGrid"
import HexWrapper from "./HexWapper"
import { Back } from "./Icons"
import { Badge, TextBadge } from "./Badge"
import DraggyHex from "./DraggyHex"

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
	const newHexId = currentDraftTileID
	const tiles = splitIntoLayers(allHexes)

	const [pageReady, setPageReady] = useState(false)

  const NumberOfLayers = tiles.length
  const LayerWithMostTiles = [...tiles].sort((a,b) => (
    b.length - a.length
  ))[0]

	const hexWrapperRef = useRef(null)

	const [newTileTrixels, setNewTileTrixels] = useState(allHexes.filter(h => h[0].tile_id === newHexId)[0])
	const publishAllowed = useRef(newTileTrixels.filter(t => t.colour !== "white" && t.colour !== "#fff").length > 5)


	let setupFocusedHexId = null
	if (newHexId) {
		setupFocusedHexId = newHexId
	} else if (window && window.location.hash.replace("#", "")) {
		setupFocusedHexId = parseInt(window.location.hash.replace("#", ""))
	}

	const [focusedHexId, setFocusedHexId] = useState(setupFocusedHexId)
	const focusedHex = useRef(null)



	let leftTransform = 0
	let topTransform = 0

	const hexPosition = tiles.filter((l, li) => (
		l.filter((t, ti) => {
			if (t[0].tile_id === newHexId) {
				leftTransform = (li * 7) - (ti * 3.5)
				topTransform = ti * 6
			}
			return t[0].tile_id === newHexId
		}).length > 0
	))

	useEffect(() => {
		if (document && window && !!newHexId) {
			zoomAndScroll({
				elementProps: document.querySelector(`svg#id-${newHexId}`).getBoundingClientRect(),
				hexSizePercentage: 70,
				window,
				zoomLevel: zoomLevelRef.current,
				setPageReady,
				setZoomLevel
			})
		}
	}, [newHexId, setPageReady])

	return (
		<>
			<HexWrapper
				ref={hexWrapperRef}
				minWidth={`${NumberOfLayers * 7 + 6}em`}
				minHeight={`${(LayerWithMostTiles.length - 1) * 6 + 14}em`}
			>
				<HexGrid
					tiles={tiles}
					newHexId={newHexId}
					setPageReady={setPageReady}
					hexWrapperRef={hexWrapperRef}
          focusedHexId={focusedHexId}
          setFocusedHexId={setFocusedHexId}
					focusedHex={focusedHex}
				>
					<DraggyHex
						ref={newHexId === focusedHexId ? focusedHex : undefined}
						focusedHexId={focusedHexId}
						id={newHexId}
						trixels={newTileTrixels}
						setNewTileTrixels={setNewTileTrixels}
						csrfToken={csrfToken}
						publishAllowed={publishAllowed}
						className={classNames(
							`absolute transform`
						)}
						style={{
							transform: `translate(${leftTransform}em, ${topTransform}em)`,
							width: '6.6em',
							clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
						}}
						currentColour={currentColour}
					/>

				</HexGrid>
			</HexWrapper>
			<div
				className={classNames(
					"fixed h-screen right-0 top-0 flex items-center z-10",
					{"hidden": !pageReady}
				)}
			>
				<div className="bg-white w-full p-8 pr-6 flex flex-col rounded-l-16xl shadow">
					<div className="grid grid-cols-3 gap-2 pb-6 mb-6 border-0 border-b border-coolGray-200">
						{colours.map((c, i) => <button
							key={i}
							onClick={() => updateCurrentColor(c)}
							className={classNames(
								"ring ring-2 transition-shadow duration-150",
								"rounded-full h-10 w-10 focus:outline-none shadow-sm border border-2 border-white",
								{
									"ring-transparent hover:ring-blueGray-400": c.name !== currentColour.name,
									"ring ring-2 ring-blueGray-600": c.name === currentColour.name,
									"bg-red-400": c.name === "red-400",
									"bg-red-500": c.name === "red-500",
									"bg-red-600": c.name === "red-600",
									"bg-purple-400": c.name === "purple-400",
									"bg-purple-500": c.name === "purple-500",
									"bg-purple-600": c.name === "purple-600",
									"bg-green-400": c.name === "green-400",
									"bg-green-500": c.name === "green-500",
									"bg-green-600": c.name === "green-600",
									"bg-blueGray-400": c.name === "blueGray-400",
									"bg-blueGray-500": c.name === "blueGray-500",
									"bg-blueGray-600": c.name === "blueGray-600",
									"bg-white": c.name === "white",
									"bg-coolGray-100": c.name === "coolGray-100",
									"bg-coolGray-200": c.name === "coolGray-200",
								})
							}
						></button>)}
					</div>
					<button
						onClick={() => {
							updateAllTrixelsFn({
								trixels: newTileTrixels,
								setNewTileTrixels,
								id: newHexId,
								colour: currentColour.hex,
								csrfToken
							})
							publishAllowed.current = false
						}}
						className={classNames(
							"w-full rounded-full text-center p-2 bg-blueGray-500 text-white mb-3",
							"border border-2 border-white",
							"ring ring-2 ring-transparent transition-shadow duration-150",
							"hover:ring-blueGray-400"
						)}
					>Fill all</button>
					<button
						onClick={() => {
							updateAllTrixelsFn({
								trixels: newTileTrixels,
								setNewTileTrixels,
								id: newHexId,
								colour: "white",
								csrfToken
							})
							publishAllowed.current = false
						}}
						className={classNames(
							"w-full rounded-full text-center p-2 bg-blueGray-500 text-white mb-3",
							"border border-2 border-white",
							"ring ring-2 ring-transparent transition-shadow duration-150",
							"hover:ring-blueGray-400"
						)}
					>Clear all</button>
				</div>
			</div>
			<div className="fixed bottom-0 flex justify-center px-6 pb-8 text-lg z-10 w-full">
				<Badge href="/" className="mr-auto"><Back className="w-6 h-6" /></Badge>
				{publishAllowed.current &&
					<form
						className="mr-auto -ml-10"
						action={`/tiles/${newHexId}/publish`}
						method="get"
					>
						<TextBadge>Save and add to grid</TextBadge>
					</form>
				}
			</div>
		</>
	)
}

export default New
