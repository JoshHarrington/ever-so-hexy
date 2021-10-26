import React, { useRef, useState, useEffect } from "react"
import classNames from "classnames"
import Panzoom from '@panzoom/panzoom'
import { colourNameToTailwindVariable, debounce, isPublishingEnabled, panScrollAndZoom, updateAllTrixelsFn } from "../utils"
import HexGrid from "./HexGrid"
import HexWrapper from "./HexWapper"
import { Back, HexCentre } from "./Icons"
import { Badge, TextBadge } from "./Badge"
import DraggyHex from "./DraggyHex"
import { hexZoomLevel, maxZoomLevel, minZoomLevel, mobileBreakpoint, mobileHexZoomLevel, colours, hexWrapperGutter } from "../constants"
import { Modal } from "./Modal"
import Portal from "./Portal"
import Tooltip from "./Tooltip"

const setupPanzoom = ({hexWrapper}) => {
	const panzoom = Panzoom(hexWrapper, {
		minScale: minZoomLevel,
		maxScale: maxZoomLevel,
		origin: '0 0',
		disablePan: true
	})

	return panzoom
}
const New = ({allHexes, currentDraftHex, csrfToken}) => {

	const [currentColour, updateCurrentColor] = useState(colours[0])
	const hexes = [...allHexes]

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

	const [showLoadingState, setLoadingState] = useState(true)

	useEffect(() => {

		if (document && window && (!!focusedHex.current && !!focusedHexOrder)) {

			const panzoom = setupPanzoom({hexWrapper: hexWrapperRef.current})

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
						panScrollAndZoom({panzoom, hex: focusedHex.current, setPageReady, desiredZoomLevel, setLoadingState})
					}
				},
				300,
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
			<HexWrapper ref={hexWrapperRef}>
				{showLoadingState && <div className="fixed z-20 w-full h-full bg-gray-100"></div>}
				<HexGrid
					hexes={hexes}
					currentDraftHexOrder={currentDraftHex.order}
					setPageReady={setPageReady}
          focusedHexOrder={focusedHexOrder}
          setFocusedHexOrder={setFocusedHexOrder}
					focusedHex={focusedHex}
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
						spacing={{
							top: currentDraftHex.top,
							right: currentDraftHex.right,
							bottom: currentDraftHex.bottom,
							left: currentDraftHex.left
						}}
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
							data-testid={`palette-button--${c.name}`}
							key={i}
							onClick={() => updateCurrentColor(c)}
							className={classNames(
								"ring ring-2 transition-shadow duration-150",
								"rounded-full h-10 w-10 focus:outline-none shadow-sm border border-2 border-white",
								{
									"ring-transparent hover:ring-blueGray-400": c.name !== currentColour.name,
									"ring ring-2 ring-blueGray-600": c.name === currentColour.name,
								}, colourNameToTailwindVariable({colourName: c.name}))
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
				<form
					className="mr-auto -ml-10"
					action={publishAllowed.current ? `/hexes/${currentDraftHex.order}/publish` : undefined}
					method={publishAllowed.current ? "get" : undefined}
				>
					{publishAllowed.current ?
						<TextBadge testid="add-hex-button">Save and add to grid</TextBadge>
						: <Tooltip content="Use at least three colours to enable saving">
							<TextBadge
								testid="add-hex-button"
								className={'bg-opacity-50 hover:bg-opacity-50 cursor-not-allowed hover:ring-0 hover:bg-teal-600'}
								disabled={true}
							>Save and add to grid</TextBadge>
						</Tooltip>
					}
				</form>
			</div>
		</>
	)
}

export default New
