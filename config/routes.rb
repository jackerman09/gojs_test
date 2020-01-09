Rails.application.routes.draw do
  root  'landings#index'
  resources :entities do
  	member do
  		get		'/relative-info',	to: 'entities#relative_data'
  	end
  end
end
