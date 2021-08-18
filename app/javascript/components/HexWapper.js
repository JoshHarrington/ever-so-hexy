import classNames from 'classnames'
import React, { forwardRef } from 'react'

const HexWrapper = forwardRef(({children}, ref) => {

	return (
		<div className="relative w-full h-screen">
			<div
				ref={ref}
				data-testid="hex-wrapper"
				className={classNames(
					"min-h-screen min-w-full",
					"shadow bg-gray-100",
					"flex absolute",
					"overflow-visible")}
			>
				{children}
			</div>
		</div>
	)
})

export default HexWrapper
