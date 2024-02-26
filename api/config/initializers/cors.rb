Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001'  # Update with your React frontend URL
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
  end
end
