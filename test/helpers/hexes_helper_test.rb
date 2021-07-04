require "test_helper"

class HexesHelperTest < ActionView::TestCase
  test "check helper to remove non public hex data" do
		hexes = Hex.create([{draft: true, order: 3},{draft: false, order: 1}, {draft: true, order: 2}])

		private_data_hidden_hexes = hide_private_hex_data(hexes: hexes)

		assert private_data_hidden_hexes.length == 3
		assert private_data_hidden_hexes[0][:order] == 1
		assert private_data_hidden_hexes[1][:order] == 2
		assert private_data_hidden_hexes[2][:order] == 3

		# published hexes data is sent down to page
		assert private_data_hidden_hexes[0][:draft] == false
		assert private_data_hidden_hexes[0][:trixel_colour_a2] == "#fff"

		# draft hexes data is not sent down to page
		assert private_data_hidden_hexes[1][:draft] == true
		assert private_data_hidden_hexes[1][:trixel_colour_a5] == nil

  end

	test "check helper to remove non public hex data - when in editing mode, with correct current draft hex id" do
		hexes = Hex.create([{draft: true, order: 3},{draft: false, order: 1}, {draft: true, order: 2}])

		private_data_hidden_hexes = hide_private_hex_data(hexes: hexes, current_draft_hex_id: Hex.find_by(order:3).id, is_in_editing_mode: true)

		# draft hex data for the current draft that the user is editing is sent down to page
		assert private_data_hidden_hexes.filter{|h| h[:order] == 3}.first[:trixel_colour_a2] == "#fff"

		# public hex data is sent down to the page
		assert private_data_hidden_hexes.filter{|h| h[:order] == 1}.first[:trixel_colour_a2] == "#fff"

		# other draft hex data is not sent down to the page
		assert private_data_hidden_hexes.filter{|h| h[:order] == 2}.first[:trixel_colour_a2] == nil

  end

	test "check helper to remove non public hex data - when in editing mode, with no draft hex id" do
		hexes = Hex.create([{draft: true, order: 3, id: 1},{draft: false, order: 1, id: 2}, {draft: true, order: 2, id: 3}])

		assert Hex.find_by(order:1).id == 2
		assert Hex.find_by(order:2).id == 3
		assert Hex.find_by(order:3).id == 1

		private_data_hidden_hexes = hide_private_hex_data(hexes: hexes, is_in_editing_mode: true)

		# if no current draft hex id is supplied then the draft data is still removed
		assert private_data_hidden_hexes.filter{|h| h[:order] == 3}.first[:trixel_colour_a2] == nil
		assert private_data_hidden_hexes.filter{|h| h[:order] == 1}.first[:trixel_colour_a2] == "#fff"
		assert private_data_hidden_hexes.filter{|h| h[:order] == 2}.first[:trixel_colour_a2] == nil

  end

	test "check helper to split hexes into layers" do
		hexes = Hex.create([
			{draft: true, order: 3},
			{draft: false, order: 1},
			{draft: true, order: 2},
			{draft: true, order: 12},
			{draft: false, order: 4},
			{draft: true, order: 11}
		])

		private_data_hidden_hexes = hide_private_hex_data(hexes: hexes)

		assert private_data_hidden_hexes.length == 6
		assert private_data_hidden_hexes.map{|h| h[:order]} == [1, 2, 3, 4, 11, 12]

		hexes_in_layers = split_into_layers(hexes: private_data_hidden_hexes)

		assert hexes_in_layers.length == 4

		assert hexes_in_layers[0].length == 1 # [{draft: false, order: 1}]
		assert hexes_in_layers[1].length == 2 # [{draft: true, order: 2},{draft: true, order: 3}]
		assert hexes_in_layers[2].length == 1 # [{draft: false, order: 4}]
		assert hexes_in_layers[3].length == 2 # [{draft: true, order: 11},{draft: true, order: 12}]

		assert hexes_in_layers[0][0][:order] == 1
		assert hexes_in_layers[1][0][:order] == 2
		assert hexes_in_layers[1][1][:order] == 3
		assert hexes_in_layers[2][0][:order] == 4
		assert hexes_in_layers[3][0][:order] == 11
		assert hexes_in_layers[3][1][:order] == 12

		# published hexes data is sent down to page
		assert hexes_in_layers[0][0][:draft] == false
		assert hexes_in_layers[0][0][:trixel_colour_a2] == "#fff"

		# draft hexes data is not sent down to page
		assert hexes_in_layers[1][0][:draft] == true
		assert hexes_in_layers[1][0][:trixel_colour_a5] == nil

  end



	test "check helper to split hexes into layers - with many records" do

		hexes_to_create = []
		200.times do |n|
			order = n + 1
			# next if order == 12 || order == 44 || order == 56 || order == 122
			draft = rand().round().zero?
			hexes_to_create.push({draft: draft, order: order})
		end

		Hex.create(hexes_to_create)

		private_data_hidden_hexes = hide_private_hex_data(hexes: Hex.all)

		assert private_data_hidden_hexes.length == 200

		hexes_in_layers = split_into_layers(hexes: private_data_hidden_hexes)

		assert hexes_in_layers.length == 25

		assert hexes_in_layers[0].length == 1
		assert hexes_in_layers[1].length == 2
		assert hexes_in_layers[2].length == 3
		assert hexes_in_layers[3].length == 4
		assert hexes_in_layers[4].length == 5
		assert hexes_in_layers[5].length == 6
		assert hexes_in_layers[6].length == 7
		assert hexes_in_layers[7].length == 8
		assert hexes_in_layers[8].length == 9
		assert hexes_in_layers[9].length == 10

		14.times do |i|
			assert hexes_in_layers[i+9].length == 10
		end

		assert hexes_in_layers[24].length == 5

		flattened_hexes = hexes_in_layers.flatten

		assert flattened_hexes.length == 200

		assert hexes_in_layers[0][0][:order] == 1
		assert hexes_in_layers[1][0][:order] == 2
		assert hexes_in_layers[1][1][:order] == 3
		assert hexes_in_layers[2][0][:order] == 4

		assert hexes_in_layers[24][-1][:order] == 200

		public_hex = flattened_hexes.select{|h| h[:draft] == false}.first
		draft_hex = flattened_hexes.select{|h| h[:draft]}.first

		# # published hexes data is sent down to page
		assert public_hex[:trixel_colour_a2] == "#fff"

		# # draft hexes data is not sent down to page
		assert draft_hex[:trixel_colour_a5] == nil

  end


	test "check helper to split hexes into layers - with many missing records" do

		hexes_to_create = []
		20.times do |n|
			order = n + 1
			next if order == 6 || order == 12 || order == 15 || order == 19
			draft = rand().round().zero?
			hexes_to_create.push({draft: draft, order: order})
		end

		Hex.create(hexes_to_create)

		private_data_hidden_hexes = hide_private_hex_data(hexes: Hex.all)

		assert private_data_hidden_hexes.length == 16

		hexes_in_layers = split_into_layers(hexes: private_data_hidden_hexes)

		assert hexes_in_layers.length == 6

		assert hexes_in_layers[0].length == 1 # [{order: 1}]
		assert hexes_in_layers[1].length == 2 # [{order: 2},{order: 3}]
		assert hexes_in_layers[2].length == 2 # [{order: 4},{order: 5}]
		assert hexes_in_layers[3].length == 4 # [{order: 7},{order: 8},{order: 9},{order: 10}]
		assert hexes_in_layers[4].length == 3 # [{order: 11},{order: 13},{order: 14}]
		assert hexes_in_layers[5].length == 4 # [{order: 16},{order: 17},{order: 18},{order: 20}]

		assert hexes_in_layers[6] == nil

  end

end
