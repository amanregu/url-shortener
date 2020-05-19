Rails.application.routes.draw do
  post '/create' => "urls#encode"
  get '/show' => "urls#decode"
  resources :urls, only: [:index, :update, :patch]
end
