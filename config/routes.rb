Rails.application.routes.draw do
  root "urls#index"
  resources :urls, only: [:index, :create, :show, :update], param: :slug
end
