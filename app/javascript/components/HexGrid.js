import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'

import HexOuter from './HexOuter'

const Trixels = ({hex}) => {

	return <>
		<path fill={hex.trixel_colour_a1} d="M0 75L0.00962452 45L26 59.9917L0 75Z" />
		<path fill={hex.trixel_colour_a2} d="M26 30L25.9904 60L0 45.0083L26 30Z" />
		<path fill={hex.trixel_colour_a3} d="M26 60L26.0096 30L52 44.9917L26 60Z" />
		<path fill={hex.trixel_colour_a4} d="M52 15L51.9904 45L26 30.0083L52 15Z" />
		<path fill={hex.trixel_colour_a5} d="M52 45L52.0096 15L78 29.9917L52 45Z" />
		<path fill={hex.trixel_colour_a6} d="M78 0L77.9904 30L52 15.0083L78 0Z" />
		<path fill={hex.trixel_colour_a7} d="M78 30L78.0096 0L104 14.9917L78 30Z" />
		<path fill={hex.trixel_colour_b1} d="M0 105L0.00962452 75L26 89.9917L0 105Z" />
		<path fill={hex.trixel_colour_b2} d="M26 60L25.9904 90L0 75.0083L26 60Z" />
		<path fill={hex.trixel_colour_b3} d="M26 90L26.0096 60L52 74.9917L26 90Z" />
		<path fill={hex.trixel_colour_b4} d="M52 45L51.9904 75L26 60.0083L52 45Z" />
		<path fill={hex.trixel_colour_b5} d="M52 75L52.0096 45L78 59.9917L52 75Z" />
		<path fill={hex.trixel_colour_b6} d="M78 30L77.9904 60L52 45.0083L78 30Z" />
		<path fill={hex.trixel_colour_b7} d="M78 60L78.0096 30L104 44.9917L78 60Z" />
		<path fill={hex.trixel_colour_b8} d="M104 15L103.99 45L78 30.0083L104 15Z" />
		<path fill={hex.trixel_colour_b9} d="M104 45L104.01 15L130 29.9917L104 45Z" />
		<path fill={hex.trixel_colour_c1} d="M0 135L0.00962452 105L26 119.992L0 135Z" />
		<path fill={hex.trixel_colour_c2} d="M26 90L25.9904 120L0 105.008L26 90Z" />
		<path fill={hex.trixel_colour_c3} d="M26 120L26.0096 90L52 104.992L26 120Z" />
		<path fill={hex.trixel_colour_c4} d="M52 75L51.9904 105L26 90.0083L52 75Z" />
		<path fill={hex.trixel_colour_c5} d="M52 105L52.0096 75L78 89.9917L52 105Z" />
		<path fill={hex.trixel_colour_c6} d="M78 60L77.9904 90L52 75.0083L78 60Z" />
		<path fill={hex.trixel_colour_c7} d="M78 90L78.0096 60L104 74.9917L78 90Z" />
		<path fill={hex.trixel_colour_c8} d="M104 45L103.99 75L78 60.0083L104 45Z" />
		<path fill={hex.trixel_colour_c9} d="M104 75L104.01 45L130 59.9917L104 75Z" />
		<path fill={hex.trixel_colour_c10} d="M130 30L129.99 60L104 45.0083L130 30Z" />
		<path fill={hex.trixel_colour_c11} d="M130 60L130.01 30L156 44.9917L130 60Z" />
		<path fill={hex.trixel_colour_d1} d="M26 120L25.9904 150L0 135.008L26 120Z" />
		<path fill={hex.trixel_colour_d2} d="M52 105L51.9904 135L26 120.008L52 105Z" />
		<path fill={hex.trixel_colour_d3} d="M26 150L26.0096 120L52 134.992L26 150Z" />
		<path fill={hex.trixel_colour_d4} d="M52 135L52.0096 105L78 119.992L52 135Z" />
		<path fill={hex.trixel_colour_d5} d="M78 90L77.9904 120L52 105.008L78 90Z" />
		<path fill={hex.trixel_colour_d6} d="M78 120L78.0096 90L104 104.992L78 120Z" />
		<path fill={hex.trixel_colour_d7} d="M104 75L103.99 105L78 90.0083L104 75Z" />
		<path fill={hex.trixel_colour_d8} d="M104 105L104.01 75L130 89.9917L104 105Z" />
		<path fill={hex.trixel_colour_d9} d="M130 60L129.99 90L104 75.0083L130 60Z" />
		<path fill={hex.trixel_colour_d10} d="M130 90L130.01 60L156 74.9917L130 90Z" />
		<path fill={hex.trixel_colour_d11} d="M156 45L155.99 75L130 60.0083L156 45Z" />
		<path fill={hex.trixel_colour_e1} d="M52 135L51.9904 165L26 150.008L52 135Z" />
		<path fill={hex.trixel_colour_e2} d="M52 165L52.0096 135L78 149.992L52 165Z" />
		<path fill={hex.trixel_colour_e3} d="M78 120L77.9904 150L52 135.008L78 120Z" />
		<path fill={hex.trixel_colour_e4} d="M78 150L78.0096 120L104 134.992L78 150Z" />
		<path fill={hex.trixel_colour_e5} d="M104 105L103.99 135L78 120.008L104 105Z" />
		<path fill={hex.trixel_colour_e6} d="M104 135L104.01 105L130 119.992L104 135Z" />
		<path fill={hex.trixel_colour_e7} d="M130 90L129.99 120L104 105.008L130 90Z" />
		<path fill={hex.trixel_colour_e8} d="M130 120L130.01 90L156 104.992L130 120Z" />
		<path fill={hex.trixel_colour_e9} d="M156 75L155.99 105L130 90.0083L156 75Z" />
		<path fill={hex.trixel_colour_f1} d="M78 150L77.9904 180L52 165.008L78 150Z" />
		<path fill={hex.trixel_colour_f2} d="M78 180L78.0096 150L104 164.992L78 180Z" />
		<path fill={hex.trixel_colour_f3} d="M104 135L103.99 165L78 150.008L104 135Z" />
		<path fill={hex.trixel_colour_f4} d="M104 165L104.01 135L130 149.992L104 165Z" />
		<path fill={hex.trixel_colour_f5} d="M130 120L129.99 150L104 135.008L130 120Z" />
		<path fill={hex.trixel_colour_f6} d="M130 150L130.01 120L156 134.992L130 150Z" />
		<path fill={hex.trixel_colour_f7} d="M156 105L155.99 135L130 120.008L156 105Z" />
	</>
}

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
