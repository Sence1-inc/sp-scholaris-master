class SubscribersController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    @subscriber = Subscriber.new(subscriber_params)
    if EmailValidator.valid?(subscriber_params[:email])
      if @subscriber.save
        render json: { email: @subscriber.email, user_type: @subscriber.user_type, message: "Subscription successful. Welcome to our newsletter!" }, status: :created
      else
        render json: { error: "Subscription failed", details: @subscriber.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Subscription failed", details: "The email '#{subscriber_params[:email]}' is not valid." }, status: 400
    end
  end

  private

  def subscriber_params
    params.require(:subscriber).permit(:email, :user_type)
  end
end
