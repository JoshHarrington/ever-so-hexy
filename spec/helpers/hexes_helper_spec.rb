require "rails_helper"

describe HexesHelper do

	context "setup three hexes" do

		let!(:hexes) {
			create_list(:hex, 3, draft: true) do |hex, i|
				if i == 0
					hex.draft = false
				end
			end
		}

		it "check helper to remove non public hex data" do

			expect(hexes.length).to eql(3)
			expect(hexes[0].draft).to eql(false)
			expect(hexes[1].draft).to eql(true)
			expect(hexes[2].draft).to eql(true)

			private_data_hidden_hexes = hide_private_hex_data(hexes: hexes)

			expect(private_data_hidden_hexes.length).to eql(3)
			expect(private_data_hidden_hexes[0][:order]).to eql(1)
			expect(private_data_hidden_hexes[1][:order]).to eql(2)
			expect(private_data_hidden_hexes[2][:order]).to eql(3)

			# published hexes data is sent down to page
			expect(private_data_hidden_hexes[0][:draft]).to eql(false)
			expect(private_data_hidden_hexes[0][:trixel_colour_a2]).to eql("#fff")

			# draft hexes data is not sent down to page
			expect(private_data_hidden_hexes[1][:draft]).to eql(true)
			expect(private_data_hidden_hexes[1][:trixel_colour_a5]).to eql(nil)

		end

		it "check helper to remove non public hex data - when in editing mode, with correct current draft hex id" do

			private_data_hidden_hexes = hide_private_hex_data(hexes: hexes, current_draft_hex_id: hexes.select{|h| h.order == 3}[0].id, is_in_editing_mode: true)

			# draft hex data for the current draft that the user is editing is sent down to page
			expect(private_data_hidden_hexes.filter{|h| h[:order] == 3}.first[:trixel_colour_a2]).to eql("#fff")

			# public hex data is sent down to the page
			expect(private_data_hidden_hexes.filter{|h| h[:order] == 1}.first[:trixel_colour_a2]).to eql("#fff")

			# other draft hex data is not sent down to the page
			expect(private_data_hidden_hexes.filter{|h| h[:order] == 2}.first[:trixel_colour_a2]).to eql(nil)

		end
	end

	context "setup four hexes" do
		let!(:hex_1) { create(:hex, draft: true, order: 3, id: 1)}
		let!(:hex_2) { create(:hex, draft: false, order: 1, id: 2)}
		let!(:hex_3) { create(:hex, draft: true, order: 2, id: 3)}

		it "check helper to remove non public hex data - when in editing mode, with no draft hex id" do

			expect(hex_1.id).to eql(1)
			expect(hex_2.id).to eql(2)
			expect(hex_3.id).to eql(3)

			private_data_hidden_hexes = hide_private_hex_data(hexes: [hex_1, hex_2, hex_3], is_in_editing_mode: true)

			# if no current draft hex id is supplied then the draft data is still removed
			expect(private_data_hidden_hexes.filter{|h| h[:order] == 3}.first[:trixel_colour_a2]).to eql(nil)
			expect(private_data_hidden_hexes.filter{|h| h[:order] == 1}.first[:trixel_colour_a2]).to eql("#fff")
			expect(private_data_hidden_hexes.filter{|h| h[:order] == 2}.first[:trixel_colour_a2]).to eql(nil)

		end
	end

	context "setup 7 hexes with different orders" do
		let!(:hex_1) { create(:hex, draft: false, order: 1)}
		let!(:hex_2) { create(:hex, draft: true, order: 2)}
		let!(:hex_3) { create(:hex, draft: true, order: 3)}
		let!(:hex_4) { create(:hex, draft: false, order: 4)}
		let!(:hex_11) { create(:hex, draft: true, order: 11)}
		let!(:hex_12) { create(:hex, draft: true, order: 12)}

		it "check helper to split hexes into layers" do
			private_data_hidden_hexes = hide_private_hex_data(hexes: [hex_2, hex_1, hex_4, hex_11, hex_3, hex_12])

			expect(private_data_hidden_hexes.length).to eql(6)
			expect(private_data_hidden_hexes.map{|h| h[:order]}).to eql([1, 2, 3, 4, 11, 12])

			hexes_in_layers = split_into_layers(hexes: private_data_hidden_hexes)

			expect(hexes_in_layers.length).to eql(4)

			expect(hexes_in_layers[0].length).to eql(1) # [{draft: false, order: 1}]
			expect(hexes_in_layers[1].length).to eql(2) # [{draft: true, order: 2},{draft: true, order: 3}]
			expect(hexes_in_layers[2].length).to eql(1) # [{draft: false, order: 4}]
			expect(hexes_in_layers[3].length).to eql(2) # [{draft: true, order: 11},{draft: true, order: 12}]

			expect(hexes_in_layers[0][0][:order]).to eql(1)
			expect(hexes_in_layers[1][0][:order]).to eql(2)
			expect(hexes_in_layers[1][1][:order]).to eql(3)
			expect(hexes_in_layers[2][0][:order]).to eql(4)
			expect(hexes_in_layers[3][0][:order]).to eql(11)
			expect(hexes_in_layers[3][1][:order]).to eql(12)

			# published hexes data is sent down to page
			expect(hexes_in_layers[0][0][:draft]).to eql(false)
			expect(hexes_in_layers[0][0][:trixel_colour_a2]).to eql("#fff")

			# draft hexes data is not sent down to page
			expect(hexes_in_layers[1][0][:draft]).to eql(true)
			expect(hexes_in_layers[1][0][:trixel_colour_a5]).to eql(nil)

		end
	end


	context "setup 200 hexes with random draft states" do
		let!(:hexes) {
			create_list(:hex, 200) do |hex, i|
				hex.order = i + 1

				draft = rand().round().zero?
				hex.draft = draft
			end
		}

		it "check helper to split hexes into layers - with many records" do


			private_data_hidden_hexes = hide_private_hex_data(hexes: hexes)

			expect(private_data_hidden_hexes.length).to eql(200)

			hexes_in_layers = split_into_layers(hexes: private_data_hidden_hexes)

			expect(hexes_in_layers.length).to eql(25)

			expect(hexes_in_layers[0].length).to eql(1)
			expect(hexes_in_layers[1].length).to eql(2)
			expect(hexes_in_layers[2].length).to eql(3)
			expect(hexes_in_layers[3].length).to eql(4)
			expect(hexes_in_layers[4].length).to eql(5)
			expect(hexes_in_layers[5].length).to eql(6)
			expect(hexes_in_layers[6].length).to eql(7)
			expect(hexes_in_layers[7].length).to eql(8)
			expect(hexes_in_layers[8].length).to eql(9)
			expect(hexes_in_layers[9].length).to eql(10)

			14.times do |i|
				expect(hexes_in_layers[i+9].length).to eql(10)
			end

			expect(hexes_in_layers[24].length).to eql(5)

			flattened_hexes = hexes_in_layers.flatten

			expect(flattened_hexes.length).to eql(200)

			expect(hexes_in_layers[0][0][:order]).to eql(1)
			expect(hexes_in_layers[1][0][:order]).to eql(2)
			expect(hexes_in_layers[1][1][:order]).to eql(3)
			expect(hexes_in_layers[2][0][:order]).to eql(4)

			expect(hexes_in_layers[24][-1][:order]).to eql(200)

			public_hex = flattened_hexes.select{|h| h[:draft] == false}.first
			draft_hex = flattened_hexes.select{|h| h[:draft]}.first

			# # published hexes data is sent down to page
			expect(public_hex[:trixel_colour_a2]).to eql("#fff")

			# # draft hexes data is not sent down to page
			expect(draft_hex[:trixel_colour_a5]).to eql(nil)

		end
	end

	context "setup twenty hexes with random draft states, skipping some" do
		let!(:hexes) {
			create_list(:hex, 20) do |hex, i|
				hex.order = i + 1
				draft = rand().round().zero?
				hex.draft = draft
			end
		}

		it "check helper to split hexes into layers - with many missing records" do

			hexes_reduced = hexes.reject{|h| h.order == 6 || h.order == 12 || h.order == 15 || h.order == 19}

			private_data_hidden_hexes = hide_private_hex_data(hexes: hexes_reduced)

			expect(private_data_hidden_hexes.length).to eql(16)

			hexes_in_layers = split_into_layers(hexes: private_data_hidden_hexes)

			expect(hexes_in_layers.length).to eql(6)

			expect(hexes_in_layers[0].length).to eql(1) # [{order: 1}]
			expect(hexes_in_layers[1].length).to eql(2) # [{order: 2},{order: 3}]
			expect(hexes_in_layers[2].length).to eql(2) # [{order: 4},{order: 5}]
			expect(hexes_in_layers[3].length).to eql(4) # [{order: 7},{order: 8},{order: 9},{order: 10}]
			expect(hexes_in_layers[4].length).to eql(3) # [{order: 11},{order: 13},{order: 14}]
			expect(hexes_in_layers[5].length).to eql(4) # [{order: 16},{order: 17},{order: 18},{order: 20}]

			expect(hexes_in_layers[6]).to eql(nil)

		end
	end

end
