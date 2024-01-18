module Api
  module V1
    class SubscribersController < ApplicationController
      before_action :set_subscriber, only: %i[ show edit update destroy soft_del restore]
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

      def soft_del
        if Subscriber.is_soft_deleted(@subscriber)
          Subscriber.soft_delete(@subscriber)
          render json: {message: "Unsubscribed successfully.", status: :ok}
        else
          render json: {message: "Already unsubscribed", status: :unprocessable_entity}, status: 422
        end
        
      end
    
      def restore
        if !Subscriber.is_soft_deleted(@subscriber)
          Subscriber.restore(@subscriber)
          render json: {message: "Subscriber restored", status: :ok}
        else
          render json: {message: "Already subscribed", status: :unprocessable_entity}, status: 422
        end

      end
    
      private
    
      def set_subscriber
        @subscriber = Subscriber.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def subscriber_params
        params.require(:subscriber).permit(:email, :user_type)
      end
    end
  end
end
