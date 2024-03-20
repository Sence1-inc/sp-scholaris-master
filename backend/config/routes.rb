Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :survey_questions
      resources :subscribers
      post 'subscribers/soft_delete', to: 'subscribers#soft_del', as: 'subscribers_soft_delete'
      post 'subscribers/restore', to: 'subscribers#restore'
      resources :scholarships
      post 'scholarships/upload', to: 'scholarships#upload', as: 'scholarships_upload'
      resources :newsletters
      resources :benefits
      resources :schools
      resources :scholarship_providers
      resources :courses
      resources :survey_responses
      resources :scholarship_provider_profiles
      resources :scholarship_types
    end
  end
end
