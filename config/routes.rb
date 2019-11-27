Rails.application.routes.draw do
  root  'landings#index'
  resources :entities
end
