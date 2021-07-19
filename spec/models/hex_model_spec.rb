require "rails_helper"

RSpec.describe Hex, :type => :model do
  it "can create a new hex" do
    hex = Hex.new
		expect(hex.save).to eql(true)

		expect(Hex.count).to eql(1)

		expect(hex.draft).to eql(true)
		expect(hex.trixel_colour_a1).to eql("#fff")
		expect(hex.trixel_colour_b1).to eql("#fff")
		expect(hex.trixel_colour_f7).to eql("#fff")
  end

	it "order of hexes matches expected" do
		hexes = Hex.create([{},{},{}])

		expect(Hex.count).to eql(3)

		expect(hexes[0].order).to eql(1)
		expect(hexes[1].order).to eql(2)
		expect(hexes[2].order).to eql(3)
	end

	it "order of hexes matches defined" do
		hexes = Hex.create([{order: 3},{order:1},{order:2}])

		expect(Hex.count).to eql(3)

		expect(hexes[0].order).to eql(3)
		expect(hexes[1].order).to eql(1)
		expect(hexes[2].order).to eql(2)
	end

	it "new hex gets correct order" do
		hexes = Hex.create([{order: 3},{order:2}])

		expect(Hex.count).to eql(2)

		new_hex = Hex.create()

		expect(Hex.count).to eql(3)
		expect(new_hex.order).to eql(1)

	end

	it "new hex with order matching an existing hex do not get created" do
		hexes = Hex.create([{order: 3},{order:2}])

		expect(Hex.count).to eql(2)

		new_hex = Hex.create(order: 3)

		expect(Hex.count).to eql(2)

		expect(new_hex.id).to eql(nil)

	end

end
