import classNames from 'classnames'
import React, { forwardRef } from 'react'

const HexWrapper = forwardRef(({minWidth, minHeight, children}, ref) => {
	return (
		<main
			ref={ref}
			className={classNames(
				"h-screen bg-gray-100 w-screen sm:w-full",
				"flex relative p-12",
				"fixed sm:relative overflow-auto sm:overflow-visible")}
			style={{
				minHeight,
				minWidth
			}}
		>
			{children}
		</main>
	)
})

export default HexWrapper
