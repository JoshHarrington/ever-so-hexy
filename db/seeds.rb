# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Tile.create([
	{location: "DNK", draft: false},
	{location: "EST", draft: false},
	{location: "FJI", draft: false},
	{location: "GAB", draft: false},
	{location: "GUY"},
	{location: "HTI", draft: false}
])

Trixel.where(position: "A1").update(colour: "#f36f4c", d: "M0 75L0.00962452 45L26 59.9917L0 75Z")
Trixel.where(position: "A2").update(colour: "#7dd07b", d: "M26 30L25.9904 60L0 45.0083L26 30Z")
Trixel.where(position: "A3").update(colour: "#d07bc2", d: "M26 60L26.0096 30L52 44.9917L26 60Z")
Trixel.where(position: "A4").update(colour: "#7dd07b", d: "M52 15L51.9904 45L26 30.0083L52 15Z")
Trixel.where(position: "A5").update(colour: "#d07bc2", d: "M52 45L52.0096 15L78 29.9917L52 45Z")
Trixel.where(position: "A6").update(colour: "#7dd07b", d: "M78 0L77.9904 30L52 15.0083L78 0Z")
Trixel.where(position: "A7").update(colour: "#d07bc2", d: "M78 30L78.0096 0L104 14.9917L78 30Z")

Trixel.where(position: "B1").update(colour: "#d07bc2", d: "M0 105L0.00962452 75L26 89.9917L0 105Z")
Trixel.where(position: "B2").update(colour: "#f5da46", d: "M26 60L25.9904 90L0 75.0083L26 60Z")
Trixel.where(position: "B3").update(colour: "#887bd0", d: "M26 90L26.0096 60L52 74.9917L26 90Z")
Trixel.where(position: "B4").update(colour: "#7bd0af", d: "M52 45L51.9904 75L26 60.0083L52 45Z")
Trixel.where(position: "B5").update(colour: "#887bd0", d: "M52 75L52.0096 45L78 59.9917L52 75Z")
Trixel.where(position: "B6").update(colour: "#7bd0af", d: "M78 30L77.9904 60L52 45.0083L78 30Z")
Trixel.where(position: "B7").update(colour: "#887bd0", d: "M78 60L78.0096 30L104 44.9917L78 60Z")
Trixel.where(position: "B8").update(colour: "#7bd0af", d: "M104 15L103.99 45L78 30.0083L104 15Z")
Trixel.where(position: "B9").update(colour: "#d07bc2", d: "M104 45L104.01 15L130 29.9917L104 45Z")

Trixel.where(position: "C1").update(colour: "#887bd0", d: "M0 135L0.00962452 105L26 119.992L0 135Z")
Trixel.where(position: "C2").update(colour: "#f5da46", d: "M26 90L25.9904 120L0 105.008L26 90Z")
Trixel.where(position: "C3").update(colour: "#887bd0", d: "M26 120L26.0096 90L52 104.992L26 120Z")
Trixel.where(position: "C4").update(colour: "#f5da46", d: "M52 75L51.9904 105L26 90.0083L52 75Z")
Trixel.where(position: "C5").update(colour: "#887bd0", d: "M52 105L52.0096 75L78 89.9917L52 105Z")
Trixel.where(position: "C6").update(colour: "#7bd0af", d: "M78 60L77.9904 90L52 75.0083L78 60Z")
Trixel.where(position: "C7").update(colour: "#887bd0", d: "M78 90L78.0096 60L104 74.9917L78 90Z")
Trixel.where(position: "C8").update(colour: "#7bd0af", d: "M104 45L103.99 75L78 60.0083L104 45Z")
Trixel.where(position: "C9").update(colour: "#887bd0", d: "M104 75L104.01 45L130 59.9917L104 75Z")
Trixel.where(position: "C10").update(colour: "#7bd0af", d: "M130 30L129.99 60L104 45.0083L130 30Z")
Trixel.where(position: "C11").update(colour: "#887bd0", d: "M130 60L130.01 30L156 44.9917L130 60Z")

Trixel.where(position: "D1").update(colour: "#7bd0af", d: "M26 120L25.9904 150L0 135.008L26 120Z")
Trixel.where(position: "D2").update(colour: "#d07bc2", d: "M52 105L51.9904 135L26 120.008L52 105Z")
Trixel.where(position: "D3").update(colour: "#f5da46", d: "M26 150L26.0096 120L52 134.992L26 150Z")
Trixel.where(position: "D4").update(colour: "#887bd0", d: "M52 135L52.0096 105L78 119.992L52 135Z")
Trixel.where(position: "D5").update(colour: "#7dd07b", d: "M78 90L77.9904 120L52 105.008L78 90Z")
Trixel.where(position: "D6").update(colour: "#887bd0", d: "M78 120L78.0096 90L104 104.992L78 120Z")
Trixel.where(position: "D7").update(colour: "#7bd0af", d: "M104 75L103.99 105L78 90.0083L104 75Z")
Trixel.where(position: "D8").update(colour: "#887bd0", d: "M104 105L104.01 75L130 89.9917L104 105Z")
Trixel.where(position: "D9").update(colour: "#7bd0af", d: "M130 60L129.99 90L104 75.0083L130 60Z")
Trixel.where(position: "D10").update(colour: "#d07bc2", d: "M130 90L130.01 60L156 74.9917L130 90Z")
Trixel.where(position: "D11").update(colour: "#7bd0af", d: "M156 45L155.99 75L130 60.0083L156 45Z")

Trixel.where(position: "E1").update(colour: "#f5da46", d: "M52 135L51.9904 165L26 150.008L52 135Z")
Trixel.where(position: "E2").update(colour: "#887bd0", d: "M52 165L52.0096 135L78 149.992L52 165Z")
Trixel.where(position: "E3").update(colour: "#f5da46", d: "M78 120L77.9904 150L52 135.008L78 120Z")
Trixel.where(position: "E4").update(colour: "#887bd0", d: "M78 150L78.0096 120L104 134.992L78 150Z")
Trixel.where(position: "E5").update(colour: "#7bd0af", d: "M104 105L103.99 135L78 120.008L104 105Z")
Trixel.where(position: "E6").update(colour: "#887bd0", d: "M104 135L104.01 105L130 119.992L104 135Z")
Trixel.where(position: "E7").update(colour: "#7bd0af", d: "M130 90L129.99 120L104 105.008L130 90Z")
Trixel.where(position: "E8").update(colour: "#887bd0", d: "M130 120L130.01 90L156 104.992L130 120Z")
Trixel.where(position: "E9").update(colour: "#7bd0af", d: "M156 75L155.99 105L130 90.0083L156 75Z")

Trixel.where(position: "F1").update(colour: "#f5da46", d: "M78 150L77.9904 180L52 165.008L78 150Z")
Trixel.where(position: "F2").update(colour: "#887bd0", d: "M78 180L78.0096 150L104 164.992L78 180Z")
Trixel.where(position: "F3").update(colour: "#7bd0af", d: "M104 135L103.99 165L78 150.008L104 135Z")
Trixel.where(position: "F4").update(colour: "#887bd0", d: "M104 165L104.01 135L130 149.992L104 165Z")
Trixel.where(position: "F5").update(colour: "#7bd0af", d: "M130 120L129.99 150L104 135.008L130 120Z")
Trixel.where(position: "F6").update(colour: "#887bd0", d: "M130 150L130.01 120L156 134.992L130 150Z")
Trixel.where(position: "F7").update(colour: "#7bd0af", d: "M156 105L155.99 135L130 120.008L156 105Z")