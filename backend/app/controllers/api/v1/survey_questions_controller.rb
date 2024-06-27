class Api::V1::SurveyQuestionsController < ApplicationController
  before_action :set_api_v1_survey_question, only: %i[ show edit update destroy ]

  # GET /api/v1/survey_questions or /api/v1/survey_questions.json
  def index
    q = SurveyQuestion.student_questions(params[:user_type]).as_json({:only => [:id, :question_text, :input_type, :choices, :is_required]})

    render json: {:user_type => params[:user_type], :survey_questions => q}

  end

  # GET /api/v1/survey_questions/1 or /api/v1/survey_questions/1.json
  def show
  end

  # GET /api/v1/survey_questions/new
  def new
    @api_v1_survey_question = Api::V1::SurveyQuestion.new
  end

  # GET /api/v1/survey_questions/1/edit
  def edit
  end

  # POST /api/v1/survey_questions or /api/v1/survey_questions.json
  def create
    @api_v1_survey_question = Api::V1::SurveyQuestion.new(api_v1_survey_question_params)

    respond_to do |format|
      if @api_v1_survey_question.save
        format.html { redirect_to api_v1_survey_question_url(@api_v1_survey_question), notice: "Survey question was successfully created." }
        format.json { render :show, status: :created, location: @api_v1_survey_question }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @api_v1_survey_question.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /api/v1/survey_questions/1 or /api/v1/survey_questions/1.json
  def update
    respond_to do |format|
      if @api_v1_survey_question.update(api_v1_survey_question_params)
        format.html { redirect_to api_v1_survey_question_url(@api_v1_survey_question), notice: "Survey question was successfully updated." }
        format.json { render :show, status: :ok, location: @api_v1_survey_question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @api_v1_survey_question.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /api/v1/survey_questions/1 or /api/v1/survey_questions/1.json
  def destroy
    @api_v1_survey_question.destroy!

    respond_to do |format|
      format.html { redirect_to api_v1_survey_questions_url, notice: "Survey question was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_survey_question
      @api_v1_survey_question = Api::V1::SurveyQuestion.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_survey_question_params
      params.fetch(:api_v1_survey_question, {})
    end
end
