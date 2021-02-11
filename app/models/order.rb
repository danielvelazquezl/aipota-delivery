class Order < ApplicationRecord
  extend Enumerize
  belongs_to :supermarket
  has_many :order_details
  accepts_nested_attributes_for :order_details, :allow_destroy => true
  delegate :name, :to => :supermarket, :prefix => true
  enumerize :status, in: [:in_process, :received, :canceled]

  filterrific(
    default_filter_params: { sorted_by: "total_asc" },
    available_filters: [:sorted_by, :by_supermarket, :date_to, :date_from],
  )

  scope :by_supermarket, lambda { |query|
    return nil if query.blank?
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
          'LOWER(supermarkets.name) LIKE ?',
        ].join(' OR ')
        "(#{or_clauses})"
      end.join(' AND '),
      *terms.map { |e| [e] * num_or_conditions }.flatten
    ).joins(:supermarket).references(:supermarkets)
  }

  scope :by_date, ->(date_to) {
    where('(order_date <= ?)', date_to)
  }

  scope :date_to, ->(date_to) {
    where('(order_date <= ?)', date_to)
  }

  scope :date_from, ->(date_from) {
    where('(order_date >= ?)', date_from)
  }

  scope :sorted_by, lambda { |sort_option|
    case sort_option
    when /^total_asc/
      order("orders.total asc")
    end
  }
end
