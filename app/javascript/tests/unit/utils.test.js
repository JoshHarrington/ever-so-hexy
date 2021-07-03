import { splitIntoLayers } from "../../utils";
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
