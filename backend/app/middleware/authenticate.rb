require 'jwt'

class Authenticate
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)
    auth_routes = ['/api/v1/login', '/api/v1/register']
    
    # Skip authentication if the request path matches a login route
    if auth_routes.include?(request.path)
      return @app.call(env)
    end

    if valid_token?(request)
      @app.call(env)
    else
      unauthorized_response
    end
  end

  private

  def valid_token?(request)
    access_token = request.cookies['access_token']
    return false unless access_token

    begin
      decoded_token = JWT.decode(access_token, nil, false)
      payload = decoded_token.first
      current_time = Time.now.to_i

      if payload['exp'] && payload['exp'] < current_time
        return false
      end
      
      true
    rescue JWT::DecodeError, JWT::ExpiredSignature
      false
    end
  end

  def unauthorized_response
    [401, { 'Content-Type' => 'application/json' }, [{ error: 'Unauthorized' }.to_json]]
  end
end
