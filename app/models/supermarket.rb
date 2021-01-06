class Supermarket < ApplicationRecord
  has_many :offers
  has_many :orders

end
