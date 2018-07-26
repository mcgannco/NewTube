Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :username, only: [:create]
    resources :users, only: [:create, :update, :show, :index]
    resource :session, only: [:create, :destroy]
    resources :videos, only: [:create, :index, :show, :update, :destroy] do
      collection do
        get 'toptags'
      end
      resources :comments, only: [:create, :index, :show, :update, :destroy] do
        resources :likes, only: [:create, :update]
      end
      resources :likes, only: [:create, :update]
    end
    get "videos/history/:request_counter", to: "videos#history"
    resources :likes, only: [:destroy]
    post 'users/subscriptions/:subscribee_id', to: 'users#subscribe'
    delete 'users/subscriptions/:subscribee_id', to: 'users#unsubscribe'
    post 'users/watchlaters/:video_id', to: 'users#watchlater'
    delete 'users/watchlaters/:video_id', to: 'users#removewatchlater'
    resources :search, only: [:index]
    resources :views, only: [:create]
    resources :filtered_videos, only: [:index]
    resources :subscriptions, only: [:index]
  end
end
