Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      # origins ENV["REACT_URL"] || 'http://localhost:3000' 
      origins '*'
      resource '/api/v1/*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end
  