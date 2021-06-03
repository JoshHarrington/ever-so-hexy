class RenameIpAddressColumn < ActiveRecord::Migration[6.1]
  def change
  	rename_column :tiles, :location, :ip_address
  end
end
