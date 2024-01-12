class SubscribersController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    @subscriber = Subscriber.new(subscriber_params)
    if @subscriber.save
      render json: { email: "user@example.com", user_type: "provider", message: "Subscription successful. Welcome to our newsletter!" }, status: :created
    else
      render json: { error: "Subscription failed", details: @subscriber.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def subscriber_params
    params.require(:subscriber).permit(:email, :user_type)
  end
end
