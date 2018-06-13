Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :username, only: [:create]
    resource :user, only: [:create, :update, :show]
    resource :session, only: [:create, :destroy]
    resources :videos, only: [:create, :index]
  end
end
