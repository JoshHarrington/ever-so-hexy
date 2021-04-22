class MakeTileAndTrixelColumnsRequired < ActiveRecord::Migration[6.1]
  def change
    change_column :tiles, :draft, :boolean, null: false, default: true

    change_column :trixels, :colour, :string, null: false, default: "white"
    change_column :trixels, :position, :string, null: false
  end
end
