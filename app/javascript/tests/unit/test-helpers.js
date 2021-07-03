const basicHex = ({id, order, colour}) => (
	{
		id,
		order,
		trixel_colour_a1: colour,
		trixel_colour_a2: colour,
		trixel_colour_a3: colour,
		trixel_colour_a4: colour,
		trixel_colour_a5: colour,
		trixel_colour_a6: colour,
		trixel_colour_a7: colour,
		trixel_colour_b1: colour,
		trixel_colour_b2: colour,
		trixel_colour_b3: colour,
		trixel_colour_b4: colour,
		trixel_colour_b5: colour,
		trixel_colour_b6: colour,
		trixel_colour_b7: colour,
		trixel_colour_b8: colour,
		trixel_colour_b9: colour,
		trixel_colour_c1: colour,
		trixel_colour_c2: colour,
		trixel_colour_c3: colour,
		trixel_colour_c4: colour,
		trixel_colour_c5: colour,
		trixel_colour_c6: colour,
		trixel_colour_c7: colour,
		trixel_colour_c8: colour,
		trixel_colour_c9: colour,
		trixel_colour_c10: colour,
		trixel_colour_c11: colour,
		trixel_colour_d1: colour,
		trixel_colour_d2: colour,
		trixel_colour_d3: colour,
		trixel_colour_d4: colour,
		trixel_colour_d5: colour,
		trixel_colour_d6: colour,
		trixel_colour_d7: colour,
		trixel_colour_d8: colour,
		trixel_colour_d9: colour,
		trixel_colour_d10: colour,
		trixel_colour_d11: colour,
		trixel_colour_e1: colour,
		trixel_colour_e2: colour,
		trixel_colour_e3: colour,
		trixel_colour_e4: colour,
		trixel_colour_e5: colour,
		trixel_colour_e6: colour,
		trixel_colour_e7: colour,
		trixel_colour_e8: colour,
		trixel_colour_e9: colour,
		trixel_colour_f1: colour,
		trixel_colour_f2: colour,
		trixel_colour_f3: colour,
		trixel_colour_f4: colour,
		trixel_colour_f5: colour,
		trixel_colour_f6: colour,
		trixel_colour_f7: colour
	}
)

const listOfHexes = (n) => {
	var hexes = []

	for(var i = 0; i < n; i++) {
		hexes.push(basicHex({id:i, order: i+1, colour: "blue"}))
	}

	return hexes
}

export {
	basicHex,
	listOfHexes
}
