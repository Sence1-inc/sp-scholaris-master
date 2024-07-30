module Api
  module V1
    class ScholarshipApplicationsController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_scholarship_application, only: %i[ show edit update destroy ]

      # GET /scholarship_applications or /scholarship_applications.json
      def index
        @scholarship_applications = ScholarshipApplication.all
      end

      # GET /scholarship_applications/1 or /scholarship_applications/1.json
      def show
      end

      # GET /scholarship_applications/new
      def new
        @scholarship_application = ScholarshipApplication.new
      end

      # GET /scholarship_applications/1/edit
      def edit
      end

      # POST /scholarship_applications or /scholarship_applications.json
      def create
        @scholarship_application = ScholarshipApplication.new(scholarship_application_params)

        respond_to do |format|
          if @scholarship_application.save
            format.html { redirect_to scholarship_application_url(@scholarship_application), notice: "Scholarship application was successfully created." }
            format.json { render :show, status: :created, location: @scholarship_application }
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @scholarship_application.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /scholarship_applications/1 or /scholarship_applications/1.json
      def update
        respond_to do |format|
          if @scholarship_application.update(scholarship_application_params)
            format.html { redirect_to scholarship_application_url(@scholarship_application), notice: "Scholarship application was successfully updated." }
            format.json { render :show, status: :ok, location: @scholarship_application }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @scholarship_application.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /scholarship_applications/1 or /scholarship_applications/1.json
      def destroy
        @scholarship_application.destroy!

        respond_to do |format|
          format.html { redirect_to scholarship_applications_url, notice: "Scholarship application was successfully destroyed." }
          format.json { head :no_content }
        end
      end

      def send_email
        user_message = params[:user_message]
        scholarship_id = params[:scholarship_id].to_i
        student_name = params[:student_name]
        student_email = params[:student_email]
        scholarship = Scholarship.find(scholarship_id)
        
        unless scholarship
          return render json: { error: 'Scholarship not found' }, status: :not_found
        end

        recipient_email = scholarship.application_email

        existing_application = ScholarshipApplication.find_by(
          student_email: student_email,
          scholarship_id: scholarship_id
        )

        if existing_application
          return render json: { message: 'Application from this email and scholarship already exists' }, status: :conflict
        end

        application = ScholarshipApplication.new(
          recipient_email: recipient_email,
          user_message: user_message,
          scholarship_id: scholarship.id,
          student_email: student_email
        )

        provider_name = scholarship.scholarship_provider.provider_name
        scholarship_name = scholarship.scholarship_name
        pdf_attachment = params[:pdf_file].tempfile if params[:pdf_file].present?
        
        if application.save
          begin
            ScholarshipApplicationMailer.application_email(
              recipient_email, 
              user_message,
              provider_name,
              scholarship_name,
              student_name, 
              student_email,
              pdf_attachment
            ).deliver_now
            render json: { message: 'Application email sent' }, status: :ok
          rescue StandardError => e
            Rails.logger.error("Failed to send email: #{e.message}")
            render json: { message: e.message, backtrace: e.backtrace }, status: :internal_server_error
          end
        else
          render json: { message: "Failed to send email", details: application.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private
        def set_scholarship_application
          @scholarship_application = ScholarshipApplication.find(params[:id])
        end

        def scholarship_application_params
          params.require(:scholarship_application).permit(:user_message, :scholarship_id, :scholarship_name, :student_name, :student_email)
        end
    end
  end
end



