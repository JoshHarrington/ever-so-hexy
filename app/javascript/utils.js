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
	let currentOrderTileIndex = 0

	orderNumbersIntoLayers.filter((layer, layerIndex) => {
		if (layer.indexOf(currentOrderPosition) !== -1) {
			currentOrderLayerIndex = layerIndex
			currentOrderTileIndex = layer.indexOf(currentOrderPosition)
			return true
		} else {
			return false
		}
	})

	return {
		leftTransform: (currentOrderLayerIndex * 7) - (currentOrderTileIndex * 3.5),
		topTransform: currentOrderTileIndex * 6
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

const sendNewPaths = ({id, trixels, setNewTileTrixels, csrfToken}) => {
	fetch(`/tiles/${id}`, {
		method: 'POST',
		headers: {
			"X-CSRF-Token": csrfToken,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({id, trixels})
	})
	.then(response => response.json())
	.then(data => {
		if (setNewTileTrixels) {
			setNewTileTrixels(data)
		}
	})
	.catch((error) => {
		console.log('Error', error)
	})
}

const isPublishingEnabled = (trixels) => {
	const colours = trixels.map(t => t.colour)
	const publishAllowed = new Set(colours).size > 2
	return publishAllowed
}


const updatePathsFn = ({pathPosition, trixels, setNewTileTrixels, publishAllowed, currentColour}) => {
	const updatedPaths = trixels.map(p => {
		if (p.position !== pathPosition) {
			return p
		} else {
			return {
				colour: currentColour.hex,
				position: p.position,
				d: p.d
			}
		}
	})
	setNewTileTrixels(updatedPaths)
	publishAllowed.current = isPublishingEnabled(trixels)
}

const updateAllTrixelsFn = ({trixels, setNewTileTrixels, id, colour, csrfToken}) => {
	const updatedTrixels = trixels.map(p => {
		return {
			colour,
			position: p.position,
			d: p.d
		}
	})
	setNewTileTrixels(updatedTrixels)
	sendNewPaths({id, trixels: updatedTrixels, csrfToken})
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
