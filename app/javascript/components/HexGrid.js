import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'

import HexOuter from './HexOuter'
import Trixels from './Trixels'

const HexGrid = ({
	hexes,
	currentDraftHexOrder,
	focusedHexOrder,
	setFocusedHexOrder,
	focusedHex,
	currentlyPanning,
	children
}) => {

	useEffect(() =>  {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual"
		}
	},[]);


	return (
		<>
			{hexes.map((l, li) => {
				return <Fragment key={li}>{l.map((h, ti) => {

					if (Object.keys(h).length !== 0 && h.order !== currentDraftHexOrder) {
						return <HexOuter
							onClick={
								 !currentlyPanning && !currentDraftHexOrder ? (e) => {
									if (document && window) {
										if (!focusedHexOrder || (focusedHexOrder && focusedHexOrder !== h.order)) {
											setFocusedHexOrder(h.order)
											window.history.pushState("", "", window.location.origin + `#${h.order}`)
										} else {
											setFocusedHexOrder(null)
											window.history.pushState("", "", window.location.origin)
										}
									}
								} : undefined
							}
							ref={h.order === focusedHexOrder ? focusedHex : undefined}
							order={h.order}
							focusedHexOrder={focusedHexOrder}
							newHexPage={!!currentDraftHexOrder}
							key={`${li}-${ti}`}
							className={classNames(
								'transform',
								{'pointer-events-none': currentlyPanning}
							)}
							spacing={{
								top: h.top,
								right: h.right,
								bottom: h.bottom,
								left: h.left
							}}
						>
							{!h.draft ?
								<Trixels hex={h} />
							: <>
								<path fillRule="evenodd" clipRule="evenodd" d="M78.75 0.711426L156.75 45.7114V135.711L78.75 180.711L0.75 135.711V45.7114L78.75 0.711426Z" fill="#E5E7EB"/>
								<path d="M58.966 97C62.1659 97 64.9047 94.3151 64.9318 90.9726C64.9047 87.6849 62.1659 85 58.966 85C55.6577 85 52.9731 87.6849 53.0002 90.9726C52.9731 94.3151 55.6577 97 58.966 97ZM78.6803 97C81.8802 97 84.619 94.3151 84.6461 90.9726C84.619 87.6849 81.8802 85 78.6803 85C75.372 85 72.6874 87.6849 72.7145 90.9726C72.6874 94.3151 75.372 97 78.6803 97ZM98.3675 97C101.567 97 104.306 94.3151 104.333 90.9726C104.306 87.6849 101.567 85 98.3675 85C95.0592 85 92.3746 87.6849 92.4017 90.9726C92.3746 94.3151 95.0592 97 98.3675 97Z" fill="#94A3B8"/>
							</>}
						</HexOuter>
					}
				})}</Fragment>
			})}
			{children}
    </>
	)
}

export default HexGrid
