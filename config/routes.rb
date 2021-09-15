Rails.application.routes.draw do
  root to: 'hexes#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/new', to: 'hexes#new'
  post '/hexes/:order', to: 'hexes#update'
  get '/hexes/:order/publish', to: 'hexes#publish'
  delete '/hexes/:order', to: 'hexes#destroy'

  scope '/admin' do
    get '/', to: 'admin#index', as: 'admin_root'
    delete '/hex/:id', to: 'admin#destroy_hex', as: 'admin_destroy_hex'
  end
end
