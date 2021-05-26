import React from 'react'
import { positionFromOrderNumber } from "../utils"

const DraftHex = ({order}) => {
	const posiFromOrder = positionFromOrderNumber(order)
	return (
		<svg
			id={`id-${order}`}
			className="absolute transform"
			viewBox="0 0 157 181"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			width="300px"
      style={{
        transform: `translate(${posiFromOrder.leftTransform}em, ${posiFromOrder.topTransform}em)`,
        width: '6.6em',
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
      }}
		>
			<path fillRule="evenodd" clipRule="evenodd" d="M78.75 0.711426L156.75 45.7114V135.711L78.75 180.711L0.75 135.711V45.7114L78.75 0.711426Z" fill="#E5E7EB"/>
			<path d="M58.966 97C62.1659 97 64.9047 94.3151 64.9318 90.9726C64.9047 87.6849 62.1659 85 58.966 85C55.6577 85 52.9731 87.6849 53.0002 90.9726C52.9731 94.3151 55.6577 97 58.966 97ZM78.6803 97C81.8802 97 84.619 94.3151 84.6461 90.9726C84.619 87.6849 81.8802 85 78.6803 85C75.372 85 72.6874 87.6849 72.7145 90.9726C72.6874 94.3151 75.372 97 78.6803 97ZM98.3675 97C101.567 97 104.306 94.3151 104.333 90.9726C104.306 87.6849 101.567 85 98.3675 85C95.0592 85 92.3746 87.6849 92.4017 90.9726C92.3746 94.3151 95.0592 97 98.3675 97Z" fill="#94A3B8"/>
		</svg>
	)
}

export default DraftHex
