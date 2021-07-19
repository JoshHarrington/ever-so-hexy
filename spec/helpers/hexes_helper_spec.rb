require "rails_helper"

describe HexesHelper do

	it "check helper to remove non public hex data" do
		hexes = Hex.create([{draft: true, order: 3},{draft: false, order: 1}, {draft: true, order: 2}])

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
		hexes = Hex.create([{draft: true, order: 3},{draft: false, order: 1}, {draft: true, order: 2}])

		private_data_hidden_hexes = hide_private_hex_data(hexes: hexes, current_draft_hex_id: Hex.find_by(order:3).id, is_in_editing_mode: true)

		# draft hex data for the current draft that the user is editing is sent down to page
		expect(private_data_hidden_hexes.filter{|h| h[:order] == 3}.first[:trixel_colour_a2]).to eql("#fff")

		# public hex data is sent down to the page
		expect(private_data_hidden_hexes.filter{|h| h[:order] == 1}.first[:trixel_colour_a2]).to eql("#fff")

		# other draft hex data is not sent down to the page
		expect(private_data_hidden_hexes.filter{|h| h[:order] == 2}.first[:trixel_colour_a2]).to eql(nil)

	end

	it "check helper to remove non public hex data - when in editing mode, with no draft hex id" do
		hexes = Hex.create([{draft: true, order: 3, id: 1},{draft: false, order: 1, id: 2}, {draft: true, order: 2, id: 3}])

		expect(Hex.find_by(order:1).id).to eql(2)
		expect(Hex.find_by(order:2).id).to eql(3)
		expect(Hex.find_by(order:3).id).to eql(1)

		private_data_hidden_hexes = hide_private_hex_data(hexes: hexes, is_in_editing_mode: true)

		# if no current draft hex id is supplied then the draft data is still removed
		expect(private_data_hidden_hexes.filter{|h| h[:order] == 3}.first[:trixel_colour_a2]).to eql(nil)
		expect(private_data_hidden_hexes.filter{|h| h[:order] == 1}.first[:trixel_colour_a2]).to eql("#fff")
		expect(private_data_hidden_hexes.filter{|h| h[:order] == 2}.first[:trixel_colour_a2]).to eql(nil)

	end

	it "check helper to split hexes into layers" do
		hexes = Hex.create([
			{draft: true, order: 3},
			{draft: false, order: 1},
			{draft: true, order: 2},
			{draft: true, order: 12},
			{draft: false, order: 4},
			{draft: true, order: 11}
		])

		private_data_hidden_hexes = hide_private_hex_data(hexes: hexes)

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



	it "check helper to split hexes into layers - with many records" do

		hexes_to_create = []
		200.times do |n|
			order = n + 1
			# next if order == 12 || order == 44 || order == 56 || order == 122
			draft = rand().round().zero?
			hexes_to_create.push({draft: draft, order: order})
		end

		Hex.create(hexes_to_create)

		private_data_hidden_hexes = hide_private_hex_data(hexes: Hex.all)

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


	it "check helper to split hexes into layers - with many missing records" do

		hexes_to_create = []
		20.times do |n|
			order = n + 1
			next if order == 6 || order == 12 || order == 15 || order == 19
			draft = rand().round().zero?
			hexes_to_create.push({draft: draft, order: order})
		end

		Hex.create(hexes_to_create)

		private_data_hidden_hexes = hide_private_hex_data(hexes: Hex.all)

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
