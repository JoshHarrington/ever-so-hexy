import { useEffect, useRef } from 'react'
import { hexWrapperGutter, maxZoomLevel, mobileBreakpoint } from './constants'

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


const panScrollAndZoom = ({panzoom, hex, setPageReady}) => {

	const scaleBeforeZoom = panzoom.getScale()

	panzoom.zoom(maxZoomLevel)
	setTimeout(() => {
		const hexProps = hex.getBoundingClientRect()
		const wrapperProps = hex.parentElement.getBoundingClientRect()
		const bodyProps = hex.closest('body').getBoundingClientRect()

		const currentScale = panzoom.getScale()

		const scaleFactor =  scaleBeforeZoom != currentScale ? currentScale / scaleBeforeZoom : currentScale
		const centeringProps = {
			x: bodyProps.width/2 - hexProps.width/2,
			y: bodyProps.height/2 - hexProps.height/2
		}

		const scrollProps = {
			x: (-(-wrapperProps.x + hexProps.x) + centeringProps.x)/scaleFactor,
			y: (-(-wrapperProps.y + hexProps.y) + centeringProps.y)/scaleFactor
		}

		panzoom.pan(scrollProps.x, scrollProps.y, { force: true })

		if (setPageReady) {
			setPageReady(true)
		}

	}, 50)
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

const removeHref = event => {
  window.location = event.target.href
  event.target.href = ""
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
	isPublishingEnabled,
	minPageWidth,
	minPageHeight,
	roundToNDecimalPlaces,
	panScrollAndZoom,
	removeHref
}
