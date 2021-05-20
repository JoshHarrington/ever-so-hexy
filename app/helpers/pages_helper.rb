module PagesHelper

	def clean_tile_array(tiles:, is_in_editing_mode: false)
    return tiles.map{ |t| {
				id: t.id,
				draft: t.draft,
				order: t.order,
				trixels: !t.draft || is_in_editing_mode ? t.trixels.map{|tr| {
					colour: tr.colour,
					position: tr.position,
					d: tr.d
				}} : nil
			}
    }
	end


end
