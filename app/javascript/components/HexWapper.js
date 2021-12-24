import classNames from 'classnames'
import React, { forwardRef } from 'react'
import { defaultZoomLevel, mobileBreakpoint } from '../constants'

const HexWrapper = forwardRef(({hexWrapperSize, windowSize, children}, ref) => {

	const wrapperMinWidth = windowSize.width < mobileBreakpoint ? windowSize.width : windowSize.width / defaultZoomLevel
	const wrapperMinHeight = windowSize.width < mobileBreakpoint ? windowSize.height : windowSize.height / defaultZoomLevel

	return (
		<div className="relative w-full h-screen">
			<div
				ref={ref}
				data-testid="hex-wrapper"
				className={classNames(
					"w-full",
					"shadow bg-gray-100",
					"flex absolute",
					"overflow-visible")
				}
				style={{
					width: hexWrapperSize.width + 'em',
					height: hexWrapperSize.height + 'em',
					minWidth: wrapperMinWidth,
					minHeight: wrapperMinHeight
				}}
			>
				{children}
			</div>
		</div>
	)
})

export default HexWrapper
