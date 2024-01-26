module Api
  module V1
    class NewslettersController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_newsletter, only: %i[ show edit update destroy ]
    
      # GET /newsletters or /newsletters.json
      def index
        @newsletters = Newsletter.all
      end
    
      # GET /newsletters/1 or /newsletters/1.json
      def show
      end
    
      # GET /newsletters/new
      def new
        @newsletter = Newsletter.new
      end
    
      # GET /newsletters/1/edit
      def edit
      end
    
      # POST /newsletters or /newsletters.json
      def create
        newsletter = NewsletterService.new(newsletter_params)
      
        if newsletter.send_newsletter
          render_success_response(newsletter)
        else
          render_error_response
        end
      end
    
      # PATCH/PUT /newsletters/1 or /newsletters/1.json
      def update
        respond_to do |format|
          if @newsletter.update(newsletter_params)
            format.html { redirect_to newsletter_url(@newsletter), notice: "Newsletter was successfully updated." }
            format.json { render :show, status: :ok, location: @newsletter }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @newsletter.errors, status: :unprocessable_entity }
          end
        end
      end
    
      # DELETE /newsletters/1 or /newsletters/1.json
      def destroy
        @newsletter.destroy!
    
        respond_to do |format|
          format.html { redirect_to newsletters_url, notice: "Newsletter was successfully destroyed." }
          format.json { head :no_content }
        end
      end
    
      private 

      def set_newsletter
        @newsletter = Newsletter.find(params[:id])
      end
  
      def newsletter_params
        params.require(:newsletter).permit(:subject, :content, :user_type, :email)
      end

      def render_success_response(newsletter_service)
        render json: {
          id: newsletter_service.id,
          subject: newsletter_service.subject,
          content: newsletter_service.content,
          user_type: newsletter_service.user_type,
          message: "Newsletter sent successfully to subscribers."
        }, status: :ok
      end
      
      def render_error_response
        render json: { error: 'Failed to send newsletter.' }, status: :unprocessable_entity
      end
    end
  end
end
