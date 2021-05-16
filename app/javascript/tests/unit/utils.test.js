import { splitIntoLayers } from "../../utils";
import { listOfTiles } from "./test-helpers";


test("check splitting into layers fn, with small number of tiles", () => {

	const currentListOfTiles = listOfTiles(5)

	expect(splitIntoLayers(currentListOfTiles)[0].length).toBe(1);
	expect(splitIntoLayers(currentListOfTiles)[1].length).toBe(2);
	expect(splitIntoLayers(currentListOfTiles)[2].length).toBe(2);
	expect(splitIntoLayers(currentListOfTiles)[3]).toBe(undefined);

});


test("check splitting into layers fn, with large number of tiles", () => {

	const currentListOfTiles = listOfTiles(100)

	expect(splitIntoLayers(currentListOfTiles)[0].length).toBe(1);
	expect(splitIntoLayers(currentListOfTiles)[1].length).toBe(2);
	expect(splitIntoLayers(currentListOfTiles)[2].length).toBe(3);
	expect(splitIntoLayers(currentListOfTiles)[3].length).toBe(4);
	expect(splitIntoLayers(currentListOfTiles)[4].length).toBe(5);
	expect(splitIntoLayers(currentListOfTiles)[5].length).toBe(6);
	expect(splitIntoLayers(currentListOfTiles)[6].length).toBe(7);
	expect(splitIntoLayers(currentListOfTiles)[7].length).toBe(8);
	expect(splitIntoLayers(currentListOfTiles)[8].length).toBe(9);


	expect(splitIntoLayers(currentListOfTiles)[9].length).toBe(10);
	expect(splitIntoLayers(currentListOfTiles)[10].length).toBe(10);
	expect(splitIntoLayers(currentListOfTiles)[11].length).toBe(10);
	expect(splitIntoLayers(currentListOfTiles)[12].length).toBe(10);
	expect(splitIntoLayers(currentListOfTiles)[13].length).toBe(10);
	expect(splitIntoLayers(currentListOfTiles)[14].length).toBe(5);

	expect(splitIntoLayers(currentListOfTiles).length).toBe(15);
	expect(splitIntoLayers(currentListOfTiles)[15]).toBe(undefined);

});
