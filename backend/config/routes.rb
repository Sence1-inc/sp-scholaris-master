Rails.application.routes.draw do
  resources :roles
  get "up" => "rails/health#show", as: :rails_health_check

  authenticated_routes = proc do
    namespace :api do
      namespace :v1 do
        resources :scholarships, only: [:edit, :update, :destroy]
        post 'scholarships/upload', to: 'scholarships#upload', as: 'scholarships_upload'
        resources :scholarship_providers
        resources :scholarship_provider_profiles
      end
    end
  end

  namespace :api do
    namespace :v1 do
      post 'register', to: 'users#register', as: 'users_register'
      post 'login', to: 'users#login', as: 'users_login'
      resources :scholarships, only: [:index, :show]
      resources :survey_questions
      resources :subscribers
      post 'subscribers/soft_delete', to: 'subscribers#soft_del', as: 'subscribers_soft_delete'
      post 'subscribers/restore', to: 'subscribers#restore'
      resources :scholarship_types
      resources :courses
      resources :survey_responses
      resources :newsletters
      resources :benefits
      resources :schools
    end
  end

  constraints ->(request) { request.cookies['access_token'].present? } do
    instance_eval(&authenticated_routes)
  end
end
