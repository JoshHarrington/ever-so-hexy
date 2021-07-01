import classNames from 'classnames'
import React, { forwardRef } from 'react'

const HexWrapper = forwardRef(({minWidth, minHeight, children}, ref) => {
	return (
		<main
			ref={ref}
			className={classNames(
				"h-screen bg-gray-100 w-screen sm:w-full",
				"flex relative",
				"fixed sm:relative overflow-auto sm:overflow-visible")}
		>
			<div
				className="p-12"
				style={{
					minHeight,
					minWidth
				}}
			>
			{children}
			</div>
		</main>
	)
})

export default HexWrapper
