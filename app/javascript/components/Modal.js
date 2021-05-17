import classNames from 'classnames'
import React from 'react'

const Modal = ({dismiss, children}) => {
	return (
		<div
			className={classNames(
				"w-full h-screen flex items-center justify-center",
				"fixed top-0 left-0 z-10 p-3"
			)}
		>
			<div
				className="bg-gray-800 opacity-50 w-full h-full absolute z-1 cursor-pointer"
				onClick={() => dismiss()}
			></div>
			<div className="bg-white rounded-16xl relative z-2 py-8 px-10 w-96 max-w-3xl">{children}</div>
		</div>
	)
}

export {
	Modal
}
