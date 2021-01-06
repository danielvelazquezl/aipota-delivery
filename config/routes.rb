Rails.application.routes.draw do
  # home page
  get 'welcome/index'
  root 'welcome#index'

  resources :supermarkets
  resources :orders
  resources :offers
  resources :products
end
