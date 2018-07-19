Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :username, only: [:create]
    resources :users, only: [:create, :update, :show, :index]
    resource :session, only: [:create, :destroy]
    resources :videos, only: [:create, :index, :show, :update, :destroy] do
      resources :comments, only: [:create, :index, :show, :update, :destroy] do
        resources :likes, only: [:create, :update]
      end
      resources :likes, only: [:create, :update]
    end
    resources :likes, only: [:destroy]

    post 'users/subscriptions/:subscribee_id', to: 'users#subscribe'
    delete 'users/subscriptions/:subscribee_id', to: 'users#unsubscribe'

    post 'users/watchlaters/:video_id', to: 'users#watchlater'
    delete 'users/watchlaters/:video_id', to: 'users#removewatchlater'

  end
end
