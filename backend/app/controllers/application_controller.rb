class ApplicationController < ActionController::Base
    rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

    def render_unauthorized_response
        render json: { error: 'Forbidden' }, status: :forbidden
    end

    private
    def record_not_found(error)
        render json: { message: error.to_s }, status: :not_found
    end
end
