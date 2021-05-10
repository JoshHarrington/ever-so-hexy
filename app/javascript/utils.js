import { useEffect, useRef } from 'react'

const splitIntoShells = (items) => {

	let finalShelledArray = []

	for (var i=0,j=items.length; i < j; i++) {
		const currentLengthOfFlatShelledArray = finalShelledArray.flat().length

		const finalShellArrayLength = finalShelledArray.length

		const howManyItemsInLastShell = finalShellArrayLength ? finalShelledArray[finalShellArrayLength - 1].length :  finalShellArrayLength

		switch(howManyItemsInLastShell) {
			case 0:
				finalShelledArray.push(items.slice(0,1))
				break
			case 1:
				finalShelledArray.push(items.slice(currentLengthOfFlatShelledArray, currentLengthOfFlatShelledArray+6))
				break
			default:
				const shellNumber = howManyItemsInLastShell / 6
				finalShelledArray.push(items.slice(currentLengthOfFlatShelledArray, currentLengthOfFlatShelledArray+((shellNumber+1)*6)))
				break
 		}

		if (finalShelledArray.flat().length === items.length) {
			return finalShelledArray
		}
	}

}

const splitIntoLayers = (items) => {

	let itemsInLayers = []

	const upperLimitLayerLength = 10

	for(var i = 1; i < items.length; i++) {

		const sliceStart = i < upperLimitLayerLength ? i * ((i - 1) * 0.5) : ((i - upperLimitLayerLength) * upperLimitLayerLength) + 45
		const sliceEnd = i < upperLimitLayerLength ? sliceStart + i : sliceStart + upperLimitLayerLength
		itemsInLayers.push(items.slice(sliceStart, sliceEnd))

		if (itemsInLayers.flat().length >= items.length) {
			return itemsInLayers
		}
	}

}

const getSvgSize = (target) => {
	const svg = target.tagName === "svg" ? target : target.closest("svg")
	return svg.getBoundingClientRect()
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
		body: JSON.stringify(trixels)
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

const updatePathsFn = ({pathPosition, trixels, setNewTileTrixels, publishAllowed, id, currentColour}) => {
	const updatedPaths = trixels.map(p => {
		if (p.position !== pathPosition) {
			return p
		} else {
			return {
				tile_id: id,
				colour: currentColour.hex,
				position: p.position,
				d: p.d
			}
		}
	})
	setNewTileTrixels(updatedPaths)
	publishAllowed.current = trixels.filter(t => t.colour !== "white" && t.colour !== "#fff").length > 5
}

const updateAllTrixelsFn = ({trixels, setNewTileTrixels, id, colour, csrfToken}) => {
	const updatedTrixels = trixels.map(p => {
		return {
			tile_id: id,
			colour,
			position: p.position,
			d: p.d
		}
	})
	setNewTileTrixels(updatedTrixels)
	sendNewPaths({id, trixels: updatedTrixels, csrfToken})
}

export {
	splitIntoShells,
	splitIntoLayers,
	getSvgSize,
	debounce,
	usePrevious,
	sendNewPaths,
	updatePathsFn,
	updateAllTrixelsFn
}
