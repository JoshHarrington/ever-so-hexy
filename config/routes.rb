Rails.application.routes.draw do
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/new', to: 'pages#new'
  post '/tiles/:id', to: 'pages#update'
  get '/tiles/:id/publish', to: 'pages#publish'
  delete '/tiles/:order', to: 'pages#destroy'
end
