Rails.application.routes.draw do
  # home page
  get 'welcome/index'
  root 'welcome#index'

  resources :supermarkets do
    collection do
      get 'search_supermarket', :to => 'supermarkets#search_supermarket', :as => 'search_supermarket'
    end
  end
  resources :orders
  resources :offers
  resources :products
end
