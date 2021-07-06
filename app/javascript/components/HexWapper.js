import classNames from 'classnames'
import React, { forwardRef, useEffect, useState } from 'react'
import { debounce } from '../utils';

const HexWrapper = forwardRef(({minWidth, minHeight, children}, ref) => {

	const [minWidthState, updateMinWidth] = useState(minWidth)
	const [minHeightState, updateMinHeight] = useState(minHeight)

  useEffect(() => {
    const handleResize = debounce(
      () => {
        if (window.innerWidth > 639) {
					updateMinWidth(minWidth)
					updateMinHeight(minHeight)
        } else {
          updateMinWidth(null)
					updateMinHeight(null)
        }
      },
      400,
      false
    )
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, []);

	return (
		<main
			ref={ref}
			className={classNames(
				"h-screen bg-gray-100 w-screen sm:w-full",
				"flex relative p-12 w-screen",
				"fixed sm:relative overflow-auto sm:overflow-visible")}
			style={{
				minHeight: minHeightState,
				minWidth: minWidthState
			}}
		>
			{children}
		</main>
	)
})

export default HexWrapper
