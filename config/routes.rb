Rails.application.routes.draw do
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/new', to: 'pages#new'
  post '/hexes/:order', to: 'pages#update'
  get '/hexes/:order/publish', to: 'pages#publish'
  delete '/hexes/:order', to: 'pages#destroy'
end
