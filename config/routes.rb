Rails.application.routes.draw do
  post '/create' => "urls#encode"
  get '/show' => "urls#decode"
end
