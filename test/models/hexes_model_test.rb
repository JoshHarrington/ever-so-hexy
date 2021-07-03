require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  test "can create a new hex" do
    hex = Hex.new
		assert hex.save

		assert Hex.all.count == 1

		assert hex.draft == true
		assert hex.trixel_colour_a1 == "#fff"
		assert hex.trixel_colour_b1 == "#fff"
		assert hex.trixel_colour_f7 == "#fff"
  end

	test "order of hexes matches expected" do
		hexes = Hex.create([{},{},{}])

		assert Hex.all.count == 3

		assert hexes[0].order == 1
		assert hexes[1].order == 2
		assert hexes[2].order == 3
	end
end
