module Api
  module V1
    class ScholarshipsController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_scholarship, only: %i[ show edit update destroy ]
    
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
        if @scholarship.scholarship_provider.user.email_address != cookies[:user_email]
          render_unauthorized_response
          return
        end


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
            temp_file = Tempfile.new(["uploaded_file", ".xlsx"])
            temp_file.binmode
            temp_file.write(uploaded_file.read)
            temp_file.rewind

            excel = Roo::Spreadsheet.open(temp_file.path, extension: :xlsx)
            header = excel.row(1)
            data = []
            (2..excel.last_row).each do |i|
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

                file_param[:scholarship_provider_id] = user.scholarship_provider.id
                scholarship_service = ScholarshipService.new(file_param)
                result = scholarship_service.create_scholarship
                if result.key?(:errors)
                  errors_count += 1
                else
                  success_count += 1
                end
                results << result
              rescue StandardError => e
                render json: { error: e.message }, status: :unprocessable_entity
              end
            end

            render json: { results: results, errors_count: errors_count, success_count: success_count, total_count: file_params.size }, status: :created
          ensure
            # Ensure to close and unlink the temporary file
            temp_file.close
            temp_file.unlink
          end
        else
          render json: { error: 'Invalid file' }, status: :unprocessable_entity
        end
      end
    
      # PATCH/PUT /api/v1/scholarships/1 or /api/v1/scholarships/1.json
      def update
        if @scholarship.scholarship_provider.user.email_address != cookies[:user_email]
          render_unauthorized_response
          return
        end

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
        if @scholarship.scholarship_provider.user.email_address != cookies[:user_email]
          render_unauthorized_response
          return
        end
        
        if Scholarship.is_soft_deleted(@scholarship)
          Scholarship.soft_delete(@scholarship)
          scholarships = Scholarship.where(scholarship_provider_id: @scholarship.scholarship_provider.id)
          
          render json: {message: "Scholarship deleted.", scholarships: scholarships, status: :ok}
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
    end
  end
end
