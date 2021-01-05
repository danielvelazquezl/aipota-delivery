class AddColumsToSupermarket < ActiveRecord::Migration[5.2]
  def change
    add_column :supermarkets, :name, :string
    add_column :supermarkets, :direction, :string
  end
end
