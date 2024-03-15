module Api
  module V1
    class ScholarshipsController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_scholarship, only: %i[ show edit update destroy ]
    
      # GET /api/v1/scholarships or /api/v1/scholarships.json
      def index
        @scholarships = Scholarship.filtered(params)
    
        if @scholarships.present?
          if params[:limit].present?
            @scholarships = @scholarships.page(params[:page]).per(params[:limit])
          end
          
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
    
      # POST /api/v1/scholarships or /api/v1/scholarships.json
      def create
        @scholarship = Scholarship.new(scholarship_params)
        benefit_params = params[:benefits] || []
        requirement_params = params[:requirements] || []
        eligibility_params = params[:eligibilities] || []

        @requirements = []
        @eligibilities = []
        @benefits = []

        benefit_params.each do |param|
          @benefits << Benefit.new(benefit_name: param[:benefit_name])
        end

        requirement_params.each do |param|
          @requirements << Requirement.new(requirements_text: param[:requirements_text])
        end

        eligibility_params.each do |param|
          @eligibilities << Eligibility.new(eligibility_text: param[:eligibility_text])
        end

        errors = {}
        errors[:benefit] = @benefits.map { |benefit| benefit.errors } if @benefits.any? { |benefit| benefit.invalid? }
        errors[:requirement] = @requirements.map { |requirement| requirement.errors } if @requirements.any? { |requirement| requirement.invalid? }
        errors[:eligibility] = @eligibilities.map { |eligibility| eligibility.errors } if @eligibilities.any? { |eligibility| eligibility.invalid? }


        if errors.empty?
          if @scholarship.save
            
            @benefits.each do |benefit|
              @scholarship.benefits << benefit
            end

            @requirements.each do |requirement|
              @scholarship.requirements << requirement
            end

            @eligibilities.each do |eligibility|
              @scholarship.eligibilities << eligibility
            end
          
            render json: { "message": "Scholarship was successfully created." }, status: :created
          else
            render json: @scholarship.errors, status: :unprocessable_entity
          end
        else
          render json: errors, status: :unprocessable_entity
        end
      end
    
      # PATCH/PUT /api/v1/scholarships/1 or /api/v1/scholarships/1.json
      def update
        @benefit_errors = {}
        params[:benefits].each do |benefit_params|
          if benefit_params[:id].present?
            benefit = @scholarship.benefits.find_by(id: benefit_params[:id])
          end

          if benefit
            benefit.update!(benefit_name: benefit_params[:benefit_name])

            @benefit_errors[benefit.id] = benefit.errors.full_messages unless benefit.errors.empty?
          else
            benefit = @scholarship.benefits.build(benefit_name: benefit_params[:benefit_name])
            if benefit.save
              @scholarship.benefits << benefit
            else
              @benefit_errors[benefit.id] = benefit.errors.full_messages
            end
          end
        end

        @requirement_errors = {}
        params[:requirements].each do |requirement_params|
          if requirement_params[:id].present?
            requirement = @scholarship.requirements.find_by(id: requirement_params[:id])
          end

          if requirement
            requirement.update!(requirements_text: requirement_params[:requirements_text])
            @requirement_errors[requirement.id] = requirement.errors.full_messages unless requirement.errors.empty?
          else
            requirement = @scholarship.requirements.build(requirements_text: requirement_params[:requirements_text])
            if requirement.save
              @scholarship.requirements << requirement
            else
              @requirement_errors[requirement.id] = requirement.errors.full_messages
            end
          end
        end

        @eligibility_errors = {}
        params[:eligibilities].each do |eligibility_params|
          if eligibility_params[:id].present?
            eligibility = @scholarship.eligibilities.find_by(id: eligibility_params[:id])
          end

          if eligibility
            eligibility.update!(eligibility_text: eligibility_params[:eligibility_text])
            @eligibility_errors[eligibility.id] = eligibility.errors.full_messages unless eligibility.errors.empty?
          else
            eligibility = @scholarship.eligibilities.build(eligibility_text: eligibility_params[:eligibility_text])
            if eligibility.save
              @scholarship.eligibilities << eligibility
            else
              @eligibility_errors[eligibility.id] = eligibility.errors.full_messages
            end
          end
        end

        errors = {}
        errors[:benefits] = @benefit_errors if @benefit_errors.is_a?(Hash) && !@benefit_errors.empty?
        errors[:requirements] = @requirement_errors if @requirement_errors.is_a?(Hash) && !@requirement_errors.empty?
        errors[:eligibilities] = @eligibility_errors if @eligibility_errors.is_a?(Hash) && !@eligibility_errors.empty?
        
        if errors.empty?
          if Scholarship.is_soft_deleted(@scholarship) 
            if @scholarship.update(scholarship_params)
              render json: { "message": "Scholarship details successfully updated." }, status: :ok
            else
              render json: @scholarship.errors, status: :unprocessable_entity
            end
          else
            render json: { "message": "Unable to update scholarship." }, status: :unprocessable_entity
          end
        else
          render json: errors, status: :unprocessable_entity
        end
      end
    
      # DELETE /api/v1/scholarships/1 or /api/v1/scholarships/1.json
      def destroy
        if Scholarship.is_soft_deleted(@scholarship)
          Scholarship.soft_delete(@scholarship)

          @scholarship.benefits.each do |benefit|
            Benefit.soft_delete(benefit)
          end
          @scholarship.requirements.each do |requirement|
            Requirement.soft_delete(requirement)
          end
          @scholarship.eligibilities.each do |eligibility|
            Eligibility.soft_delete(eligibility)
          end
          render json: {message: "Scholarship deleted.", status: :ok}
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
          params.require(:scholarship).permit(:scholarship_name, :status, :description, :start_date, :due_date, :application_link, :school_year, :scholarship_provider_id, :requirements, :eligibilities, :scholarship_type_id, :benefits)
        end
    end
  end
end
