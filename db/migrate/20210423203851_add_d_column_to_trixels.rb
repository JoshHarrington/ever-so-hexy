class AddDColumnToTrixels < ActiveRecord::Migration[6.1]
  def change
    add_column :trixels, :d, :string
  end
end
