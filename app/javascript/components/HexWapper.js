import classNames from 'classnames'
import React, { forwardRef } from 'react'

const HexWrapper = forwardRef(({children}, ref) => {

	return (
		<div
			ref={ref}
			data-testid="hex-wrapper"
			className={classNames(
				"h-screen w-full",
				"flex",
				"relative overflow-visible")}
		>
			{children}
		</div>
	)
})

export default HexWrapper
