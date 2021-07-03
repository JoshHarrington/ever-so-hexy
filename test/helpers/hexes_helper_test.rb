require "test_helper"

class HexesHelperTest < ActionView::TestCase
  test "check helper to remove non public hex data" do
		hexes = Hex.create([{draft: true, order: 3},{draft: false, order: 1}, {draft: true, order: 2}])

		cleaned_hexes = remove_non_public_hexes_data(hexes: hexes)

		assert cleaned_hexes.length == 3
		assert cleaned_hexes[0][:order] == 1
		assert cleaned_hexes[1][:order] == 2
		assert cleaned_hexes[2][:order] == 3

		# published hexes data is sent down to page
		assert cleaned_hexes[0][:draft] == false
		assert cleaned_hexes[0][:trixel_colour_a2] == "#fff"

		# draft hexes data is not sent down to page
		assert cleaned_hexes[1][:draft] == true
		assert cleaned_hexes[1][:trixel_colour_a5] == nil

  end

	test "check helper to remove non public hex data - when in editing mode, with correct current draft hex id" do
		hexes = Hex.create([{draft: true, order: 3, id: 1},{draft: false, order: 1}, {draft: true, order: 2}])

		assert Hex.find_by(order:3).id == 1

		cleaned_hexes = remove_non_public_hexes_data(hexes: hexes, current_draft_hex_id: 1, is_in_editing_mode: true)

		# draft hex data for the current draft that the user is editing is sent down to page
		assert cleaned_hexes.filter{|h| h[:order] == 3}.first[:trixel_colour_a2] == "#fff"

		# public hex data is sent down to the page
		assert cleaned_hexes.filter{|h| h[:order] == 1}.first[:trixel_colour_a2] == "#fff"

		# other draft hex data is not sent down to the page
		assert cleaned_hexes.filter{|h| h[:order] == 2}.first[:trixel_colour_a2] == nil

  end

	test "check helper to remove non public hex data - when in editing mode, with no draft hex id" do
		hexes = Hex.create([{draft: true, order: 3, id: 1},{draft: false, order: 1, id: 2}, {draft: true, order: 2, id: 3}])

		assert Hex.find_by(order:1).id == 2
		assert Hex.find_by(order:2).id == 3
		assert Hex.find_by(order:3).id == 1

		cleaned_hexes = remove_non_public_hexes_data(hexes: hexes, is_in_editing_mode: true)

		# if no current draft hex id is supplied then the draft data is still removed
		assert cleaned_hexes.filter{|h| h[:order] == 3}.first[:trixel_colour_a2] == nil
		assert cleaned_hexes.filter{|h| h[:order] == 1}.first[:trixel_colour_a2] == "#fff"
		assert cleaned_hexes.filter{|h| h[:order] == 2}.first[:trixel_colour_a2] == nil

  end
end
