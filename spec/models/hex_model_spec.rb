require "rails_helper"

RSpec.describe Hex, :type => :model do

	context "setup three live hexes" do

		let!(:hexes) { create_list(:hex, 3, draft: false)}

	  it "can create a new draft hex" do
			hex = Hex.new
			expect(hex.save).to eql(true)

			expect(Hex.count).to eql(4)

			expect(hex.draft).to eql(true)
			expect(hex.trixel_colour_a1).to eql("#fff")
			expect(hex.trixel_colour_b1).to eql("#fff")
			expect(hex.trixel_colour_f7).to eql("#fff")
	  end

		it "order of hexes increments as expected" do
			expect(Hex.count).to eql(3)

			expect(hexes[0].order).to eql(1)
			expect(hexes[1].order).to eql(2)
			expect(hexes[2].order).to eql(3)
		end

	end

	context "setup three hexes with specific order" do

		let!(:hex_1) { create(:hex, draft: true, order: 4, id: 1)}
		let!(:hex_2) { create(:hex, draft: false, order: 1, id: 2)}
		let!(:hex_3) { create(:hex, draft: true, order: 2, id: 3)}

		it "order of hexes matches defined" do
			hexes = Hex.all

			expect(hexes.count).to eql(3)

			expect(hexes[0].order).to eql(4)
			expect(hexes[1].order).to eql(1)
			expect(hexes[2].order).to eql(2)
		end

		it "new hex gets correct order" do
			new_hex = Hex.create()

			expect(Hex.count).to eql(4)
			expect(new_hex.order).to eql(3)

		end

		it "new hex with order matching an existing hex do not get created" do
			new_hex = Hex.create(order: 2)

			expect(Hex.count).to eql(3)

			expect(new_hex.id).to eql(nil)
		end

	end

	it "valid ip addresses are translated to country code on save" do

		england = Hex.create(ip_address: "185.192.69.232")
		denmark = Hex.create(ip_address: "157.97.120.72")

		expect(england.country_code).to eql("GB")
		expect(denmark.country_code).to eql("DK")

	end

	it "invalid ip address leaves country code blank" do

		hex = Hex.create(ip_address: "123")

		expect(hex.country_code).to be_nil

	end

	it "blank ip address leaves country code blank" do

		hex = Hex.create

		expect(hex.country_code).to be_nil

	end

	it "local ip address sets country code to GB for testing" do

		hex = Hex.create(ip_address: "::1")

		expect(hex.country_code).to eql("GB")

	end

end
