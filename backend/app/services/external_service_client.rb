class ExternalServiceClient
  include HTTParty
  default_options.update(timeout: 20)

  def initialize(service_name)
    @service_name = service_name
    self.class.base_uri base_uri_for_service
  end

  def fetch_data
    case @service_name
    when :service_one
      self.class.get('/')
    when :service_two
      self.class.get('/')
    else
      raise ArgumentError, "Unknown service: #{@service_name}"
    end
  rescue Net::OpenTimeout, Net::ReadTimeout => e
    Rails.logger.error("External service error: #{e.message}")
    handle_service_unavailable
  end

  private

  def base_uri_for_service
    case @service_name
    when :service_one
      ENV['AUTH_API']
    when :service_two
      ENV['REACT_URL']
    else
      raise ArgumentError, "Unknown service: #{@service_name}"
    end
  end

  def handle_service_unavailable
    raise ServiceUnavailableError, 'The external service is currently unavailable.'
  end
end

