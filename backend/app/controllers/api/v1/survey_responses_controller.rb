module Api
  module V1
    class SurveyResponsesController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_survey_response, only: %i[ show edit update destroy ]
    
      # GET /survey_responses or /survey_responses.json
      def index
        @survey_responses = SurveyResponse.all
      end
    
      # GET /survey_responses/1 or /survey_responses/1.json
      def show
      end
    
      # GET /survey_responses/new
      def new
        @survey_response = SurveyResponse.new
      end
    
      # GET /survey_responses/1/edit
      def edit
      end
    
      # POST /survey_responses or /survey_responses.json
      def create
        if params[:email].blank?
          render json: { error: 'Email cannot be empty' }, status: :unprocessable_entity
          return
        end
        
        survey_response = SurveyResponse.new(survey_params)

        if survey_response.save
          render json: survey_response, status: :created
        else
          render json: survey_response.errors, status: :unprocessable_entity
        end
      end
    
      # PATCH/PUT /survey_responses/1 or /survey_responses/1.json
      def update
        respond_to do |format|
          if @survey_response.update(survey_params)
            format.html { redirect_to survey_response_url(@survey_response), notice: "Survey response was successfully updated." }
            format.json { render :show, status: :ok, location: @survey_response }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @survey_response.errors, status: :unprocessable_entity }
          end
        end
      end
    
      # DELETE /survey_responses/1 or /survey_responses/1.json
      def destroy
        @survey_response.destroy!
    
        respond_to do |format|
          format.html { redirect_to survey_responses_url, notice: "Survey response was successfully destroyed." }
          format.json { head :no_content }
        end
      end
    
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_survey_response
          @survey_response = SurveyResponse.find(params[:id])
        end
    
        # Only allow a list of trusted parameters through.
        def survey_params
          params.require(:survey_response).permit(:email, :user_id, responses: [:survey_question_id, :answer])
        end
    end
  end
end
