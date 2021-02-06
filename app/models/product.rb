class Product < ApplicationRecord
  has_many :offer_details
  extend Enumerize
  enumerize :product_category, in: [:drinks,
                                    :meats,
                                    :fruits_and_vegetables,
                                    :dairy,
                                    :bakery,
                                    :cleaning]

  filterrific(
    available_filters: [:with_category]
  )

  # filters on 'estate_type' attribute
  scope :with_category, lambda { |categories|
    where(category: [*categories])
  }
end
