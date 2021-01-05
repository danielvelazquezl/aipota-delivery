class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.string :user
      t.integer :total
      t.string :location
      t.references :supermarket, foreign_key: true
      t.date :order_date
      t.string :status

      t.timestamps
    end
  end
end
