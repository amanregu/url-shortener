Rails.application.routes.draw do
  resources :categories
  root "urls#index"
  resources :urls, only: [:index, :create, :show, :update], param: :slug
end
