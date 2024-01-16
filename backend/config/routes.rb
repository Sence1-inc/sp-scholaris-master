Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :subscribers
      post 'subscribers/soft_delete', to: 'subscribers#soft_del'
      post 'subscribers/restore', to: 'subscribers#restore'
    end
  end
end
