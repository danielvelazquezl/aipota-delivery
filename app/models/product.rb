class Product < ApplicationRecord
  has_many :offer_details
  extend Enumerize
  enumerize :product_category, in: [:warehouse,
                                    :drinks,
                                    :meats,
                                    :fruits_and_vegetables,
                                    :dairy,
                                    :bakery,
                                    :cleaning]

  filterrific(
    available_filters: [:with_category, :search_query]
  )

  scope :with_category, lambda { |categories|
    where(category: [*categories])
  }

  scope :search_query, lambda { |query|
    # condition query, parse into individual keywords
    terms = query.to_s.downcase.split(/\s+/)
    # replace "*" with "%" for wildcard searches,
    # append '%', remove duplicate '%'s
    terms = terms.map { |e| ('%' + e.gsub('*', '%') + '%').gsub(/%+/, '%') }
    # configure number of OR conditions for provision
    # of interpolation arguments. Adjust this if you
    # change the number of OR conditions.
    num_or_conditions = 1
    where(
      terms.map do
        or_clauses = [
          'LOWER(products.description) LIKE ?',
        ].join(' OR ')
        "(#{or_clauses})"
      end.join(' AND '),
      *terms.map { |e| [e] * num_or_conditions }.flatten
    )
  }

end
