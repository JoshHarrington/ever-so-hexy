require "rails_helper"

describe HexesHelper do

	it "test split_into_layers with basic array" do
		basic_array = Array.new(60){|i| {order: i + 1}}

		expect(split_into_layers(hexes: basic_array).length).to eql(11)
	end

	context "setup 3 hexes" do
		let!(:hexes) {create_list(:hex, 3)}
		let!(:hexes_in_layers) {split_into_layers(hexes: hexes)}
		let!(:hexes_with_data_hidden) {hide_private_hex_data(hexes_in_layers: hexes_in_layers)}

		it "correctly add spacing to first hex" do
			first_hex = hexes_with_data_hidden.first.first
			expect(first_hex[:right]).to eql(10)
			expect(first_hex[:bottom]).to eql(9)
		end
	end


	context "setup 7 hexes" do
		let!(:hexes) {create_list(:hex, 7)}
		let!(:hexes_in_layers) {split_into_layers(hexes: hexes)}
		let!(:hexes_with_data_hidden) {hide_private_hex_data(hexes_in_layers: hexes_in_layers)}

		it "correctly add spacing to first hex" do
			first_hex = hexes_with_data_hidden.first.first
			expect(first_hex[:right]).to eql(24)
			expect(first_hex[:bottom]).to eql(15)
		end
	end

	context "setup 60 hexes" do
		let!(:hexes) {
			create_list(:hex, 60) do |hex, i|
				if i.odd?
					hex.draft = false
				end
			end
		}
		let!(:hexes_in_layers) {split_into_layers(hexes: hexes)}
		let!(:hexes_with_data_hidden) {hide_private_hex_data(hexes_in_layers: hexes_in_layers)}

		it "split_into_layers works with active record hexes" do

			expect(hexes_in_layers.length).to eql(11)

			expect(hexes_in_layers[0].length).to eql(1)
			expect(hexes_in_layers[0][0][:order]).to eql(1)
			expect(hexes_in_layers[-1][-1][:order]).to eql(60)
		end

		it "hide_private_hex_data fails if hexes not in layers" do
			expect{hide_private_hex_data(hexes_in_layers:hexes)}.to raise_error(Exception, "hexes_in_layers need to split into layers")
		end

		it "check that positions are added correctly" do

			expect(hexes_with_data_hidden.length).to eql(11)

			last_layer = hexes_with_data_hidden.last
			expect(last_layer.sort_by{|h|h[:order]}).to eql(last_layer)

			expect(hexes_with_data_hidden.first.first[:top]).to eql(3)
			expect(hexes_with_data_hidden.first.first[:right]).to eql(73)
			expect(hexes_with_data_hidden.first.first[:bottom]).to eql(57)
			expect(hexes_with_data_hidden.first.first[:left]).to eql(3)

			expect(hexes_with_data_hidden.second.first[:top]).to eql(3)
			expect(hexes_with_data_hidden.second.first[:right]).to eql(nil)
			expect(hexes_with_data_hidden.second.first[:bottom]).to eql(nil)
			expect(hexes_with_data_hidden.second.first[:left]).to eql(10.0)

			expect(hexes_with_data_hidden.last.last[:top]).to eql(27)
			expect(hexes_with_data_hidden.last.last[:right]).to eql(nil)
			expect(hexes_with_data_hidden.last.last[:bottom]).to eql(nil)
			expect(hexes_with_data_hidden.last.last[:left]).to eql(59.0)

		end

		it "check that visible hexes does have trixel data" do
			second_hex = hexes_with_data_hidden.second.first
			expect(second_hex[:draft]).to eql(false)
			expect(second_hex[:trixel_colour_a1]).to eql("#FFFFFF")
		end

		it "check that hidden hexes don't have trixel data" do
			third_hex = hexes_with_data_hidden.second.second
			expect(third_hex[:draft]).to eql(true)
			expect(third_hex[:trixel_colour_a1]).to eql(nil)
		end

		it "checks that draft hex data is supplied when current_draft_hex_id is passed" do
			first_hex = hexes_in_layers.first.first
			expect(first_hex[:draft]).to eql(true)

			current_draft_hex_id = first_hex[:id]
			draft_editing_data = hide_private_hex_data(hexes_in_layers: hexes_in_layers, current_draft_hex_id: current_draft_hex_id)

			current_draft_hex_after_data_hidden = draft_editing_data.first.first
			expect(current_draft_hex_after_data_hidden[:draft]).to eql(true)
			expect(current_draft_hex_after_data_hidden[:trixel_colour_a1]).to eql("#FFFFFF")

			third_hex = draft_editing_data.second.second
			expect(third_hex[:draft]).to eql(true)
			expect(third_hex[:trixel_colour_a1]).to eql(nil)
		end

	end

	context "setup many hexes with random draft states, skipping some" do
		let!(:hexes) {
			create_list(:hex, 300) do |hex, i|
				hex.order = i + 1
				draft = rand().round().zero?
				hex.draft = draft
			end
		}

		it "check helper to split hexes into layers - with many missing records" do

			hexes_reduced = hexes.reject{|h| h.order % 7 == 0 || h.order % 9 == 0}

			expect(hexes.length).not_to eql(hexes_reduced.length)

			hexes_in_layers = split_into_layers(hexes: hexes)
			reduced_hexes_in_layers = split_into_layers(hexes: hexes_reduced)

			private_data_hidden_hexes = hide_private_hex_data(hexes_in_layers: hexes_in_layers)
			reduced_private_data_hidden_hexes = hide_private_hex_data(hexes_in_layers: reduced_hexes_in_layers)

			expect(private_data_hidden_hexes.length).to eql(35)
			expect(reduced_private_data_hidden_hexes.length).to eql(35)

			expect(private_data_hidden_hexes.first.first[:right]).to eql(241)
			expect(reduced_private_data_hidden_hexes.first.first[:right]).to eql(241)

			expect(private_data_hidden_hexes.first.first[:bottom]).to eql(57)
			expect(reduced_private_data_hidden_hexes.first.first[:bottom]).to eql(57)

		end
	end

end
