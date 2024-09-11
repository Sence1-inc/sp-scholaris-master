module Api
  module V1
    class StudentProfilesController < ApplicationController
      skip_before_action :verify_authenticity_token
      rescue_from ActiveRecord::RecordNotFound, with: :skip_record_not_found
      before_action :authenticate_user, only: %i[ show create edit update destroy ]
      before_action :set_student_profile, only: %i[ show create edit update destroy ]
      
      # GET /student_profiles or /student_profiles.json
      def index
        @student_profiles = StudentProfile.includes(:user).all

        render json: @student_profiles
      end

      # GET /student_profiles/1 or /student_profiles/1.json
      def show
        render json: @student_profiles.as_json
      end

      # GET /student_profiles/new
      def new
        @student_profile = StudentProfile.new
      end

      # GET /student_profiles/1/edit
      def edit
      end

      # POST /student_profiles or /student_profiles.json
      def create
        if  @student_profile.present?
          if @student_profile.update(student_profile_params)
            if params[:birthdate].present?
              @user.update(birthdate: params[:birthdate])
            end
            render json: { message: 'Student profile updated successfully', profile: @student_profile, birthdate: @user.birthdate }, status: :ok
          else
            render json: @student_profile.errors, status: :unprocessable_entity
          end
        else
          student_profile = StudentProfile.new(student_profile_params)
          @user = User.find(params[:user_id])
          student_profile.user = @user
          
          if student_profile.save
            if params[:birthdate].present?
              @user.update(birthdate: params[:birthdate])
            end
            render json: {
              message: "Student details successfully saved.",
              profile: student_profile,
              birthdate: @user.birthdate
            }, status: :ok
          else
            render json: student_profile.errors, status: :unprocessable_entity
          end
        end
      end

      # PATCH/PUT /student_profiles/1 or /student_profiles/1.json
      def update
        if @student_profile.update(student_profile_params)
          render json: { message: 'Student profile updated successfully', profile: @student_profile }, status: :ok
        else
          render json: @student_profile.errors, status: :unprocessable_entity
        end
      end

      # DELETE /student_profiles/1 or /student_profiles/1.json
      def destroy
        @student_profile.destroy!

        respond_to do |format|
          format.html { redirect_to student_profiles_url, notice: "Student profile was successfully destroyed." }
          format.json { head :no_content }
        end
      end

      private
        def authenticate_user
          @user = User.find(params[:user_id])

          if @user.email_address != JwtService.decode(cookies[:email])['email']
            render_unauthorized_response
            return
          end
        end

        def skip_record_not_found
          # Do nothing or handle in a specific way if needed
        end

        # Use callbacks to share common setup or constraints between actions.
        def set_student_profile
          @student_profile = StudentProfile.find_by(user_id: params[:user_id])
        end

        # Only allow a list of trusted parameters through.
        def student_profile_params
          params.require(:student_profile).permit(
            :user_id,
            :about,
            :full_name,
            :birthdate,
            :email,
            :age,
            :nationality,
            :gender,
            :state,
            :secondary_school_name,
            :secondary_school_year,
            :secondary_school_address,
            :secondary_school_phone_number,
            :secondary_school_awards,
            :secondary_school_organizations,
            :elementary_school_name,
            :elementary_school_year,
            :elementary_school_address,
            :elementary_school_phone_number,
            :elementary_school_awards,
            :elementary_school_organizations,
            :guardian_full_name,
            :guardian_contact_number,
            :guardian_relationship,
            :avatar,
            :id
          )
        end
    end
  end
end
