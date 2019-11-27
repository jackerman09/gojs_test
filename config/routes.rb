Rails.application.routes.draw do
  root  'landings#index'
  resources :entities
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
