Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      post 'register', to: 'users#register', as: 'users_register'
      post 'login', to: 'users#login', as: 'users_login'
      post 'refresh', to: 'users#refresh', as: 'users_refresh'
      resources :scholarships, only: [:index, :show, :edit, :update, :destroy] do
        post 'upload', on: :collection
      end          
      resources :survey_questions
      resources :subscribers do
        post 'soft_delete', on: :member, to: 'subscribers#soft_del', as: 'soft_delete'
        post 'restore', on: :member, to: 'subscribers#restore'
      end
      resources :scholarship_types
      resources :courses
      resources :survey_responses
      resources :newsletters
      resources :benefits
      resources :schools
      resources :scholarship_providers
      resources :scholarship_provider_profiles
      resources :regions
      resources :provinces
      resources :cities
      resources :roles
    end
  end
end
