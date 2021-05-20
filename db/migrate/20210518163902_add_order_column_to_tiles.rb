class AddOrderColumnToTiles < ActiveRecord::Migration[6.1]
  def change
    add_column :tiles, :order, :bigint, default: 0
  end
end
