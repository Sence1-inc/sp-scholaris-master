module Api
  module V1
    class ScholarshipProviderProfilesController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_provider, only: %i[ show edit update destroy ]

      # GET /scholarship_provider_profiles or /scholarship_provider_profiles.json
      def index
        @scholarship_provider_profiles = Provider.all
      end

      # GET /scholarship_provider_profiles/1 or /scholarship_provider_profiles/1.json
      def show
        render json: @scholarship_provider_profile.as_json
      end

      # GET /scholarship_provider_profiles/new
      def new
        @scholarship_provider_profile = Provider.new
      end

      # GET /scholarship_provider_profiles/1/edit
      def edit
      end

      # POST /scholarship_provider_profiles or /scholarship_provider_profiles.json
      def create
        @scholarship_provider_profile = ScholarshipProviderProfile.new(scholarship_provider_profile_params)
        @scholarship_provider = ScholarshipProvider.new
        @scholarship_provider.user_id = params[:user_id]
        @scholarship_provider.provider_name = params[:provider_name]

        if @scholarship_provider.save
          @scholarship_provider_profile.scholarship_provider = @scholarship_provider
          if @scholarship_provider_profile.save
            render json: {
              message: "Provider details successfully saved."
            }, status: :ok
          else
            render json: @scholarship_provider_profile.errors, status: :unprocessable_entity
          end
        else
            render json: @scholarship_provider.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /scholarship_provider_profiles/1 or /scholarship_provider_profiles/1.json
      def update
        @scholarship_provider = ScholarshipProvider.find_by(user_id: params[:user_id])

        if @scholarship_provider_profile.update(scholarship_provider_profile_params) && @scholarship_provider.update(provider_name: params[:provider_name], provider_link: params[:provider_link])
          render json: {
            message: "Provider details successfully saved.",
            profile: @scholarship_provider_profile
          }, status: :ok
        else
          render json: { errors: [@scholarship_provider_profile.errors.full_messages, @scholarship_provider.errors.full_messages] }, status: :unprocessable_entity
        end
      end

      # DELETE /scholarship_provider_profiles/1 or /scholarship_provider_profiles/1.json
      def destroy
        @scholarship_provider_profile.destroy!

        respond_to do |format|
          format.html { redirect_to scholarship_provider_profiles_url, notice: "Provider was successfully destroyed." }
          format.json { head :no_content }
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_provider
          @scholarship_provider_profile = ScholarshipProviderProfile.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def scholarship_provider_profile_params
          params.require(:scholarship_provider_profile).permit(:user_id, :provider_name, :description, :provider_type, :region_id, :province_id, :city_id, :profile_picture, :provider_link)
        end
    end
  end
end

