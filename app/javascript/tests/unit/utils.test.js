import { hexWrapperGutter } from "../../constants";
import { marginsForFirst, splitIntoLayers, roundToNDecimalPlaces } from "../../utils";
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
