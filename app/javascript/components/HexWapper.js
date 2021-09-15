import classNames from 'classnames'
import React, { forwardRef } from 'react'

const HexWrapper = forwardRef(({children}, ref) => {

	return (
		<div className="relative w-full h-screen">
			<div
				ref={ref}
				data-testid="hex-wrapper"
				className={classNames(
					"shadow bg-gray-100",
					"flex absolute",
					"overflow-visible")}
					style={{minWidth: '71.5vw', minHeight: '71.5vh'}}
			>
				{children}
			</div>
		</div>
	)
})

export default HexWrapper
