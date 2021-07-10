import { hexWrapperGutter } from "../../constants";
import { marginsForFirst, finalScrollDetails, splitIntoLayers, zoomAndScroll, roundToNDecimalPlaces } from "../../utils";
import { listOfHexes } from "./test-helpers";

test("check listOfHexes fn", () => {
	const newListOfHexes = listOfHexes(5)
	expect(newListOfHexes.length).toBe(5)
	expect(newListOfHexes[0].order).toBe(1)
	expect(newListOfHexes[1].order).toBe(2)
	expect(newListOfHexes[2].order).toBe(3)
	expect(newListOfHexes[3].order).toBe(4)
	expect(newListOfHexes[4].order).toBe(5)
})


test("check splitting into layers fn, with small number of hexes", () => {

	const currentListOfHexes = listOfHexes(5)
	const hexesSplitIntoLayers = splitIntoLayers(currentListOfHexes)

	expect(hexesSplitIntoLayers[0].length).toBe(1);
	expect(hexesSplitIntoLayers[1].length).toBe(2);
	expect(hexesSplitIntoLayers[2].length).toBe(2);
	expect(hexesSplitIntoLayers[3]).toBe(undefined);

});


test("check splitting into layers fn, with large number of hexes", () => {

	const currentListOfHexes = listOfHexes(12)
	const hexesSplitIntoLayers = splitIntoLayers(currentListOfHexes)

	expect(hexesSplitIntoLayers[0].length).toBe(1);
	expect(hexesSplitIntoLayers[1].length).toBe(2);
	expect(hexesSplitIntoLayers[2].length).toBe(3);
	expect(hexesSplitIntoLayers[3].length).toBe(4);
	expect(hexesSplitIntoLayers[4].length).toBe(2);

	expect(hexesSplitIntoLayers[5]).toBe(undefined);

});

test("hexWrapperGutter is equal to 3", () => {
	expect(hexWrapperGutter).toBe(3)
})

test("margins for first hex are set correctly - 1 hex", () => {

	const lastOrder = 1

	const currentListOfHexes = listOfHexes(lastOrder)
	const hexesSplitIntoLayers = splitIntoLayers(currentListOfHexes)

	expect(currentListOfHexes[0].order).toBe(lastOrder)

	const marginsForFirstHex = marginsForFirst({hexesInLayers: hexesSplitIntoLayers})

	expect(marginsForFirstHex.left).toBe(hexWrapperGutter)
	expect(marginsForFirstHex.top).toBe(hexWrapperGutter)

	expect(marginsForFirstHex.right).toBe(hexWrapperGutter)
	expect(marginsForFirstHex.bottom).toBe(hexWrapperGutter)

})

test("margins for first hex are set correctly - 3 hexes", () => {

	const lastOrder = 3

	const currentListOfHexes = listOfHexes(lastOrder)
	const hexesSplitIntoLayers = splitIntoLayers(currentListOfHexes)

	const marginsForFirstHex = marginsForFirst({hexesInLayers: hexesSplitIntoLayers})

	expect(marginsForFirstHex.left).toBe(hexWrapperGutter)
	expect(marginsForFirstHex.top).toBe(hexWrapperGutter)

	expect(marginsForFirstHex.right).toBe(10)
	expect(marginsForFirstHex.bottom).toBe(9)

})

test("margins for first hex are set correctly - 9 hexes", () => {

	const lastOrder = 9

	const currentListOfHexes = listOfHexes(lastOrder)
	const hexesSplitIntoLayers = splitIntoLayers(currentListOfHexes)

	const marginsForFirstHex = marginsForFirst({hexesInLayers: hexesSplitIntoLayers})

	expect(marginsForFirstHex.left).toBe(hexWrapperGutter)
	expect(marginsForFirstHex.top).toBe(hexWrapperGutter)

	expect(marginsForFirstHex.right).toBe(24)
	expect(marginsForFirstHex.bottom).toBe(15)

})

test("margins for first hex are set correctly - 8 hexes, missing 6", () => {

	const lastOrder = 8

	const currentListOfHexes = listOfHexes(lastOrder).filter(h => h.order !== 6)

	expect(currentListOfHexes.length).toBe(7)
	const hexesSplitIntoLayers = splitIntoLayers(currentListOfHexes)

	const marginsForFirstHex = marginsForFirst({hexesInLayers: hexesSplitIntoLayers})

	expect(marginsForFirstHex.left).toBe(hexWrapperGutter)
	expect(marginsForFirstHex.top).toBe(hexWrapperGutter)

	expect(marginsForFirstHex.right).toBe(24)
	expect(marginsForFirstHex.bottom).toBe(9)

})

test("check roundToNDecimalPlaces", () => {
	expect(roundToNDecimalPlaces({number:3.9872198798, places:3})).toEqual(3.987)
	expect(roundToNDecimalPlaces({number:3.999999457, places:5})).toEqual(4)
	expect(roundToNDecimalPlaces({number:3.999999457, places:8})).toEqual(3.99999946)
	expect(roundToNDecimalPlaces({number:0.89798786, places:20})).toEqual(0.89798786)

	expect(roundToNDecimalPlaces({number:3.9872198798})).toEqual(4)

	expect(roundToNDecimalPlaces(3.9872198798)).toEqual(null)
})

test("check zoomAndScroll fn fails if props are invalid", () => {

	const newScrollDetails = finalScrollDetails({object: {}, scrollContainer: {}, desiredObjectPercentage: 50})
	expect(newScrollDetails).toBe(false)

})


test("check zoomAndScroll fn fails if desired percentage prop is invalid", () => {

	const newScrollDetails = finalScrollDetails({
		object: {width: 10, height: 10},
		scrollContainer: {width: 20, height: 20},
		desiredObjectPercentage: '50'
	})
	expect(newScrollDetails).toBe(false)

})


test("check zoomAndScroll fn returns correct result if props are valid", () => {

	const newScrollDetails = finalScrollDetails({
		object: {width: 10, height: 10, top: 2, left: 3},
		scrollContainer: {width: 20, height: 20},
		desiredObjectPercentage: 60,
		currentZoomLevel: 1.2
	})

	expect(newScrollDetails).not.toBe(false)

	expect(newScrollDetails.top).toBe(-2)
	expect(newScrollDetails.left).toBe(0)
	expect(newScrollDetails.finalZoomLevel).toBe(1.44)

})

test("check zoomAndScroll fn returns correct result if props are valid and complex", () => {

	const newScrollDetails = finalScrollDetails({
		object: {width: 8954797.8719823, height: 981479827.1279, left:981, top: 9718},
		scrollContainer: {width: 921803928103912.3271, height: 987219837.1812},
		desiredObjectPercentage: 50,
		currentZoomLevel: 1.385
	})

	expect(newScrollDetails).not.toBe(false)

	expect(Math.round(newScrollDetails.top)).toBe(newScrollDetails.top)
	expect(newScrollDetails.top).toBe(-246800072)
	expect(newScrollDetails.left).toBe(-460901961799671)

	expect(newScrollDetails.finalZoomLevel).toBe(0.697)
	// round the finalZoomLevel to 3 decimal places

})

test("check zoomAndScroll fn returns correct result container is smaller than object", () => {

	const newScrollDetails = finalScrollDetails({
		object: {width: 100, height: 100, left:0, top:0},
		scrollContainer: {width: 40, height: 40},
		desiredObjectPercentage: 70,
		currentZoomLevel: 3
	})

	expect(newScrollDetails).not.toBe(false)

	expect(newScrollDetails.top).toBe(-6)
	expect(newScrollDetails.left).toBe(-6)
	expect(newScrollDetails.finalZoomLevel).toBe(0.84)

})

test("check zoomAndScroll fn returns correct result container is smaller than object and off center", () => {

	const newScrollDetails = finalScrollDetails({
		object: {width: 120, height: 130, left: 12, top: 18},
		scrollContainer: {width: 100, height: 100},
		desiredObjectPercentage: 70,
		currentZoomLevel: 3
	})

	expect(newScrollDetails).not.toBe(false)

	expect(newScrollDetails.top).toBe(-5)
	expect(newScrollDetails.left).toBe(-11)
	expect(newScrollDetails.finalZoomLevel).toBe(1.615)

})


test("check zoomAndScroll fn returns correct result for portrait object in landscape container", () => {

	const newScrollDetails = finalScrollDetails({
		object: {width: 300, height: 350, top: 500, left:600},
		scrollContainer: {width: 900, height: 800},
		desiredObjectPercentage: 50,
		currentZoomLevel: 1
	})

	expect(newScrollDetails).not.toBe(false)

	expect(newScrollDetails.top).toBe(371)
	expect(newScrollDetails.left).toBe(408)
	expect(newScrollDetails.finalZoomLevel).toBe(1.143)

})

test("check zoomAndScroll fn returns correct result for portrait object in portrait container", () => {

	const newScrollDetails = finalScrollDetails({
		object: {width: 135, height: 280, top: 350, left: 150},
		scrollContainer: {width: 222, height: 386},
		desiredObjectPercentage: 89,
		currentZoomLevel: 842
	})

	expect(newScrollDetails).not.toBe(false)


	expect(newScrollDetails.top).toBe(408)
	expect(newScrollDetails.left).toBe(156)
	expect(newScrollDetails.finalZoomLevel).toBe(1033.074)

})

test("check zoomAndScroll fn returns correct result when desired object is bigger than container", () => {

	const newScrollDetails = finalScrollDetails({
		object: {width: 64, height: 93, top: 400, left: 300},
		scrollContainer: {width: 412, height: 623},
		desiredObjectPercentage: 120,
		currentZoomLevel: 100
	})

	expect(newScrollDetails).not.toBe(false)

	expect(newScrollDetails.top).toBe(3138)
	expect(newScrollDetails.left).toBe(2359)
	expect(newScrollDetails.finalZoomLevel).toBe(772.5)

})

