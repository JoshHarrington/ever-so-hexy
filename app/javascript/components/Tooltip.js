import React from 'react'
import SimpleTooltip from 'react-simple-tooltip'
import classNames from 'classnames'

const Tooltip = ({content, className, placement, children}) => (
	<SimpleTooltip
		className={classNames(className, "whitespace-nowrap")}
		content={content}
		fontFamily="Inter"
		fontSize="14px"
		padding={7}
		radius={2}
		placement={placement}
		background="#2d2d2d"
		aria-label={content}
	>
		{children}
	</SimpleTooltip>
)

export default Tooltip
