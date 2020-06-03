Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index, :create, :update, :destroy]
      resources :urls, only: [:index, :create, :show, :update], param: :slug
      resources :clicks, only: [:index, :create]
    end
  end
  root "api/v1/urls#index"
  get '/*path' => 'api/v1/urls#index'
end
