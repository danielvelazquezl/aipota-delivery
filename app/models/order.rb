class Order < ApplicationRecord
  belongs_to :supermarket
  has_many :order_details
  accepts_nested_attributes_for :order_details, :allow_destroy => true
  delegate :name, :to => :supermarket, :prefix => true
  enumerize :status, in: [:in_process, :received, :canceled]
end
