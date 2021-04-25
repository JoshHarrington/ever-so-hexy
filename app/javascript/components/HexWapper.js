import React, { forwardRef } from 'react'

const HexWrapper = forwardRef(({minWidth, minHeight, children}, ref) => {
	return (
		<main
			ref={ref}
			className="h-screen bg-gray-100 w-full flex overflow-visible"
			style={{
				minHeight: minHeight,
				minWidth: minWidth,
				padding: "3em"
			}}
		>
			{children}
		</main>
	)
})

export default HexWrapper
