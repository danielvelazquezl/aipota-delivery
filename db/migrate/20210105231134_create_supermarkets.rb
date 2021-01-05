class CreateSupermarkets < ActiveRecord::Migration[5.2]
  def change
    create_table :supermarkets do |t|

      t.timestamps
    end
  end
end
