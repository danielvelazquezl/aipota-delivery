class AddImageToSupermarkets < ActiveRecord::Migration[5.2]
  def change
    add_column :supermarkets, :image, :string
  end
end
