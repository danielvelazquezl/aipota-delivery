class CreateOfferDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :offer_details do |t|
      t.references :offer, foreign_key: true
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end
