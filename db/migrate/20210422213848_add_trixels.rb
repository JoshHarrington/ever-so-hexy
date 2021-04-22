class AddTrixels < ActiveRecord::Migration[6.1]
  def change
    create_table :trixels do |t|
      t.belongs_to :tile, index: true
      t.string :colour
      t.string :position

      t.timestamps
    end
    add_foreign_key :trixels, :tiles
  end
end
