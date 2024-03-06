module Api
  module V1
    class ScholarshipsController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_scholarship, only: %i[ show edit update destroy ]
    
      # GET /api/v1/scholarships or /api/v1/scholarships.json
      def index
        @scholarships = Scholarship.filtered(params)
    
        if @scholarships.present?
          @scholarships = @scholarships.page(params[:page]).per(params[:limit] || 10)
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
        render json: @scholarship.as_json(
          :only => [ 
            :id, 
            :scholarship_name, 
            :start_date, 
            :due_date,
            :application_link,
            :school_year, 
          ],
          :include => {
            scholarship_provider: { 
              only: [
                :id, 
                :provider_name
              ],
              include: {
                scholarship_provider_profile: { 
                  only: [:id, :description]
                }
              }
            },
            requirements: { 
              only: [
                :id, 
                :requirements_text
              ]
            },
            eligibilities: { 
              only: [
                :id, 
                :eligibility_text
              ]
            },
            benefits: { 
              only: [
                :id, 
                :benefit_name
              ]
            }
          }
        )
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

        @benefit = Benefit.new(benefit_name: params[:benefits])
        @requirement = Requirement.new(requirements_text: params[:requirements])
        @eligibility = Eligibility.new(eligibility_text: params[:eligibilities])

        errors = {}
        errors[:benefit] = @benefit.errors if @benefit.invalid?
        errors[:requirement] = @requirement.errors if @requirement.invalid?
        errors[:eligibility] = @eligibility.errors if @eligibility.invalid?

        if errors.empty?
          if @scholarship.save
            
            @scholarship.benefits << @benefit
            @scholarship.requirements << @requirement
            @scholarship.eligibilities << @eligibility
          
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
        @benefits = @scholarship.benefits
        @benefits.each do |benefit|
          puts benefit
          benefit.update(benefit_name: params[:benefits])
          @benefit_errors[benefit.id] = benefit.errors.full_messages unless benefit.errors.empty?
        end

        @requirement_errors = {}
        @requirements = @scholarship.requirements
        @requirements.each do |requirement|
          requirement.update(requirements_text: params[:requirements])
          @requirement_errors[requirement.id] = requirement.errors.full_messages unless requirement.errors.empty?
        end
        

        @eligibility_errors = {}
        @eligibilities = @scholarship.eligibilities
        @eligibilities.each do |eligibility|
          eligibility.update(eligibility_text: params[:eligibilities])
          @eligibility_errors[eligibility.id] = eligibility.errors.full_messages unless eligibility.errors.empty?
        end

        errors = {}
        errors[:benefit] = @benefit_errors.first unless @benefit_errors.empty?
        errors[:requirement] = @requirement_errors.first unless @requirement_errors.empty?
        errors[:eligibility] = @eligibility_errors.first unless @eligibility_errors.empty?

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
          params.require(:scholarship).permit(:scholarship_name, :start_date, :due_date, :application_link, :school_year, :scholarship_provider_id, :requirements, :eligibilities, :scholarship_type_id, :benefits)
        end
    end
  end
end
