module Api
  module V1
    class UploadsController < ApplicationController
      before_action :set_upload, only: %i[ show edit update destroy ]

      # GET /uploads or /uploads.json
      def index
        @uploads = Upload.all
      end

      # GET /uploads/1 or /uploads/1.json
      def show
      end

      # GET /uploads/new
      def new
        @upload = Upload.new
      end

      # GET /uploads/1/edit
      def edit
      end

      # POST /uploads or /uploads.json
      def create
        uploaded_file = params[:file]
        if uploaded_file.respond_to?(:read)
          # Read Excel file using 'roo' gem
          excel = Roo::Excelx.new(uploaded_file.path)
          header = excel.row(1)
          data = []
          (2..excel.last_row).each do |i|
            row = Hash[[header, excel.row(i)].transpose]
            data << row
          end

          DataModel.create(data)

          
          render json: { message: 'Data created successfully' }, status: :created
        else
          render json: { error: 'Invalid file' }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /uploads/1 or /uploads/1.json
      def update
        respond_to do |format|
          if @upload.update(upload_params)
            format.html { redirect_to upload_url(@upload), notice: "Upload was successfully updated." }
            format.json { render :show, status: :ok, location: @upload }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @upload.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /uploads/1 or /uploads/1.json
      def destroy
        @upload.destroy!

        respond_to do |format|
          format.html { redirect_to uploads_url, notice: "Upload was successfully destroyed." }
          format.json { head :no_content }
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_upload
          @upload = Upload.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def upload_params
          params.fetch(:upload, {})
        end
    end
  end
end


