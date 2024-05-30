module Api
  module V1
    class BenefitCategoriesController < ApplicationController
      before_action :set_benefit_category, only: %i[show edit update destroy]
    
      # GET /benefit_categories or /benefit_categories.json
      def index
        @benefit_categories = BenefitCategory.all

        render json: @benefit_categories
      end
    
      # GET /benefit_categories/1 or /benefit_categories/1.json
      def show
      end
    
      # GET /benefit_categories/new
      def new
        @benefit_category = BenefitCategory.new
      end
    
      # GET /benefit_categories/1/edit
      def edit
      end
    
      # POST /benefit_categories or /benefit_categories.json
      def create
        @benefit_category = BenefitCategory.new(benefit_params)
    
        respond_to do |format|
          if @benefit_category.save
            format.html { redirect_to @benefit_category, notice: "Benefit category was successfully created." }
            format.json { render :show, status: :created, location: @benefit_category }
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @benefit_category.errors, status: :unprocessable_entity }
          end
        end
      end
    
      # PATCH/PUT /benefit_categories/1 or /benefit_categories/1.json
      def update
        respond_to do |format|
          if @benefit_category.update(benefit_params)
            format.html { redirect_to @benefit_category, notice: "Benefit category was successfully updated." }
            format.json { render :show, status: :ok, location: @benefit_category }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @benefit_category.errors, status: :unprocessable_entity }
          end
        end
      end
    
      # DELETE /benefit_categories/1 or /benefit_categories/1.json
      def destroy
        @benefit_category.destroy
    
        respond_to do |format|
          format.html { redirect_to benefit_categories_url, notice: "Benefit category was successfully destroyed." }
          format.json { head :no_content }
        end
      end
    
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_benefit_category
          @benefit_category = BenefitCategory.find(params[:id])
        end
    
        # Only allow a list of trusted parameters through.
        def benefit_params
          params.require(:benefit_category).permit(:benefit_name)
        end
    end
  end
end
