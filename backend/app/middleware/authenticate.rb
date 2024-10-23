require 'jwt'

class Authenticate
  EXCLUDED_ROUTES = [
    '/api/v1/register',
    '/api/v1/login',
    '/api/v1/refresh',
    '/api/v1/check_token',
    '/api/v1/verify',
    '/api/v1/resend_verification',
    '/api/v1/logout',
    '/api/v1/scholarships',
    '/api/v1/scholarships/index',
    '/api/v1/scholarships/show',
    '/api/v1/scholarship_providers',
    '/api/v1/scholarship_providers/index',
    '/api/v1/scholarship_providers/show',
    '/api/v1/scholarship_provider_profiles',
    '/api/v1/scholarship_provider_profiles/index',
    '/api/v1/scholarship_provider_profiles/show',
    '/api/v1/survey_questions',
    '/api/v1/subscribers',
    '/api/v1/subscribers/show',
    '/api/v1/subscribers/soft_delete',
    '/api/v1/subscribers/restore',
    '/api/v1/scholarship_types',
    '/api/v1/scholarship_types/index',
    '/api/v1/courses',
    '/api/v1/courses/index',
    '/api/v1/benefits',
    '/api/v1/benefits/index',
    '/api/v1/benefit_categories',
    '/api/v1/benefit_categories/index',
    '/api/v1/schools',
    '/api/v1/schools/index',
    '/api/v1/survey_responses',
    '/api/v1/newsletters',
    '/api/v1/newsletters/create',
    '/api/v1/cities',
    '/api/v1/cities/index',
    '/api/v1/ph_addresses',
    '/api/v1/ph_addresses/index',
    '/api/v1/provinces',
    '/api/v1/provinces/index',
    '/api/v1/regions',
    '/api/v1/regions/index',
    '/api/v1/scholarship_applications/send_email',
  ].freeze


  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)
    
    if excluded_route?(request.path_info)
      return @app.call(env)
    end

    return @app.call(env)
  end

  private

  def excluded_route?(path)
    EXCLUDED_ROUTES.any? { |pattern| path.match?(pattern) }
  end

  def unauthorized_response
    [401, { 'Content-Type' => 'application/json' }, [{ error: 'Unauthorized' }.to_json]]
  end
end
