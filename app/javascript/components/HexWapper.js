import React, { forwardRef } from 'react'

const HexWrapper = forwardRef(({width, height, children}, ref) => {
	return (
		<main
			ref={ref}
			className="h-screen w-full flex overflow-visible p-12 origin-top-left"
			style={{
				height,
				width
			}}
		>
			{children}
		</main>
	)
})

export default HexWrapper
