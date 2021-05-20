desc "Reset the tile ordering"

task reset_tile_order: :environment do
	Tile.all.order(created_at: :asc).each_with_index do |t, i|
		t.update(order: i + 1)
	end
end


