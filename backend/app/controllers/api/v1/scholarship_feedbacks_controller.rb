module Api
  module V1
    class ScholarshipFeedbacksController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_scholarship_feedback, only: %i[ show edit update destroy ]

      # GET /scholarship_feedbacks or /scholarship_feedbacks.json
      def index
        @scholarship_feedbacks = ScholarshipFeedback.all
      end

      # GET /scholarship_feedbacks/1 or /scholarship_feedbacks/1.json
      def show
      end

      # GET /scholarship_feedbacks/new
      def new
        @scholarship_feedback = ScholarshipFeedback.new
      end

      # GET /scholarship_feedbacks/1/edit
      def edit
      end

      # POST /scholarship_feedbacks or /scholarship_feedbacks.json
      def create
        user = User.find_by(email_address: JwtService.decode(cookies[:email])['email'])
        if (user.role_id != User::ROLES[:admin])
          render_unauthorized_response
          return
        end

        @scholarship_feedback = ScholarshipFeedback.new(scholarship_feedback_params)
        scholarship = Scholarship.find(scholarship_feedback_params[:scholarship_id])
        provider = scholarship.scholarship_provider
        provider_email = provider.user.email_address
        provider_name = provider.provider_name
        scholarship_name = scholarship.scholarship_name
        feedback = scholarship_feedback_params[:feedback]
        @scholarship_feedback.scholarship_provider_id = provider.id

        if @scholarship_feedback.save
          scholarship.update!(content_status: Scholarship::CONTENT_STATUSES[:for_modification])
          begin
            ContentFeedbackMailer.feedback_email(provider_email, provider_name, scholarship_name, feedback).deliver_now
          rescue StandardError => e
            Rails.logger.error("Failed to send email: #{e.message}")
          end

          render json: { message: 'Scholarship feedback was successfully created.' }, status: :created
        else
          render json: { message: 'Scholarship feedback was not created.', errors: @scholarship_feedback.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /scholarship_feedbacks/1 or /scholarship_feedbacks/1.json
      def update
        user = User.find_by(email_address: JwtService.decode(cookies[:email])['email'])
        if (user.role_id != User::ROLES[:admin])
          render_unauthorized_response
          return
        end

        if @scholarship_feedback.update!(notes: params[:notes])
          render json: { message: 'Scholarship feedback was successfully updated.' }, status: :ok
        else
          render json: { message: 'Scholarship feedback was not updated.', errors: @scholarship_feedback.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /scholarship_feedbacks/1 or /scholarship_feedbacks/1.json
      def destroy
        @scholarship_feedback.destroy!

        respond_to do |format|
          format.html { redirect_to scholarship_feedbacks_url, notice: "Scholarship feedback was successfully destroyed." }
          format.json { head :no_content }
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_scholarship_feedback
          @scholarship_feedback = ScholarshipFeedback.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def scholarship_feedback_params
          params.require(:scholarship_feedback).permit(:scholarship_provider_id, :feedback, :scholarship_id)
        end
      end
  end
end