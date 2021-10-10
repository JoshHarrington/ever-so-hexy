import { hexWrapperGutter } from "../../constants";
import {
	roundToNDecimalPlaces,
	colourNameToTailwindVariable
} from "../../utils";
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

test("hexWrapperGutter is equal to 3", () => {
	expect(hexWrapperGutter).toBe(3)
})


test("check roundToNDecimalPlaces", () => {
	expect(roundToNDecimalPlaces({number:3.9872198798, places:3})).toEqual(3.987)
	expect(roundToNDecimalPlaces({number:3.999999457, places:5})).toEqual(4)
	expect(roundToNDecimalPlaces({number:3.999999457, places:8})).toEqual(3.99999946)
	expect(roundToNDecimalPlaces({number:0.89798786, places:20})).toEqual(0.89798786)

	expect(roundToNDecimalPlaces({number:3.9872198798})).toEqual(4)

	expect(roundToNDecimalPlaces(3.9872198798)).toEqual(null)
})

test("check colourNameToTailwindVariable fn", () => {

	expect(colourNameToTailwindVariable('white')).toEqual(undefined)

	expect(colourNameToTailwindVariable({colourName: 'white'})).toEqual('bg-white')
	expect(colourNameToTailwindVariable({colourName: 'red-400'})).toEqual('bg-red-400')
	expect(colourNameToTailwindVariable({colourName: 'yellow-400'})).toEqual('bg-yellow-400')
	expect(colourNameToTailwindVariable({colourName: 'green-500'})).toEqual('bg-green-500')
	expect(colourNameToTailwindVariable({colourName: 'blue-500'})).toEqual('bg-blue-500')
	expect(colourNameToTailwindVariable({colourName: 'purple-400'})).toEqual('bg-purple-400')
	expect(colourNameToTailwindVariable({colourName: 'blueGray-500'})).toEqual('bg-blueGray-500')
	expect(colourNameToTailwindVariable({colourName: 'coolGray-200'})).toEqual('bg-coolGray-200')
})
