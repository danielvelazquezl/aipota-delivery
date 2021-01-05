class CreateOffers < ActiveRecord::Migration[5.2]
  def change
    create_table :offers do |t|
      t.date :start_date
      t.date :end_date
      t.string :description
      t.integer :discount
      t.references :supermarket, foreign_key: true

      t.timestamps
    end
  end
end
