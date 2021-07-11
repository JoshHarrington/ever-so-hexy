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

const roundToNDecimalPlaces = ({number, places = 0}) => {
	if (typeof number === 'undefined' ) {
		return null
	}

	const roundShiftingNumber = 10**places
	return Math.round(number * roundShiftingNumber) / roundShiftingNumber
}

const finalScrollDetails = ({
	currentZoomLevel,
	object,
	scrollContainer,
	desiredObjectPercentage
}) => {

	if (!(('width' in object) &&
				('height' in object) &&
				('top' in object) &&
				('left' in object) &&
				('width' in scrollContainer) &&
				('height' in scrollContainer) &&
				(typeof desiredObjectPercentage === 'number') &&
				(typeof currentZoomLevel === 'number'))) {
		return false
	}

	const currentObjectToContainerWidthRatio = object.width / scrollContainer.width
	const currentObjectToContainerHeightRatio = object.height / scrollContainer.height

	const currentObjectRatio = currentObjectToContainerWidthRatio > currentObjectToContainerHeightRatio ? currentObjectToContainerWidthRatio : currentObjectToContainerHeightRatio
	const currentObjectPercentage = currentObjectRatio * 100

	const zoomChangeRatio = desiredObjectPercentage / currentObjectPercentage
	//// need to multiply current object width with zoomChangeRatio to get to desired size
	//// if currentObjectPercentage is 75 and desiredObjectPercentage is 100 then (100/75 = 1.333) so (75*1.333 = 100)

	const finalZoomLevel = roundToNDecimalPlaces({number: currentZoomLevel * zoomChangeRatio, places:3})

	const zoomedObjectSize = {
		width: Math.round(object.width * zoomChangeRatio),
		height: Math.round(object.height * zoomChangeRatio)
	}

	const zoomedObjectPosition = {
		top: Math.round(object.top * zoomChangeRatio),
		left: Math.round(object.left * zoomChangeRatio)
	}

	const calculatedObjectPosition = {
		top: Math.round((zoomedObjectPosition.top) - (scrollContainer.height / 2) + zoomedObjectSize.height / 2),
		left: Math.round((zoomedObjectPosition.left) - (scrollContainer.width / 2) + zoomedObjectSize.width / 2)
	}

	return {
		top: calculatedObjectPosition.top,
		left: calculatedObjectPosition.left,
		finalZoomLevel,
	}

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

	const isMobilePage = window.innerWidth <= mobileBreakpoint
	const scrollObject = isMobilePage ? window.document.querySelector('main') : window

	const scrollContainerDetails = isMobilePage ? {
		width: scrollObject.offsetWidth,
		height: scrollObject.offsetHeight
	} : {
		width: scrollObject.innerWidth,
		height: scrollObject.innerHeight,
	}

	const newScrollDetails = finalScrollDetails({
		currentZoomLevel: zoomLevel,
		object: elementProps,
		scrollContainer: scrollContainerDetails,
		desiredObjectPercentage: hexSizePercentage
	})

	setZoomLevel(newScrollDetails.finalZoomLevel)

	let timeout
	if (window.document.readyState === 'complete') {
		timeout = window.setTimeout(() => {
			scrollObject.scrollBy({
				top: newScrollDetails.top,
				left: newScrollDetails.left
			})
			if (setPageReady) {
				setPageReady(true)
			}
		}, 150)
	} else {
		window.onload = () => {
			scrollObject.scrollBy({
				top: newScrollDetails.top,
				left: newScrollDetails.left
			})
			if (setPageReady) {
				setPageReady(true)
			}
		}
	}


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
	minPageHeight,
	finalScrollDetails,
	roundToNDecimalPlaces
}
