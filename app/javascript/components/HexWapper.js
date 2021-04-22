import React from 'react'

const HexWrapper = ({minWidth, minHeight, children}) => {
	return (
		<main
			className="h-screen bg-gray-100 w-full flex p-12 overflow-visible"
			style={{
				minHeight: minHeight,
				minWidth: minWidth
			}}
		>
			{children}
		</main>
	)
}

export default HexWrapper
