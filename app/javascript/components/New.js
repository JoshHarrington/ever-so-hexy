import React, { useRef, useState, useEffect } from "react"
import classNames from "classnames"
import Panzoom from '@panzoom/panzoom'
import { debounce, isPublishingEnabled, panScrollAndZoom, updateAllTrixelsFn } from "../utils"
import HexGrid from "./HexGrid"
import HexWrapper from "./HexWapper"
import { Back } from "./Icons"
import { Badge, TextBadge } from "./Badge"
import DraggyHex from "./DraggyHex"
import { hexZoomLevel, maxZoomLevel, minZoomLevel, mobileBreakpoint, mobileHexZoomLevel } from "../constants"
import { Modal } from "./Modal"
import Portal from "./Portal"
import Tooltip from "./Tooltip"

const New = ({allHexes, currentDraftHex, csrfToken}) => {

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
	const hexes = [...allHexes]

	const [zoomLevel, setZoomLevel] = useState(minZoomLevel)
	const zoomLevelRef = useRef(zoomLevel)

	useEffect(() => {
		zoomLevelRef.current = zoomLevel
	}, [zoomLevel])

	const [pageReady, setPageReady] = useState(false)

	const hexWrapperRef = useRef(null)

	const [newHex, setNewHex] = useState(currentDraftHex)
	const publishAllowed = useRef(newHex ? isPublishingEnabled(newHex) : false)

	useEffect(() => {
		if (document && document.body) {
			document.body.classList.add('overflow-hidden')
		}
	}, [])

	let setupFocusedHexOrder = null
	if (currentDraftHex) {
		setupFocusedHexOrder = currentDraftHex.order
	} else if (window && window.location.hash.replace("#", "")) {
		setupFocusedHexOrder = parseInt(window.location.hash.replace("#", ""))
	}

	const [focusedHexOrder, setFocusedHexOrder] = useState(setupFocusedHexOrder)
	const focusedHex = useRef(null)

	useEffect(() => {

		if (document && window && (!!focusedHex.current && !!focusedHexOrder)) {
			const panzoom = Panzoom(hexWrapperRef.current, {
				minScale: minZoomLevel,
				maxScale: maxZoomLevel,
				origin: '0 0',
				disablePan: true
			})

			const destroyPanzoom = () => {
				setTimeout(() => {
					panzoom.destroy()
					hexWrapperRef.current.style.cursor = 'default'
				}, 50)
			}
			hexWrapperRef.current.addEventListener('panzoompan', destroyPanzoom)

			const handleResize = debounce(
				() => {
					if (focusedHex.current) {
						const desiredZoomLevel = window.innerWidth < mobileBreakpoint ? mobileHexZoomLevel : hexZoomLevel
						panScrollAndZoom({panzoom, hex: focusedHex.current, setPageReady, desiredZoomLevel})
					}
				},
				400,
				false
			)

			window.addEventListener('resize', handleResize)
			handleResize()

			return () => {
				window.removeEventListener('resize', handleResize)
				hexWrapperRef.current.removeEventListener('panzoompan', destroyPanzoom)
			}
		}
	}, [focusedHexOrder, setPageReady])

	const [draftModalOpen, setDraftModalOpen] = useState(false)

	return (
		<>
			<HexWrapper
				ref={hexWrapperRef}
			>
				<HexGrid
					hexes={hexes}
					currentDraftHexOrder={currentDraftHex.order}
					setPageReady={setPageReady}
					hexWrapperRef={hexWrapperRef}
          focusedHexOrder={focusedHexOrder}
          setFocusedHexOrder={setFocusedHexOrder}
					focusedHex={focusedHex}
					zoomLevel={zoomLevel}
					setZoomLevel={setZoomLevel}
				>
					<DraggyHex
						ref={currentDraftHex.order === focusedHexOrder ? focusedHex : undefined}
						focusedHexOrder={focusedHexOrder}
						order={currentDraftHex.order}
						newHex={newHex}
						setNewHex={setNewHex}
						csrfToken={csrfToken}
						publishAllowed={publishAllowed}
						className={classNames(
							`absolute transform`
						)}
						currentColour={currentColour}
					/>

				</HexGrid>
			</HexWrapper>
			<div
				className={classNames(
					"fixed h-screen right-0 top-0 flex items-center z-10 pointer-events-none",
					{"hidden": !pageReady}
				)}
			>
				<div
					data-testid="palette-picker"
					className="bg-white w-full p-8 pr-6 flex flex-col rounded-l-16xl shadow pointer-events-auto"
				>
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
								newHex,
								setNewHex,
								order: currentDraftHex.order,
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
								newHex,
								setNewHex,
								order: currentDraftHex.order,
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
			{draftModalOpen && <Portal><Modal dismiss={() => setDraftModalOpen(false)}>
				<h3 className="text-3xl font-bold mb-3">Delete draft?</h3>
				<p className="mb-5">This hexagon draft will be deleted</p>
				<div className="flex items-center">
					<TextBadge
						onClick={() => {
							fetch(`/hexes/${currentDraftHex.order}`, {
								method: 'delete',
								headers: {
									"X-CSRF-Token": csrfToken,
									'Content-Type': 'application/json'
								}
							})
							.then(response => response.json())
							.then(data => {
								if (data.status === 302) {
									window.location.href = data.redirect_to
								}
							})
						}}
					>Delete draft</TextBadge>
					<TextBadge
						hasWhiteBackground={true}
						className="ml-3"
						onClick={() => setDraftModalOpen(false)}
					>
						Continue editing
					</TextBadge>
				</div>
			</Modal></Portal>}
			<div className="fixed bottom-0 flex justify-between px-6 pb-8 text-lg z-10 w-full pointer-events-none">
				<Tooltip
					content="Back"
					className="mr-auto"
				>
					<Badge
						href="/"
						className="mr-auto"
						onClick={(e) => {
							e.preventDefault()
							setDraftModalOpen(true)
						}}
					><Back className="w-6 h-6" /></Badge>
				</Tooltip>
				{publishAllowed.current &&
					<form
						className="mr-auto -ml-10"
						action={`/hexes/${currentDraftHex.order}/publish`}
						method="get"
					>
						<TextBadge testid="add-hex-button">Save and add to grid</TextBadge>
					</form>
				}
			</div>
		</>
	)
}

export default New
