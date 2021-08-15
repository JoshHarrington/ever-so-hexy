import classNames from 'classnames'
import React, { forwardRef } from 'react'

const HexWrapper = forwardRef(({children}, ref) => {

	return (
		<div
			ref={ref}
			data-testid="hex-wrapper"
			className={classNames(
				"min-h-screen min-w-full",
				"shadow bg-gray-100",
				"flex absolute",
				"relative overflow-visible")}
		>
			{children}
		</div>
	)
})

export default HexWrapper
