class AddForeignKeyToCartItems < ActiveRecord::Migration[5.2]
  def change
    add_foreign_key :cart_items, :products
  end
end
