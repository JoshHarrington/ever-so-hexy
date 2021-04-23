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

Trixel.where(position: "A1").update(colour: "#f36f4c")
Trixel.where(position: "A2").update(colour: "#7dd07b")
Trixel.where(position: "A3").update(colour: "#d07bc2")
Trixel.where(position: "A4").update(colour: "#7dd07b")
Trixel.where(position: "A5").update(colour: "#d07bc2")
Trixel.where(position: "A6").update(colour: "#7dd07b")
Trixel.where(position: "A7").update(colour: "#d07bc2")

Trixel.where(position: "B1").update(colour: "#d07bc2")
Trixel.where(position: "B2").update(colour: "#f5da46")
Trixel.where(position: "B3").update(colour: "#887bd0")
Trixel.where(position: "B4").update(colour: "#7bd0af")
Trixel.where(position: "B5").update(colour: "#887bd0")
Trixel.where(position: "B6").update(colour: "#7bd0af")
Trixel.where(position: "B7").update(colour: "#887bd0")
Trixel.where(position: "B8").update(colour: "#7bd0af")
Trixel.where(position: "B9").update(colour: "#d07bc2")

Trixel.where(position: "C1").update(colour: "#887bd0")
Trixel.where(position: "C2").update(colour: "#f5da46")
Trixel.where(position: "C3").update(colour: "#887bd0")
Trixel.where(position: "C4").update(colour: "#f5da46")
Trixel.where(position: "C5").update(colour: "#887bd0")
Trixel.where(position: "C6").update(colour: "#7bd0af")
Trixel.where(position: "C7").update(colour: "#887bd0")
Trixel.where(position: "C8").update(colour: "#7bd0af")
Trixel.where(position: "C9").update(colour: "#887bd0")
Trixel.where(position: "C10").update(colour: "#7bd0af")
Trixel.where(position: "C11").update(colour: "#887bd0")

Trixel.where(position: "D1").update(colour: "#7bd0af")
Trixel.where(position: "D2").update(colour: "#d07bc2")
Trixel.where(position: "D3").update(colour: "#f5da46")
Trixel.where(position: "D4").update(colour: "#887bd0")
Trixel.where(position: "D5").update(colour: "#7dd07b")
Trixel.where(position: "D6").update(colour: "#887bd0")
Trixel.where(position: "D7").update(colour: "#7bd0af")
Trixel.where(position: "D8").update(colour: "#887bd0")
Trixel.where(position: "D9").update(colour: "#7bd0af")
Trixel.where(position: "D10").update(colour: "#d07bc2")
Trixel.where(position: "D11").update(colour: "#7bd0af")

Trixel.where(position: "E1").update(colour: "#f5da46")
Trixel.where(position: "E2").update(colour: "#887bd0")
Trixel.where(position: "E3").update(colour: "#f5da46")
Trixel.where(position: "E4").update(colour: "#887bd0")
Trixel.where(position: "E5").update(colour: "#7bd0af")
Trixel.where(position: "E6").update(colour: "#887bd0")
Trixel.where(position: "E7").update(colour: "#7bd0af")
Trixel.where(position: "E8").update(colour: "#887bd0")
Trixel.where(position: "E9").update(colour: "#7bd0af")

Trixel.where(position: "F1").update(colour: "#f5da46")
Trixel.where(position: "F2").update(colour: "#887bd0")
Trixel.where(position: "F3").update(colour: "#7bd0af")
Trixel.where(position: "F4").update(colour: "#887bd0")
Trixel.where(position: "F5").update(colour: "#7bd0af")
Trixel.where(position: "F6").update(colour: "#887bd0")
Trixel.where(position: "F7").update(colour: "#7bd0af")