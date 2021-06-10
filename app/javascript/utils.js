import { useEffect, useRef } from 'react'

const splitIntoLayers = (items) => {

	let itemsInLayers = []
	let chunkSize = 1

	while (items.length) {
		itemsInLayers.push(items.splice(0, chunkSize));
		if (chunkSize < 10){
			chunkSize++
		}
	}

	return itemsInLayers

}

const positionFromOrderNumber = (currentOrderPosition) => {

	const orderNumbers = Array.from({length: currentOrderPosition}, (x, i) => i+1)
	const orderNumbersIntoLayers = splitIntoLayers(orderNumbers)

	let currentOrderLayerIndex = 0
	let currentOrderHexIndex = 0

	orderNumbersIntoLayers.filter((layer, layerIndex) => {
		if (layer.indexOf(currentOrderPosition) !== -1) {
			currentOrderLayerIndex = layerIndex
			currentOrderHexIndex = layer.indexOf(currentOrderPosition)
			return true
		} else {
			return false
		}
	})

	return {
		leftTransform: (currentOrderLayerIndex * 7) - (currentOrderHexIndex * 3.5),
		topTransform: currentOrderHexIndex * 6
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

	const xScrollPosition = Math.round(((svgLeftOffset + svgHalfWidth + window.scrollX) * (newZoomLevel / zoomLevel) - (windowWidth / 2)))
	const yScrollPosition = Math.round(((svgTopOffset + svgHalfHeight + window.scrollY) * (newZoomLevel / zoomLevel) - (windowHeight / 2)))

	const timeout = setTimeout(() => {
		window.scrollTo({
			top: yScrollPosition,
			left: xScrollPosition
		})
		if (setPageReady) {
			setPageReady(true)
		}
	}, 1)

	return () => clearTimeout(timeout)
}

export {
	splitIntoLayers,
	positionFromOrderNumber,
	debounce,
	usePrevious,
	sendNewPaths,
	updatePathsFn,
	updateAllTrixelsFn,
	zoomAndScroll,
	isPublishingEnabled
}
