module Api
  module V1
    class ScholarshipTypesController < ApplicationController
    before_action :set_scholarship_type, only: %i[ show edit update destroy ]

    # GET /scholarship_types or /scholarship_types.json
    def index
      @scholarship_types = ScholarshipType.all
      render json: @scholarship_types
    end

    # GET /scholarship_types/1 or /scholarship_types/1.json
    def show
    end

    # GET /scholarship_types/new
    def new
      @scholarship_type = ScholarshipType.new
    end

    # GET /scholarship_types/1/edit
    def edit
    end

    # POST /scholarship_types or /scholarship_types.json
    def create
      @scholarship_type = ScholarshipType.new(scholarship_type_params)

      respond_to do |format|
        if @scholarship_type.save
          format.html { redirect_to scholarship_type_url(@scholarship_type), notice: "Scholarship type was successfully created." }
          format.json { render :show, status: :created, location: @scholarship_type }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @scholarship_type.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /scholarship_types/1 or /scholarship_types/1.json
    def update
      respond_to do |format|
        if @scholarship_type.update(scholarship_type_params)
          format.html { redirect_to scholarship_type_url(@scholarship_type), notice: "Scholarship type was successfully updated." }
          format.json { render :show, status: :ok, location: @scholarship_type }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @scholarship_type.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /scholarship_types/1 or /scholarship_types/1.json
    def destroy
      @scholarship_type.destroy!

      respond_to do |format|
        format.html { redirect_to scholarship_types_url, notice: "Scholarship type was successfully destroyed." }
        format.json { head :no_content }
      end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_scholarship_type
        @scholarship_type = ScholarshipType.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def scholarship_type_params
        params.require(:scholarship_type).permit(:scholarship_type_name)
      end
    end
  end
end
