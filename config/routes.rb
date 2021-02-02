Rails.application.routes.draw do
  # home page
  get 'welcome/index'
  root 'welcome#index'

  # supermarket routes
  get 'supermarkets/search', to: 'supermarkets#search'
  resources :supermarkets

  resources :orders
  resources :offers

  # products routes
  get 'products/cart', to: 'products#cart'
  resources :products
end
