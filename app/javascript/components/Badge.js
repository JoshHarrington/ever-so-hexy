import React from 'react'
import classNames from 'classnames'

const Badge = ({href, onClick, className, testid, children}) => {
	const Tag = href ? `a` : `button`
	return (
		<Tag
			href={href}
			data-testid={testid}
			onClick={onClick}
			className={classNames(
				className,
				"border-0 border-solid p-1 shadow rounded-full",
				"focus:outline-none text-teal-600 bg-white p-3.5",
				"flex items-center justify-center pointer-events-auto",
				"hover:ring hover:ring-teal-500-a25 focus:ring focus:ring-teal-500-a50"
			)}
		>{children}</Tag>
	)
}

const TextBadge = ({href, onClick, className, testid, hasWhiteBackground, disabled, children}) => {
	const Tag = href ? `a` : `button`
	return (
		<Tag
			href={href}
			data-testid={testid}
			disabled={disabled}
			className={classNames(
				className,
				{"text-white shadow bg-teal-600 hover:bg-teal-700": !hasWhiteBackground},
				{"text-teal-600 bg-white": hasWhiteBackground},
				"border-0 border-solid py-3.5 px-4 rounded-full font-bold",
				"focus:outline-none",
				"flex items-center pointer-events-auto",
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
