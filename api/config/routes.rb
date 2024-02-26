Rails.application.routes.draw do
  # devise_for :users,  controllers: { sessions: 'users/sessions' }, path: 'auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :goals, only: [:index, :create, :show], defaults: { format: 'json' } do
    member do
      get 'progress'
    end
    resources :goal_stats, only: [:index, :create]
  end


end
