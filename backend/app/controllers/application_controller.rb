class ApplicationController < ActionController::Base
    rescue_from ServiceUnavailableError, with: :handle_service_unavailable
    rescue_from ArgumentError, with: :handle_argument_error
    rescue_from Timeout::Error, with: :handle_timeout
    rescue_from StandardError, with: :handle_standard_error
    rescue_from CustomError, with: :handle_custom_error
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def render_unauthorized_response
        render json: { error: 'Forbidden' }, status: :forbidden
    end

    def handle_standard_error(exception)
        Rails.logger.error("Error: #{exception.message}")
        Rails.logger.error(exception.backtrace.join("\n"))
        render json: { error: exception.message }, status: :internal_server_error
    end

    def handle_custom_error(exception)
        Rails.logger.error("Custom error: #{exception.message}")
        status = exception.respond_to?(:status) ? exception.status : :unprocessable_entity
        render json: { error: exception.message }, status: status
    end

    def record_not_found(exception)
        Rails.logger.error("Record not found: #{exception.message}")
        render json: { error: "Record not found", message: exception.message }, status: :not_found
    end

    def handle_argument_error(exception)
        Rails.logger.error("Argument error: #{exception.message}")
        render json: { error: "Invalid request parameter: #{exception.message}" }, status: :bad_request
    end
end
