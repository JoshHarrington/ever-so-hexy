module ApplicationHelper

	def basicTile(tile_id: "new", colour: "white")
		return [{
			tile_id: tile_id,
			position: "A1",
			colour: colour,
			d: "M0 75L0.00962452 45L26 59.9917L0 75Z"
		},
		{
			tile_id: tile_id,
			position: "A2",
			colour: colour,
			d: "M26 30L25.9904 60L0 45.0083L26 30Z"
		},
		{
			tile_id: tile_id,
			position: "A3",
			colour: colour,
			d: "M26 60L26.0096 30L52 44.9917L26 60Z"
		},
		{
			tile_id: tile_id,
			position: "A4",
			colour: colour,
			d: "M52 15L51.9904 45L26 30.0083L52 15Z"
		},
		{
			tile_id: tile_id,
			position: "A5",
			colour: colour,
			d: "M52 45L52.0096 15L78 29.9917L52 45Z"
		},
		{
			tile_id: tile_id,
			position: "A6",
			colour: colour,
			d: "M78 0L77.9904 30L52 15.0083L78 0Z"
		},
		{
			tile_id: tile_id,
			position: "A7",
			colour: colour,
			d: "M78 30L78.0096 0L104 14.9917L78 30Z"
		},

		{
			tile_id: tile_id,
			position: "B1",
			colour: colour,
			d: "M0 105L0.00962452 75L26 89.9917L0 105Z"
		},
		{
			tile_id: tile_id,
			position: "B2",
			colour: colour,
			d: "M26 60L25.9904 90L0 75.0083L26 60Z"
		},
		{
			tile_id: tile_id,
			position: "B3",
			colour: colour,
			d: "M26 90L26.0096 60L52 74.9917L26 90Z"
		},
		{
			tile_id: tile_id,
			position: "B4",
			colour: colour,
			d: "M52 45L51.9904 75L26 60.0083L52 45Z"
		},
		{
			tile_id: tile_id,
			position: "B5",
			colour: colour,
			d: "M52 75L52.0096 45L78 59.9917L52 75Z"
		},
		{
			tile_id: tile_id,
			position: "B6",
			colour: colour,
			d: "M78 30L77.9904 60L52 45.0083L78 30Z"
		},
		{
			tile_id: tile_id,
			position: "B7",
			colour: colour,
			d: "M78 60L78.0096 30L104 44.9917L78 60Z"
		},
		{
			tile_id: tile_id,
			position: "B8",
			colour: colour,
			d: "M104 15L103.99 45L78 30.0083L104 15Z"
		},
		{
			tile_id: tile_id,
			position: "B9",
			colour: colour,
			d: "M104 45L104.01 15L130 29.9917L104 45Z"
		},

		{
			tile_id: tile_id,
			position: "C1",
			colour: colour,
			d: "M0 135L0.00962452 105L26 119.992L0 135Z"
		},
		{
			tile_id: tile_id,
			position: "C2",
			colour: colour,
			d: "M26 90L25.9904 120L0 105.008L26 90Z"
		},
		{
			tile_id: tile_id,
			position: "C3",
			colour: colour,
			d: "M26 120L26.0096 90L52 104.992L26 120Z"
		},
		{
			tile_id: tile_id,
			position: "C4",
			colour: colour,
			d: "M52 75L51.9904 105L26 90.0083L52 75Z"
		},
		{
			tile_id: tile_id,
			position: "C5",
			colour: colour,
			d: "M52 105L52.0096 75L78 89.9917L52 105Z"
		},
		{
			tile_id: tile_id,
			position: "C6",
			colour: colour,
			d: "M78 60L77.9904 90L52 75.0083L78 60Z"
		},
		{
			tile_id: tile_id,
			position: "C7",
			colour: colour,
			d: "M78 90L78.0096 60L104 74.9917L78 90Z"
		},
		{
			tile_id: tile_id,
			position: "C8",
			colour: colour,
			d: "M104 45L103.99 75L78 60.0083L104 45Z"
		},
		{
			tile_id: tile_id,
			position: "C9",
			colour: colour,
			d: "M104 75L104.01 45L130 59.9917L104 75Z"
		},
		{
			tile_id: tile_id,
			position: "C10",
			colour: colour,
			d: "M130 30L129.99 60L104 45.0083L130 30Z"
		},
		{
			tile_id: tile_id,
			position: "C11",
			colour: colour,
			d: "M130 60L130.01 30L156 44.9917L130 60Z"
		},

		{
			tile_id: tile_id,
			position: "D1",
			colour: colour,
			d: "M26 120L25.9904 150L0 135.008L26 120Z"
		},
		{
			tile_id: tile_id,
			position: "D2",
			colour: colour,
			d: "M52 105L51.9904 135L26 120.008L52 105Z"
		},
		{
			tile_id: tile_id,
			position: "D3",
			colour: colour,
			d: "M26 150L26.0096 120L52 134.992L26 150Z"
		},
		{
			tile_id: tile_id,
			position: "D4",
			colour: colour,
			d: "M52 135L52.0096 105L78 119.992L52 135Z"
		},
		{
			tile_id: tile_id,
			position: "D5",
			colour: colour,
			d: "M78 90L77.9904 120L52 105.008L78 90Z"
		},
		{
			tile_id: tile_id,
			position: "D6",
			colour: colour,
			d: "M78 120L78.0096 90L104 104.992L78 120Z"
		},
		{
			tile_id: tile_id,
			position: "D7",
			colour: colour,
			d: "M104 75L103.99 105L78 90.0083L104 75Z"
		},
		{
			tile_id: tile_id,
			position: "D8",
			colour: colour,
			d: "M104 105L104.01 75L130 89.9917L104 105Z"
		},
		{
			tile_id: tile_id,
			position: "D9",
			colour: colour,
			d: "M130 60L129.99 90L104 75.0083L130 60Z"
		},
		{
			tile_id: tile_id,
			position: "D10",
			colour: colour,
			d: "M130 90L130.01 60L156 74.9917L130 90Z"
		},
		{
			tile_id: tile_id,
			position: "D11",
			colour: colour,
			d: "M156 45L155.99 75L130 60.0083L156 45Z"
		},

		{
			tile_id: tile_id,
			position: "E1",
			colour: colour,
			d: "M52 135L51.9904 165L26 150.008L52 135Z"
		},
		{
			tile_id: tile_id,
			position: "E2",
			colour: colour,
			d: "M52 165L52.0096 135L78 149.992L52 165Z"
		},
		{
			tile_id: tile_id,
			position: "E3",
			colour: colour,
			d: "M78 120L77.9904 150L52 135.008L78 120Z"
		},
		{
			tile_id: tile_id,
			position: "E4",
			colour: colour,
			d: "M78 150L78.0096 120L104 134.992L78 150Z"
		},
		{
			tile_id: tile_id,
			position: "E5",
			colour: colour,
			d: "M104 105L103.99 135L78 120.008L104 105Z"
		},
		{
			tile_id: tile_id,
			position: "E6",
			colour: colour,
			d: "M104 135L104.01 105L130 119.992L104 135Z"
		},
		{
			tile_id: tile_id,
			position: "E7",
			colour: colour,
			d: "M130 90L129.99 120L104 105.008L130 90Z"
		},
		{
			tile_id: tile_id,
			position: "E8",
			colour: colour,
			d: "M130 120L130.01 90L156 104.992L130 120Z"
		},
		{
			tile_id: tile_id,
			position: "E9",
			colour: colour,
			d: "M156 75L155.99 105L130 90.0083L156 75Z"
		},

		{
			tile_id: tile_id,
			position: "F1",
			colour: colour,
			d: "M78 150L77.9904 180L52 165.008L78 150Z"
		},
		{
			tile_id: tile_id,
			position: "F2",
			colour: colour,
			d: "M78 180L78.0096 150L104 164.992L78 180Z"
		},
		{
			tile_id: tile_id,
			position: "F3",
			colour: colour,
			d: "M104 135L103.99 165L78 150.008L104 135Z"
		},
		{
			tile_id: tile_id,
			position: "F4",
			colour: colour,
			d: "M104 165L104.01 135L130 149.992L104 165Z"
		},
		{
			tile_id: tile_id,
			position: "F5",
			colour: colour,
			d: "M130 120L129.99 150L104 135.008L130 120Z"
		},
		{
			tile_id: tile_id,
			position: "F6",
			colour: colour,
			d: "M130 150L130.01 120L156 134.992L130 150Z"
		},
		{
			tile_id: tile_id,
			position: "F7",
			colour: colour,
			d: "M156 105L155.99 135L130 120.008L156 105Z"
		}]
	end
end
