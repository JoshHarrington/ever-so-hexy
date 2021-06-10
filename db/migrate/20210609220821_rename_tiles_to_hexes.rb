class RenameTilesToHexes < ActiveRecord::Migration[6.1]
  def change
    rename_table :tiles, :hexes
  end
end
