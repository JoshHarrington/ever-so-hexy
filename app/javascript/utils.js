import { useEffect, useRef } from 'react'
import { hexWrapperGutter, mobileBreakpoint } from './constants'

const splitIntoLayers = (items) => {

	let itemsCopy = [...items].sort((a,b) => a.order - b.order)

	let itemsInLayers = []
	let chunkSize = 1

	while (itemsCopy.length) {
		const layerSize = .5 * chunkSize * (chunkSize + 1)
		const itemsToMoveToLayers = itemsCopy.filter(i => i.order <= layerSize)
		itemsCopy = itemsCopy.filter(i => i.order > layerSize)

		itemsInLayers.push(itemsToMoveToLayers);
		if (chunkSize < 10){
			chunkSize++
		}
	}

	return itemsInLayers

}

const positionFromOrderNumber = (currentOrderPosition) => {

	const orderNumbers = Array.from({length: currentOrderPosition}, (x, i) => ({order: i + 1}))
	const orderNumbersIntoLayers = splitIntoLayers(orderNumbers)

	let currentOrderLayerIndex = 0
	let currentOrderHexIndex = 0

	orderNumbersIntoLayers.filter((layer, layerIndex) => {
		if (layer.filter(t => t.order === currentOrderPosition).length > 0) {
			currentOrderLayerIndex = layerIndex
			currentOrderHexIndex = layer.findIndex(t => t.order === currentOrderPosition)
			return true
		} else {
			return false
		}
	})

	return {
		leftTransform: (currentOrderLayerIndex * 7) - (currentOrderHexIndex * 3.5) + hexWrapperGutter,
		topTransform: currentOrderHexIndex * 6 + hexWrapperGutter
	}
}

const marginsForFirst = ({hexesInLayers}) => {

	const numHexesInLargestLayer = hexesInLayers.length > 1 ? [...hexesInLayers].sort((a, b) => b.length - a.length)[0].length : 1

	return {
		top: hexWrapperGutter,
		right: (hexesInLayers.length - 1) * 7 + hexWrapperGutter,
		bottom: (numHexesInLargestLayer - 1) * 6 + hexWrapperGutter,
		left: hexWrapperGutter
	}
}

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
		console.log(hexCopy[`${k}`])
		hexCopy[`${k}`] = colour
	})

	setNewHex(hexCopy)
	sendNewPaths({order, hex: hexCopy, csrfToken})
}

const zoomAndScroll = ({
	elementProps,
	hexSizePercentage,
	window,
	zoomLevel,
	setPageReady,
	setZoomLevel
}) => {
	if (!elementProps) {
		return null
	}
	const svgWidth = elementProps.width
	const svgHeight = elementProps.height

	const windowWidth = window.innerWidth
	const windowHeight = window.innerHeight

	const widthRatio = svgWidth / windowWidth
	/// get the decimal fraction of the width of the svg of the total width of the window
	const heightRatio = svgHeight / windowHeight
	/// get the decimal fraction of the height of the svg of the total height of the window

	const orientationRatioToSizeOn = heightRatio >= widthRatio ? heightRatio : widthRatio

	let percentageSizeOfHex = hexSizePercentage / 100

	const newZoomLevel = zoomLevel * (percentageSizeOfHex / orientationRatioToSizeOn)
	setZoomLevel(newZoomLevel)

	const svgLeftOffset = elementProps.left
	const svgTopOffset = elementProps.top

	const svgHalfWidth = svgWidth / 2
	const svgHalfHeight = svgHeight / 2

	const isMobilePage = window.innerWidth <= mobileBreakpoint

	const xScrollPosition = Math.round(((svgLeftOffset + svgHalfWidth + window.scrollX) * (newZoomLevel / zoomLevel) - (windowWidth / 2)))
	const yScrollPosition = Math.round(((svgTopOffset + svgHalfHeight + window.scrollY) * (newZoomLevel / zoomLevel) - (windowHeight / 2)))

	const scrollObject = isMobilePage ? window.document.querySelector('main') : window

	const timeout = setTimeout(() => {
		scrollObject.scrollTo({
			top: yScrollPosition,
			left: xScrollPosition
		})
		if (setPageReady) {
			setPageReady(true)
		}
	}, 1)

	return () => clearTimeout(timeout)
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

export {
	splitIntoLayers,
	positionFromOrderNumber,
	marginsForFirst,
	debounce,
	usePrevious,
	sendNewPaths,
	updatePathsFn,
	updateAllTrixelsFn,
	zoomAndScroll,
	isPublishingEnabled,
	minPageWidth,
	minPageHeight
}
