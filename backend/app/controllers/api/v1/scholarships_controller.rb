module Api
  module V1
    class ScholarshipsController < ApplicationController
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
    
        if @scholarship.save
            render json: { "message": "Scholarship was successfully created." }, status: :created
          else
            render json: @scholarship_provider.errors, status: :unprocessable_entity
          end
      end
    
      # PATCH/PUT /api/v1/scholarships/1 or /api/v1/scholarships/1.json
      def update
        if @scholarship.update(scholarship_params)
          render json: { "message": "Scholarship details successfully updated." }, status: :ok
        else
          render json: @scholarship_provider.errors, status: :unprocessable_entity
        end
      end
    
      # DELETE /api/v1/scholarships/1 or /api/v1/scholarships/1.json
      def destroy
        @scholarship.destroy!
    
        respond_to do |format|
          format.html { redirect_to scholarships_url, notice: "Scholarship was successfully destroyed." }
          format.json { head :no_content }
        end
      end
    
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_scholarship
          @scholarship = Scholarship.find(params[:id])
        end
    
        # Only allow a list of trusted parameters through.
        def scholarship_params
          params.require(:scholarship).permit(:scholarship_name, :start_date, :due_date, :application_link, :school_year, :scholarship_provider_id, :requirement_id, :eligibility_id, :scholarship_type_id)
        end
    end
  end
end
