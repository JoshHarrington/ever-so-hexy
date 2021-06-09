import React from 'react'
import SimpleTooltip from 'react-simple-tooltip'
import classNames from 'classnames'

const Tooltip = ({content, className, children}) => (
	<>
		<span className="sr-only">{content}</span>
		<SimpleTooltip
			className={classNames(className, "whitespace-nowrap")}
			content={content}
			fontFamily="Inter"
			fontSize="14px"
			padding={7}
			radius={2}
			background="#2d2d2d"
		>
			{children}
		</SimpleTooltip>
	</>
)

export default Tooltip
