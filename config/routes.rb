Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :username, only: [:create]
    resources :users, only: [:create, :update, :show, :index]
    resource :session, only: [:create, :destroy]
    resources :videos, only: [:create, :index, :show, :update] do
      resources :comments, only: [:create, :index, :show, :edit, :destroy]
      resources :likes, only: [:create, :update]
    end
    resources :likes, only: [:destroy]
  end
end
