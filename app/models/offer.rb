class Offer < ApplicationRecord
  belongs_to :supermarket
  has_many :offer_details
  accepts_nested_attributes_for :offer_details, :allow_destroy => true
  delegate :name, :to => :supermarket, :prefix => true
end
