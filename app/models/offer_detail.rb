class OfferDetail < ApplicationRecord
  belongs_to :offer
  belongs_to :product
  delegate :description, :to => :product, :prefix => true
end
