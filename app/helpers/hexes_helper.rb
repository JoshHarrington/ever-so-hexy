module HexesHelper

	def hex_wrapper_gutter
		return 3
	end

	def split_into_layers(hexes:[])
		if hexes == []
			return nil
		end

		hexes_copy = hexes.clone.sort_by{|h|h[:order]}
		layer_size = 1
		items_in_layers = []

		layer_size_limit = 10

		last_order_in_layer = 0

		while hexes_copy.length > 0

			last_order_in_layer = layer_size + last_order_in_layer

			first_order_in_layer = last_order_in_layer - layer_size + 1

			if layer_size < layer_size_limit
				layer_size += 1
			end

			items_to_move_to_layers = hexes_copy.select{|h| h[:order] <= last_order_in_layer}

			number_of_expected_hexes_in_layer = last_order_in_layer - first_order_in_layer + 1
			array_of_expected_orders_in_layer = Array(first_order_in_layer..last_order_in_layer)

			if array_of_expected_orders_in_layer != items_to_move_to_layers.map{|h| h[:order]}
				array_of_expected_orders_in_layer.each_with_index do |o, i|
					if items_to_move_to_layers[i] && items_to_move_to_layers[i][:order] != o
						items_to_move_to_layers.insert(i, {})
					end
				end
			end

			hexes_copy = hexes_copy.reject{|h| h[:order] <= last_order_in_layer}

			items_in_layers.push(items_to_move_to_layers)

		end

		return items_in_layers.reject{|l| l.length == 0}

	end

	def hex_transforms_from_order(order:)
		array_from_order = Array.new(order){|i| {order: i + 1}}
		layered_array = split_into_layers(hexes: array_from_order)

		current_layer_index = layered_array.length - 1
		current_position_within_layer = layered_array.last.length

		return {
			left: (current_layer_index * 7) - (current_position_within_layer * 3.5) + hex_wrapper_gutter + 3.5,
			top: current_position_within_layer * 6 - hex_wrapper_gutter
		}
	end

	def hex_spacing_for_first_hex(number_of_layers:,size_of_largest_rendered_layer:)
		{
			top: hex_wrapper_gutter,
			right: (number_of_layers - 1) * 7 + hex_wrapper_gutter,
			bottom: (size_of_largest_rendered_layer - 1) * 6 + hex_wrapper_gutter,
			left: hex_wrapper_gutter
		}
	end

	def hex_spacing_for_non_first_hexes(current_position_within_layer:, layer_index:)
		{
			top: current_position_within_layer * 6 - hex_wrapper_gutter,
			right: nil,
			bottom: nil,
			left: (layer_index * 7) - (current_position_within_layer * 3.5) + hex_wrapper_gutter + 3.5
		}
	end

	def size_of_largest_rendered_layer(hexes_in_layers:)
		size_of_largest_rendered_layer = hexes_in_layers.length > 1 ? hexes_in_layers.sort_by{|l| l.length}.last.length : 1

		return size_of_largest_rendered_layer
	end

	def hex_spacing(hexes_in_layers:, hex_order:, current_position_within_layer:, layer_index:)
		if hex_order == 1

			size_of_largest_rendered_layer = size_of_largest_rendered_layer(hexes_in_layers: hexes_in_layers)

			hex_spacing = hex_spacing_for_first_hex(
				number_of_layers: hexes_in_layers.length,
				size_of_largest_rendered_layer: size_of_largest_rendered_layer
			)
		else
			hex_spacing = hex_spacing_for_non_first_hexes(
				current_position_within_layer: current_position_within_layer,
				layer_index: layer_index
			)
		end

		return hex_spacing
	end

	def hide_private_hex_data(
		hexes_in_layers: nil,
		current_draft_hex_id: nil
	)

		if hexes_in_layers == nil
			return []
		elsif hexes_in_layers.first.class != Array
			raise Exception.new "hexes_in_layers need to split into layers"
		end

		hexes_in_layers.map.with_index{|layer, l_i|

			layer.map.with_index{|hex, h_i|

				next {} unless hex[:order]

				hex_spacing = hex_spacing(
					hexes_in_layers: hexes_in_layers,
					hex_order: hex[:order],
					current_position_within_layer: h_i + 1,
					layer_index: l_i
				)

				hex_data = {
					draft: hex[:draft],
					order: hex[:order],
					top: hex_spacing[:top],
					right: hex_spacing[:right],
					bottom: hex_spacing[:bottom],
					left: hex_spacing[:left]
				}

				if hex[:draft] != true || (current_draft_hex_id != nil && hex[:id] == current_draft_hex_id)

					hex_data.merge!({
						created_at: hex.created_at,
						trixel_colour_a1: hex.trixel_colour_a1,
						trixel_colour_a2: hex.trixel_colour_a2,
						trixel_colour_a3: hex.trixel_colour_a3,
						trixel_colour_a4: hex.trixel_colour_a4,
						trixel_colour_a5: hex.trixel_colour_a5,
						trixel_colour_a6: hex.trixel_colour_a6,
						trixel_colour_a7: hex.trixel_colour_a7,
						trixel_colour_b1: hex.trixel_colour_b1,
						trixel_colour_b2: hex.trixel_colour_b2,
						trixel_colour_b3: hex.trixel_colour_b3,
						trixel_colour_b4: hex.trixel_colour_b4,
						trixel_colour_b5: hex.trixel_colour_b5,
						trixel_colour_b6: hex.trixel_colour_b6,
						trixel_colour_b7: hex.trixel_colour_b7,
						trixel_colour_b8: hex.trixel_colour_b8,
						trixel_colour_b9: hex.trixel_colour_b9,
						trixel_colour_c1: hex.trixel_colour_c1,
						trixel_colour_c2: hex.trixel_colour_c2,
						trixel_colour_c3: hex.trixel_colour_c3,
						trixel_colour_c4: hex.trixel_colour_c4,
						trixel_colour_c5: hex.trixel_colour_c5,
						trixel_colour_c6: hex.trixel_colour_c6,
						trixel_colour_c7: hex.trixel_colour_c7,
						trixel_colour_c8: hex.trixel_colour_c8,
						trixel_colour_c9: hex.trixel_colour_c9,
						trixel_colour_c10: hex.trixel_colour_c10,
						trixel_colour_c11: hex.trixel_colour_c11,
						trixel_colour_d1: hex.trixel_colour_d1,
						trixel_colour_d2: hex.trixel_colour_d2,
						trixel_colour_d3: hex.trixel_colour_d3,
						trixel_colour_d4: hex.trixel_colour_d4,
						trixel_colour_d5: hex.trixel_colour_d5,
						trixel_colour_d6: hex.trixel_colour_d6,
						trixel_colour_d7: hex.trixel_colour_d7,
						trixel_colour_d8: hex.trixel_colour_d8,
						trixel_colour_d9: hex.trixel_colour_d9,
						trixel_colour_d10: hex.trixel_colour_d10,
						trixel_colour_d11: hex.trixel_colour_d11,
						trixel_colour_e1: hex.trixel_colour_e1,
						trixel_colour_e2: hex.trixel_colour_e2,
						trixel_colour_e3: hex.trixel_colour_e3,
						trixel_colour_e4: hex.trixel_colour_e4,
						trixel_colour_e5: hex.trixel_colour_e5,
						trixel_colour_e6: hex.trixel_colour_e6,
						trixel_colour_e7: hex.trixel_colour_e7,
						trixel_colour_e8: hex.trixel_colour_e8,
						trixel_colour_e9: hex.trixel_colour_e9,
						trixel_colour_f1: hex.trixel_colour_f1,
						trixel_colour_f2: hex.trixel_colour_f2,
						trixel_colour_f3: hex.trixel_colour_f3,
						trixel_colour_f4: hex.trixel_colour_f4,
						trixel_colour_f5: hex.trixel_colour_f5,
						trixel_colour_f6: hex.trixel_colour_f6,
						trixel_colour_f7: hex.trixel_colour_f7,
						country_code: hex.country_code
					})
				end

				hex_data

			}
		}

	end


end
