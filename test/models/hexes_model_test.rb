require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  test "can create a new hex" do
    hex = Hex.new
		assert hex.save

		assert Hex.count == 1

		assert hex.draft == true
		assert hex.trixel_colour_a1 == "#fff"
		assert hex.trixel_colour_b1 == "#fff"
		assert hex.trixel_colour_f7 == "#fff"
  end

	test "order of hexes matches expected" do
		hexes = Hex.create([{},{},{}])

		assert Hex.count == 3

		assert hexes[0].order == 1
		assert hexes[1].order == 2
		assert hexes[2].order == 3
	end

	test "order of hexes matches defined" do
		hexes = Hex.create([{order: 3},{order:1},{order:2}])

		assert Hex.count == 3

		assert hexes[0].order == 3
		assert hexes[1].order == 1
		assert hexes[2].order == 2
	end

	test "new hex gets correct order" do
		hexes = Hex.create([{order: 3},{order:2}])

		assert Hex.count == 2

		new_hex = Hex.create()

		assert Hex.count == 3
		assert new_hex.order == 1

	end

	test "new hex with order matching an existing hex do not get created" do
		hexes = Hex.create([{order: 3},{order:2}])

		assert Hex.count == 2

		new_hex = Hex.create(order: 3)

		assert Hex.count == 2

		assert new_hex.id == nil

	end

end
