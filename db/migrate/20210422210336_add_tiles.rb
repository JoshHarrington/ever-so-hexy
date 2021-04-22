class AddTiles < ActiveRecord::Migration[6.1]
  def change
    create_table :tiles do |t|
      t.string :location
      t.string :country_code
      t.boolean :draft

      t.timestamps
    end
  end
end
