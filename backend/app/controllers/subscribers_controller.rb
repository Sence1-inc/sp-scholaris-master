class SubscribersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /subscribers
  def index
    @subscribers = Subscriber.all
  end

  # GET /subscribers/{id}
  def show
  end

  # GET /subscribers/new
  def new
    @post = Post.new
  end

  # GET /subscribers/{id}/edit
  def edit
  end
  
  # POST /subscribers
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

  # PATCH/PUT /subscribers/{id}
  def update
  end

  # DELETE /subscribers/{id}
  def destroy
  end

  private

  def subscriber_params
    params.require(:subscriber).permit(:email, :user_type)
  end
end
