class ApplicationController < ActionController::Base
    rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

    private
    def record_not_found(error)
        render json: { message: error.to_s }, status: :not_found
    end
end
