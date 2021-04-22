class Tile < ApplicationRecord
	has_many :trixels, dependent: :destroy
	after_create :create_trixels

	private
		def create_trixels
			self.trixels.create([
				{position: "A1"},
				{position: "A2"},
				{position: "A3"},
				{position: "A4"},
				{position: "A5"},
				{position: "A6"},
				{position: "A7"},

				{position: "B1"},
				{position: "B2"},
				{position: "B3"},
				{position: "B4"},
				{position: "B5"},
				{position: "B6"},
				{position: "B7"},
				{position: "B8"},
				{position: "B9"},

				{position: "C1"},
				{position: "C2"},
				{position: "C3"},
				{position: "C4"},
				{position: "C5"},
				{position: "C6"},
				{position: "C7"},
				{position: "C8"},
				{position: "C9"},
				{position: "C10"},
				{position: "C11"},

				{position: "D1"},
				{position: "D2"},
				{position: "D3"},
				{position: "D4"},
				{position: "D5"},
				{position: "D6"},
				{position: "D7"},
				{position: "D8"},
				{position: "D9"},
				{position: "D10"},
				{position: "D11"},

				{position: "E1"},
				{position: "E2"},
				{position: "E3"},
				{position: "E4"},
				{position: "E5"},
				{position: "E6"},
				{position: "E7"},
				{position: "E8"},
				{position: "E9"},

				{position: "F1"},
				{position: "F2"},
				{position: "F3"},
				{position: "F4"},
				{position: "F5"},
				{position: "F6"},
				{position: "F7"},
			])
		end
end
