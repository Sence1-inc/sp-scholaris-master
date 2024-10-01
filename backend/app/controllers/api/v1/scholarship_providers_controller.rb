module Api
  module V1
    class ScholarshipProvidersController < ApplicationController
      before_action :set_scholarship_provider, only: %i[ show edit update destroy scholarships ]
    
      # GET /scholarship_providers or /scholarship_providers.json
      def index
        @scholarship_providers = ScholarshipProvider.includes(:scholarship_provider_profile, :user).all

        render json: @scholarship_providers
      end
    
      # GET /scholarship_providers/1 or /scholarship_providers/1.json
      def show
        render json: @scholarship_provider.includes([:scholarship_provider_profile]).as_json
      end
    
      # GET /scholarship_providers/new
      def new
        @scholarship_provider = ScholarshipProvider.new
      end
    
      # GET /scholarship_providers/1/edit
      def edit
      end
    
      # POST /scholarship_providers or /scholarship_providers.json
      def create
        @scholarship_provider = ScholarshipProvider.new(scholarship_provider_params)
    
        respond_to do |format|
          if @scholarship_provider.save
            format.html { redirect_to scholarship_provider_url(@scholarship_provider), notice: "Scholarship provider was successfully created." }
            format.json { render :show, status: :created, location: @scholarship_provider }
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @scholarship_provider.errors, status: :unprocessable_entity }
          end
        end
      end
    
      # PATCH/PUT /scholarship_providers/1 or /scholarship_providers/1.json
      def update
        respond_to do |format|
          if @scholarship_provider.update(scholarship_provider_params)
            format.html { redirect_to scholarship_provider_url(@scholarship_provider), notice: "Scholarship provider was successfully updated." }
            format.json { render :show, status: :ok, location: @scholarship_provider }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @scholarship_provider.errors, status: :unprocessable_entity }
          end
        end
      end
    
      # DELETE /scholarship_providers/1 or /scholarship_providers/1.json
      def destroy
        @scholarship_provider.destroy!
    
        respond_to do |format|
          format.html { redirect_to scholarship_providers_url, notice: "Scholarship provider was successfully destroyed." }
          format.json { head :no_content }
        end
      end

      def scholarships
        user = User.find_by(email_address: JwtService.decode(cookies[:email])['email'])
        
        if user.parent_id && @scholarship_provider.user.email_address != User.find(user.parent_id).email_address
          render_unauthorized_response
          return
        end

        if @scholarship_provider.user.email_address != JwtService.decode(cookies[:email])['email'] && !user.parent_id
          render_unauthorized_response
          return
        end

        @scholarships = Scholarship.where(scholarship_provider_id: @scholarship_provider.id)
        if @scholarships.exists?
          @scholarships = @scholarships.includes(
            :eligibilities, 
            :requirements, 
            :scholarship_type, 
            :benefits, 
            :benefit_categories, 
            :courses, 
            :schools, 
            scholarship_provider: [:scholarship_provider_profile]  # Hash notation for nested includes
          ).page(params[:page] || 1).per(params[:limit] || 10)

          render json: {
            scholarships: @scholarships.as_json,
            total_count: @scholarships.total_count,
            total_pages: @scholarships.total_pages,
            current_page: @scholarships.current_page,
            limit: params[:limit] || 10
          }, status: :ok
        else
          render json: {message: "No scholarships found.", scholarships: [], total_count: 0}, status: :ok
        end
      end
    
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_scholarship_provider
          @scholarship_provider = ScholarshipProvider.find(params[:id])
        end
    
        # Only allow a list of trusted parameters through.
        def scholarship_provider_params
          params.require(:scholarship_provider).permit(:provider_name, :user_id)
        end
    end
  end
end
