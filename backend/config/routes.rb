Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :scholarship_applications do
        post 'send_email', on: :collection, to: 'scholarship_applications#send_email', as: 'send_email'
      end
      post 'register', to: 'users#register', as: 'users_register'
      resources :users do
        get 'scholarship_applications', on: :member, to: 'users#scholarship_applications'
      end
      post 'login', to: 'users#login', as: 'users_login'
      post 'refresh', to: 'users#refresh', as: 'users_refresh'
      get 'verify_email/:token', to: 'users#verify', as: 'users_verify_email'
      post 'resend_verification', to: 'users#resend_verification', as: 'users_resend_verification'
      get 'check_token', to: 'users#check_token', as: 'users_check_token'
      post 'logout', to: 'users#logout', as: 'users_logout'
      resources :scholarships, only: [:index, :create, :show, :edit, :update, :destroy] do
        post 'upload', on: :collection
      end
      resources :survey_questions
      resources :subscribers do
        post 'soft_delete', on: :collection, to: 'subscribers#soft_del', as: 'soft_delete'
        post 'restore', on: :collection, to: 'subscribers#restore'
      end
      resources :scholarship_types
      resources :courses
      resources :survey_responses
      resources :newsletters
      resources :benefits
      resources :ph_addresses
      resources :benefit_categories
      resources :schools
      resources :scholarship_providers do
        get 'scholarships', on: :member, to: 'scholarship_providers#scholarships', as: 'scholarship_providers_scholarships'
        get 'scholarship_applications', on: :member, to: 'scholarship_providers#scholarship_applications'
        put 'scholarship_applications/:scholarship_application_id', on: :member, to: 'scholarship_providers#update_scholarship_application', as: 'scholarship_providers_update_scholarship_applications'
      end
      resources :scholarship_provider_profiles
      resources :regions
      resources :provinces
      resources :cities
      resources :roles
      resources :student_profiles
      resources :user_permissions
    end
  end
end
