import { splitIntoLayers } from "../../utils";
import { listOfHexes } from "./test-helpers";


test("check splitting into layers fn, with small number of hexes", () => {

	const currentListOfHexes = listOfHexes(5)

	expect(splitIntoLayers(currentListOfHexes)[0].length).toBe(1);
	expect(splitIntoLayers(currentListOfHexes)[1].length).toBe(2);
	expect(splitIntoLayers(currentListOfHexes)[2].length).toBe(2);
	expect(splitIntoLayers(currentListOfHexes)[3]).toBe(undefined);

});


test("check splitting into layers fn, with large number of hexes", () => {

	const currentListOfHexes = listOfHexes(100)

	expect(splitIntoLayers(currentListOfHexes)[0].length).toBe(1);
	expect(splitIntoLayers(currentListOfHexes)[1].length).toBe(2);
	expect(splitIntoLayers(currentListOfHexes)[2].length).toBe(3);
	expect(splitIntoLayers(currentListOfHexes)[3].length).toBe(4);
	expect(splitIntoLayers(currentListOfHexes)[4].length).toBe(5);
	expect(splitIntoLayers(currentListOfHexes)[5].length).toBe(6);
	expect(splitIntoLayers(currentListOfHexes)[6].length).toBe(7);
	expect(splitIntoLayers(currentListOfHexes)[7].length).toBe(8);
	expect(splitIntoLayers(currentListOfHexes)[8].length).toBe(9);


	expect(splitIntoLayers(currentListOfHexes)[9].length).toBe(10);
	expect(splitIntoLayers(currentListOfHexes)[10].length).toBe(10);
	expect(splitIntoLayers(currentListOfHexes)[11].length).toBe(10);
	expect(splitIntoLayers(currentListOfHexes)[12].length).toBe(10);
	expect(splitIntoLayers(currentListOfHexes)[13].length).toBe(10);
	expect(splitIntoLayers(currentListOfHexes)[14].length).toBe(5);

	expect(splitIntoLayers(currentListOfHexes).length).toBe(15);
	expect(splitIntoLayers(currentListOfHexes)[15]).toBe(undefined);

});
