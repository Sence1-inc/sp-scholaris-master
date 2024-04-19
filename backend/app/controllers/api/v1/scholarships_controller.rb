require 'date'

module Api
  module V1
    class ScholarshipsController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_scholarship, :authorize, only: %i[ show edit update destroy ]
    
      # GET /api/v1/scholarships or /api/v1/scholarships.json
      def index
        @scholarships = Scholarship.filtered(params)
    
        if @scholarships.present?
          @scholarships = @scholarships.page(params[:page]).per(params[:limit])
          
          render json: @scholarships.as_json(
            :only => [:id, :scholarship_name, :start_date, :due_date],
            :include => {
              :scholarship_provider => { :only => [:id, :provider_name] }
            }
          )
        else
          render json: { message: 'No scholarships found' }, status: :not_found
        end
      end
    
      # GET /api/v1/scholarships/1 or /api/v1/scholarships/1.json
      def show
        render json: @scholarship.as_json
      end
    
      # GET /api/v1/scholarships/new
      def new
        @scholarship = Scholarship.new
      end
    
      # GET /api/v1/scholarships/1/edit
      def edit
      end

      def create
        scholarship_service = ScholarshipService.new(scholarship_params)
        result = scholarship_service.create_scholarship
        render json: result, status: result.key?(:errors) ? :unprocessable_entity : :created
      end

      def upload
        uploaded_file = params[:file]
        if uploaded_file.respond_to?(:read)
          begin
            temp_file = Tempfile.new(["uploaded_file", ".csv"])
            temp_file.binmode
            temp_file.write(uploaded_file.read)
            temp_file.rewind

            excel = Roo::Spreadsheet.open(temp_file.path, extension: :csv)
            header = excel.row(1)
            data = []
            (3..excel.last_row).each do |i|
              row = Hash[[header, excel.row(i)].transpose]
              data << row
            end

            errors_count = 0
            success_count = 0
            results = []
            file_params = data
            file_params.each do |file_param|
              begin
                user = User.find_by(email_address: cookies[:user_email])
                start_date = DateTime.strptime(file_param['start_date'], '%d-%m-%Y')
                due_date = DateTime.strptime(file_param['due_date'], '%d-%m-%Y')
                scholarship = Scholarship.find_by(scholarship_name: file_param['scholarship_name'], start_date: start_date, due_date: due_date)

                if scholarship
                  errors_count += 1
                  result = { errors: [ "Scholarship already exists." ] }
                else
                  file_param[:scholarship_provider_id] = user.scholarship_provider.id
                  scholarship_service = ScholarshipService.new(file_param)
                  result = scholarship_service.create_scholarship
                  if result.key?(:errors)
                    errors_count += 1
                  else
                    success_count += 1
                  end
                end
                results << result
              rescue StandardError => e
                results << { errors: [e.message] }
                errors_count += 1
              end
            end

            render json: { results: results, errors_count: errors_count, success_count: success_count, total_count: file_params.size }, status: :created
          ensure
            temp_file.close
            temp_file.unlink
          end
        else
          render json: { error: 'Invalid file' }, status: :unprocessable_entity
        end
      end
    
      # PATCH/PUT /api/v1/scholarships/1 or /api/v1/scholarships/1.json
      def update
        scholarship_service = ScholarshipService.new(scholarship_params)

        result = scholarship_service.update_scholarship(@scholarship.id)

        if result[:errors].present?
          render json: result[:errors], status: :unprocessable_entity
        else
          render json: { message: result[:message], scholarship: result[:scholarship] }, status: :ok
        end
      end
    
      # DELETE /api/v1/scholarships/1 or /api/v1/scholarships/1.json
      def destroy
        if Scholarship.is_soft_deleted(@scholarship)
          Scholarship.soft_delete(@scholarship)
          scholarships = Scholarship.where(scholarship_provider_id: @scholarship.scholarship_provider.id)
          
          render json: {message: "Scholarship deleted.", scholarships: scholarships.page(params[:page]).per(params[:limit]), status: :ok}
        else
          render json: {message: "Unable to delete scholarship", status: :unprocessable_entity}, status: 422
        end
      end
    
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_scholarship
          @scholarship = Scholarship.find(params[:id])
        end
    
        # Only allow a list of trusted parameters through.
        def scholarship_params
          params
          .permit(
            :scholarship_name, 
            :status, 
            :description, 
            :start_date, 
            :due_date, 
            :application_link, 
            :school_year,
            :scholarship_type_id,
            :scholarship_provider_id
          ).merge(eligibilities: params[:eligibilities]).merge(requirements: params[:requirements]).merge(benefits: params[:benefits])
        end

        def authorize
          if @scholarship.scholarship_provider.user.email_address != cookies[:user_email]
            render_unauthorized_response
            return
          end
        end
    end
  end
end
