class DropTrixelsTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :trixels do |t|
      t.string :colour
      t.string :position

      t.timestamps
    end
  end
end
