module HexesHelper

	def clean_hex_array(hexes:, is_in_editing_mode: false, current_draft_hex_id: nil)
		visible_hexes = hexes.select{|h| !h.draft || is_in_editing_mode && current_draft_hex_id && h.id == current_draft_hex_id}
		hidden_hexes = hexes.select{|h| h.draft && (is_in_editing_mode && current_draft_hex_id && h.id != current_draft_hex_id) || !is_in_editing_mode}

		processed_visible_hexes = visible_hexes.map{ |h| {
			draft: h.draft,
			order: h.order,
			trixel_colour_a1: h.trixel_colour_a1,
			trixel_colour_a2: h.trixel_colour_a2,
			trixel_colour_a3: h.trixel_colour_a3,
			trixel_colour_a4: h.trixel_colour_a4,
			trixel_colour_a5: h.trixel_colour_a5,
			trixel_colour_a6: h.trixel_colour_a6,
			trixel_colour_a7: h.trixel_colour_a7,
			trixel_colour_b1: h.trixel_colour_b1,
			trixel_colour_b2: h.trixel_colour_b2,
			trixel_colour_b3: h.trixel_colour_b3,
			trixel_colour_b4: h.trixel_colour_b4,
			trixel_colour_b5: h.trixel_colour_b5,
			trixel_colour_b6: h.trixel_colour_b6,
			trixel_colour_b7: h.trixel_colour_b7,
			trixel_colour_b8: h.trixel_colour_b8,
			trixel_colour_b9: h.trixel_colour_b9,
			trixel_colour_c1: h.trixel_colour_c1,
			trixel_colour_c2: h.trixel_colour_c2,
			trixel_colour_c3: h.trixel_colour_c3,
			trixel_colour_c4: h.trixel_colour_c4,
			trixel_colour_c5: h.trixel_colour_c5,
			trixel_colour_c6: h.trixel_colour_c6,
			trixel_colour_c7: h.trixel_colour_c7,
			trixel_colour_c8: h.trixel_colour_c8,
			trixel_colour_c9: h.trixel_colour_c9,
			trixel_colour_c10: h.trixel_colour_c10,
			trixel_colour_c11: h.trixel_colour_c11,
			trixel_colour_d1: h.trixel_colour_d1,
			trixel_colour_d2: h.trixel_colour_d2,
			trixel_colour_d3: h.trixel_colour_d3,
			trixel_colour_d4: h.trixel_colour_d4,
			trixel_colour_d5: h.trixel_colour_d5,
			trixel_colour_d6: h.trixel_colour_d6,
			trixel_colour_d7: h.trixel_colour_d7,
			trixel_colour_d8: h.trixel_colour_d8,
			trixel_colour_d9: h.trixel_colour_d9,
			trixel_colour_d10: h.trixel_colour_d10,
			trixel_colour_d11: h.trixel_colour_d11,
			trixel_colour_e1: h.trixel_colour_e1,
			trixel_colour_e2: h.trixel_colour_e2,
			trixel_colour_e3: h.trixel_colour_e3,
			trixel_colour_e4: h.trixel_colour_e4,
			trixel_colour_e5: h.trixel_colour_e5,
			trixel_colour_e6: h.trixel_colour_e6,
			trixel_colour_e7: h.trixel_colour_e7,
			trixel_colour_e8: h.trixel_colour_e8,
			trixel_colour_e9: h.trixel_colour_e9,
			trixel_colour_f1: h.trixel_colour_f1,
			trixel_colour_f2: h.trixel_colour_f2,
			trixel_colour_f3: h.trixel_colour_f3,
			trixel_colour_f4: h.trixel_colour_f4,
			trixel_colour_f5: h.trixel_colour_f5,
			trixel_colour_f6: h.trixel_colour_f6,
			trixel_colour_f7: h.trixel_colour_f7,
			country_code: h.country_code
		}}

		processed_hidden_hexes = hidden_hexes.map{ |h| {
			draft: h.draft,
			order: h.order
		}}

		return processed_hidden_hexes + processed_visible_hexes

	end


end