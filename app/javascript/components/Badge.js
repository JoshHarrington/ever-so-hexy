import classNames from 'classnames'
import React from 'react'

const Badge = ({href, onClick, className, children}) => {
	const Tag = href ? `a` : `button`
	return (
		<Tag
			href={href}
			onClick={onClick}
			className={classNames(
				className,
				"border-0 border-solid p-1 shadow rounded-full",
				"focus:outline-none text-teal-600 bg-white w-12 h-12",
				"flex items-center justify-center",
				"hover:ring hover:ring-teal-500-a25 focus:ring focus:ring-teal-500-a50"
			)}
		>{children}</Tag>
	)
}

const TextBadge = ({href, onClick, className, children}) => {
	const Tag = href ? `a` : `button`
	return (
		<Tag
			href={href}
			className={classNames(
				className,
				"border-0 border-solid shadow py-2 px-4 text-white rounded-full",
				"bg-teal-600 hover:bg-teal-700",
				"focus:outline-none mr-3",
				"flex items-center",
				"hover:ring hover:ring-teal-500-a25 focus:ring focus:ring-teal-500-a50"
			)}
			onClick={onClick}
		>
			{children}
		</Tag>
	)
}

export {
	Badge,
	TextBadge
}
