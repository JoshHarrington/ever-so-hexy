require "rails_helper"

RSpec.describe Hex, :type => :model do
  it "can create a new hex" do
    hex = Hex.new
		expect(hex.save)

		expect(Hex.count == 1)

		expect(hex.draft == true)
		expect(hex.trixel_colour_a1 == "#fff")
		expect(hex.trixel_colour_b1 == "#fff")
		expect(hex.trixel_colour_f7 == "#fff")
  end

	it "order of hexes matches expected" do
		hexes = Hex.create([{},{},{}])

		expect(Hex.count == 3)

		expect(hexes[0].order == 1)
		expect(hexes[1].order == 2)
		expect(hexes[2].order == 3)
	end

	it "order of hexes matches defined" do
		hexes = Hex.create([{order: 3},{order:1},{order:2}])

		expect(Hex.count == 3)

		expect(hexes[0].order == 3)
		expect(hexes[1].order == 1)
		expect(hexes[2].order == 2)
	end

	it "new hex gets correct order" do
		hexes = Hex.create([{order: 3},{order:2}])

		expect(Hex.count == 2)

		new_hex = Hex.create()

		expect(Hex.count == 3)
		expect(new_hex.order == 1)

	end

	it "new hex with order matching an existing hex do not get created" do
		hexes = Hex.create([{order: 3},{order:2}])

		expect(Hex.count == 2)

		new_hex = Hex.create(order: 3)

		expect(Hex.count == 2)

		expect(new_hex.id == nil)

	end

end
