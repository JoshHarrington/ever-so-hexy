import { useEffect, useRef } from 'react'
import { defaultZoomLevel, hexWrapperGutter, minZoomLevel, mobileBreakpoint } from './constants'

const intervalLength = 20

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const sendNewPaths = ({order, hex, csrfToken}) => {
	fetch(`/hexes/${order}`, {
		method: 'POST',
		headers: {
			"X-CSRF-Token": csrfToken,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({order, hex})
	})
	.then(response => {
		if (response.status > 199 && response.status < 300){
			return response.json()
		} else {
			window.alert('Something went wrong, please refresh the page')
		}
	})
	.then(data => {
		if (data.status === 'success') {
			console.log('Successful server update')
		} else {
			window.alert('Something went wrong, please refresh the page')
		}
	})
	.catch((error) => {
		console.log('Error', error)
	})
}

const isPublishingEnabled = (hex) => {
	const hexColorKeys = Object.keys(hex).filter(k => k.startsWith('trixel_colour'))
	const colors = hexColorKeys.map(k => hex[`${k}`])
	const publishAllowed = new Set(colors).size > 2
	return publishAllowed
}


const updatePathsFn = ({pathPosition, newHex, setNewHex, publishAllowed, currentColour}) => {
	const hexCopy = {...newHex}

	hexCopy[`trixel_colour_${pathPosition}`] = currentColour.hex

	setNewHex(hexCopy)
	publishAllowed.current = isPublishingEnabled(hexCopy)
}

const updateAllTrixelsFn = ({newHex, setNewHex, order, colour, csrfToken}) => {
	const hexCopy = {...newHex}
	const hexColorKeys = Object.keys(hexCopy).filter(k => k.startsWith('trixel_colour'))

	hexColorKeys.map(k => {
		hexCopy[`${k}`] = colour
	})

	setNewHex(hexCopy)
	sendNewPaths({order, hex: hexCopy, csrfToken})
}

const roundToNDecimalPlaces = ({number, places = 0}) => {
	if (typeof number === 'undefined' ) {
		return null
	}

	const roundShiftingNumber = 10**places
	return Math.round(number * roundShiftingNumber) / roundShiftingNumber
}

const waitUntilTrueToRunFn = ({truthyCheckFn, fn}) => {
	let intervalId, panFnRun

	const removeInterval = () => {
		clearInterval(intervalId)
		intervalId = null
	}

	const runFn = () => {
		panFnRun = true
		fn()
		removeInterval()
	}

	const checkScaleForPan = () => {
		if (truthyCheckFn() && !panFnRun){
			runFn()
		}
	}

	const createInterval = () => {
		if (!intervalId) {
			intervalId = setInterval(checkScaleForPan, intervalLength)
		}
	}

	createInterval()
}

const panScrollAndZoom = ({panzoom, hex, setPageReady, desiredZoomLevel, updateCurrentlyPanning, setLoadingState}) => {

	panzoom.zoom(desiredZoomLevel)
	setLoadingState(true)

	const panFn = () => {
		const bodyProps = hex.closest('body').getBoundingClientRect()
		const hexProps = hex.getBoundingClientRect()
		const wrapperProps = hex.parentElement.getBoundingClientRect()

		const centeringProps = {
			x: bodyProps.width/2 - hexProps.width/2,
			y: bodyProps.height/2 - hexProps.height/2
		}

		const scrollProps = {
			x: (-(-wrapperProps.x + hexProps.x) + centeringProps.x)/desiredZoomLevel,
			y: (-(-wrapperProps.y + hexProps.y) + centeringProps.y)/desiredZoomLevel
		}

		panzoom.pan(scrollProps.x, scrollProps.y, { force: true })

		setLoadingState(false)

		if (updateCurrentlyPanning) {
			updateCurrentlyPanning(false)
		}

		if (setPageReady) {
			setPageReady(true)
		}
	}

	if (hex) {
		waitUntilTrueToRunFn({truthyCheckFn: () => panzoom.getScale() == desiredZoomLevel, fn: panFn})
	}
}

const resetZoomAndPan = ({panzoom, window, updateCurrentlyPanning, hexWrapperRef, setLoadingState}) => {

	setLoadingState(true)
  const desiredZoomLevel = window.innerWidth < mobileBreakpoint ? minZoomLevel : defaultZoomLevel
  panzoom.zoom(desiredZoomLevel)

	const panFn = () => {
		const currentWrapperSize = hexWrapperRef.current.getBoundingClientRect()
		const currentZoom = panzoom.getScale()

		const panPosition = {
			x: (window.innerWidth - currentWrapperSize.width) / currentZoom,
			y: (window.innerHeight - currentWrapperSize.height) / currentZoom
		}

		panzoom.pan(panPosition.x, panPosition.y)
		setLoadingState(false)

		if (updateCurrentlyPanning) {
			updateCurrentlyPanning(false)
		}
	}

	waitUntilTrueToRunFn({truthyCheckFn: () => panzoom.getScale() == desiredZoomLevel, fn: panFn})

}

const resetFocusedHexOrder = ({setFocusedHexOrder, window}) => {
	setFocusedHexOrder(null)
	window.history.pushState("", "", window.location.origin)
}

const minPageWidth = (hexes) => {
	return `${hexes.length * 6.6 + 7.2}em`
}

const minPageHeight = (hexes) => {
	const numberOfHexesInLargestLayer = hexes.length ? [...hexes].sort((a,b) => (
		b.length - a.length
	))[0].length : 1

	return `${numberOfHexesInLargestLayer * 7.65 + 2.9}em`
}

const colourNameToTailwindVariable = ({colourName}) => {

	switch(colourName) {
		case 'red-400':
			return 'bg-red-400'
		case 'red-600':
			return 'bg-red-600'
		case 'red-700':
			return 'bg-red-700'

		case 'yellow-200':
			return 'bg-yellow-200'
		case 'yellow-300':
			return 'bg-yellow-300'
		case 'yellow-400':
			return 'bg-yellow-400'

		case 'green-400':
			return 'bg-green-400'
		case 'green-500':
			return 'bg-green-500'
		case 'green-600':
			return 'bg-green-600'

		case 'blue-400':
			return 'bg-blue-400'
		case 'blue-500':
			return 'bg-blue-500'
		case 'blue-600':
			return 'bg-blue-600'

		case 'purple-400':
			return 'bg-purple-400'
		case 'purple-500':
			return 'bg-purple-500'
		case 'purple-600':
			return 'bg-purple-600'

		case 'blueGray-400':
			return 'bg-blueGray-400'
		case 'blueGray-500':
			return 'bg-blueGray-500'
		case 'blueGray-600':
			return 'bg-blueGray-600'

		case 'white':
			return 'bg-white'
		case 'coolGray-100':
			return 'bg-coolGray-100'
		case 'coolGray-200':
			return 'bg-coolGray-200'
	}

}

export {
	debounce,
	usePrevious,
	sendNewPaths,
	updatePathsFn,
	updateAllTrixelsFn,
	isPublishingEnabled,
	minPageWidth,
	minPageHeight,
	roundToNDecimalPlaces,
	panScrollAndZoom,
	resetZoomAndPan,
	resetFocusedHexOrder,
	colourNameToTailwindVariable
}
