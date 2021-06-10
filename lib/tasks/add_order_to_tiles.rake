desc "Reset the hex ordering"

task reset_hex_order: :environment do
	Hex.all.order(created_at: :asc).each_with_index do |t, i|
		t.update(order: i + 1)
	end
end


